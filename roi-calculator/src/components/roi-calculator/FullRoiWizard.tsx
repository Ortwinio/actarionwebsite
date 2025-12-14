'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoiInputs, Industry, RoiResults } from '@/types/roi';
import { calculateRoi } from '@/lib/roiCalculator';
import {
    getDefaultInputs,
    industryLabels,
    defaultCosts,
    defaultFinancial,
} from '@/lib/industryPresets';
import { ResultsPanel } from './ResultsPanel';
import { CashflowChart } from './CashflowChart';

// Full wizard schema
const fullWizardSchema = z.object({
    // Step 1: Operation
    N_sites: z.coerce.number().min(1).max(100),
    N_op: z.coerce.number().min(1).max(1000),
    N_new: z.coerce.number().min(0).max(200),
    Exec_per_op_per_year: z.coerce.number().min(10).max(5000),
    industry: z.enum(['food_beverage', 'pharma', 'packaging', 'logistics', 'other']),

    // Step 2: Training
    H_train_base: z.coerce.number().min(1).max(500),
    H_train_AR: z.coerce.number().min(0).max(500),
    C_hour_op: z.coerce.number().min(10).max(500),
    C_hour_trainer: z.coerce.number().min(10).max(500),

    // Step 3: Quality & Downtime
    Error_rate_base: z.coerce.number().min(0).max(50),
    Error_rate_AR: z.coerce.number().min(0).max(50),
    Cost_per_error: z.coerce.number().min(0).max(50000),
    H_downtime_base_per_year: z.coerce.number().min(0).max(2000),
    Downtime_reduction_pct: z.coerce.number().min(0).max(100),
    Cost_per_downtime_hour: z.coerce.number().min(0).max(100000),

    // Step 4: Costs & Adoption
    N_users: z.coerce.number().min(1).max(500),
    C_license_user_year: z.coerce.number().min(0).max(10000),
    C_license_site_year: z.coerce.number().min(0).max(50000),
    N_devices: z.coerce.number().min(1).max(200),
    C_device_per_user: z.coerce.number().min(0).max(5000),
    Device_lifetime_years: z.coerce.number().min(1).max(10),
    Implementation_one_time: z.coerce.number().min(0).max(500000),
    Content_initial: z.coerce.number().min(0).max(200000),
    Content_annual: z.coerce.number().min(0).max(50000),
    Internal_PM_hours: z.coerce.number().min(0).max(1000),
    Internal_PM_rate: z.coerce.number().min(0).max(300),
    Adoption_year1: z.coerce.number().min(0).max(1),
    Adoption_year2: z.coerce.number().min(0).max(1),
    Adoption_year3: z.coerce.number().min(0).max(1),
    Horizon_years: z.coerce.number().min(1).max(5),
    Discount_rate: z.coerce.number().min(0).max(0.3),
});

type FullWizardForm = z.infer<typeof fullWizardSchema>;

const STEPS = [
    { id: 1, title: 'Your Operation', description: 'Basic info about your operation' },
    { id: 2, title: 'Training & Onboarding', description: 'Current training practices' },
    { id: 3, title: 'Quality & Downtime', description: 'Error rates and downtime costs' },
    { id: 4, title: 'Costs & Adoption', description: 'Solution costs and adoption plan' },
    { id: 5, title: 'Results', description: 'Your ROI business case' },
];

interface FullRoiWizardProps {
    onComplete?: (inputs: RoiInputs, results: RoiResults) => void;
}

export function FullRoiWizard({ onComplete }: FullRoiWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [results, setResults] = useState<RoiResults | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry>('food_beverage');

    const defaultInputs = getDefaultInputs(selectedIndustry);

    const getDefaultValues = (): FullWizardForm => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('roi-wizard-data') : null;
        if (stored) {
            try { return JSON.parse(stored); } catch { /* ignore */ }
        }
        return {
            N_sites: 1,
            N_op: defaultInputs.workforce.N_op,
            N_new: defaultInputs.workforce.N_new,
            Exec_per_op_per_year: defaultInputs.quality.Exec_per_op_per_year,
            industry: 'food_beverage',
            H_train_base: defaultInputs.training.H_train_base,
            H_train_AR: defaultInputs.training.H_train_AR,
            C_hour_op: defaultInputs.training.C_hour_op,
            C_hour_trainer: defaultInputs.training.C_hour_trainer,
            Error_rate_base: defaultInputs.quality.Error_rate_base,
            Error_rate_AR: defaultInputs.quality.Error_rate_AR,
            Cost_per_error: defaultInputs.quality.Cost_per_error,
            H_downtime_base_per_year: defaultInputs.downtime.H_downtime_base_per_year,
            Downtime_reduction_pct: defaultInputs.downtime.Downtime_reduction_pct,
            Cost_per_downtime_hour: defaultInputs.downtime.Cost_per_downtime_hour,
            N_users: defaultCosts.N_users,
            C_license_user_year: defaultCosts.C_license_user_year,
            C_license_site_year: defaultCosts.C_license_site_year,
            N_devices: defaultCosts.N_devices,
            C_device_per_user: defaultCosts.C_device_per_user,
            Device_lifetime_years: defaultCosts.Device_lifetime_years,
            Implementation_one_time: defaultCosts.Implementation_one_time,
            Content_initial: defaultCosts.Content_initial,
            Content_annual: defaultCosts.Content_annual,
            Internal_PM_hours: defaultCosts.Internal_PM_hours,
            Internal_PM_rate: defaultCosts.Internal_PM_rate,
            Adoption_year1: defaultFinancial.Adoption_year1,
            Adoption_year2: defaultFinancial.Adoption_year2,
            Adoption_year3: defaultFinancial.Adoption_year3,
            Horizon_years: defaultFinancial.Horizon_years,
            Discount_rate: defaultFinancial.Discount_rate,
        };
    };

    const { register, watch, setValue } = useForm<FullWizardForm>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(fullWizardSchema) as any,
        defaultValues: getDefaultValues(),
    });

    const formValues = watch();

    // Save to localStorage on change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('roi-wizard-data', JSON.stringify(formValues));
        }
    }, [formValues]);

    // Calculate ROI
    const calculateResults = useCallback(() => {
        const inputs: RoiInputs = {
            workforce: {
                N_op: formValues.N_op,
                N_new: formValues.N_new,
                SOP_count: 15,
            },
            training: {
                H_train_base: formValues.H_train_base,
                H_train_AR: formValues.H_train_AR,
                C_hour_op: formValues.C_hour_op,
                C_hour_trainer: formValues.C_hour_trainer,
            },
            quality: {
                Exec_per_op_per_year: formValues.Exec_per_op_per_year,
                Error_rate_base: formValues.Error_rate_base,
                Error_rate_AR: formValues.Error_rate_AR,
                Cost_per_error: formValues.Cost_per_error,
            },
            downtime: {
                H_downtime_base_per_year: formValues.H_downtime_base_per_year,
                Downtime_reduction_pct: formValues.Downtime_reduction_pct,
                Cost_per_downtime_hour: formValues.Cost_per_downtime_hour,
            },
            remoteSupport: {
                Visits_per_year: 10,
                Cost_per_visit: 1500,
                Visit_reduction_pct: 50,
            },
            costs: {
                C_license_user_year: formValues.C_license_user_year,
                N_users: formValues.N_users,
                C_license_site_year: formValues.C_license_site_year,
                N_sites: formValues.N_sites,
                C_device_per_user: formValues.C_device_per_user,
                N_devices: formValues.N_devices,
                Device_lifetime_years: formValues.Device_lifetime_years,
                Implementation_one_time: formValues.Implementation_one_time,
                Content_initial: formValues.Content_initial,
                Content_annual: formValues.Content_annual,
                Internal_PM_hours: formValues.Internal_PM_hours,
                Internal_PM_rate: formValues.Internal_PM_rate,
            },
            financial: {
                Horizon_years: formValues.Horizon_years,
                Discount_rate: formValues.Discount_rate,
                Adoption_year1: formValues.Adoption_year1,
                Adoption_year2: formValues.Adoption_year2,
                Adoption_year3: formValues.Adoption_year3,
            },
        };

        const calculatedResults = calculateRoi(inputs);
        setResults(calculatedResults);
        return { inputs, results: calculatedResults };
    }, [formValues]);

    useEffect(() => {
        const timer = setTimeout(() => calculateResults(), 100);
        return () => clearTimeout(timer);
    }, [calculateResults]);

    // Update defaults when industry changes
    useEffect(() => {
        if (formValues.industry !== selectedIndustry) {
            const newDefaults = getDefaultInputs(formValues.industry as Industry);
            setSelectedIndustry(formValues.industry as Industry);
            setValue('N_op', newDefaults.workforce.N_op);
            setValue('N_new', newDefaults.workforce.N_new);
            setValue('Exec_per_op_per_year', newDefaults.quality.Exec_per_op_per_year);
            setValue('H_train_base', newDefaults.training.H_train_base);
            setValue('H_train_AR', newDefaults.training.H_train_AR);
            setValue('C_hour_op', newDefaults.training.C_hour_op);
            setValue('C_hour_trainer', newDefaults.training.C_hour_trainer);
            setValue('Error_rate_base', newDefaults.quality.Error_rate_base);
            setValue('Error_rate_AR', newDefaults.quality.Error_rate_AR);
            setValue('Cost_per_error', newDefaults.quality.Cost_per_error);
            setValue('H_downtime_base_per_year', newDefaults.downtime.H_downtime_base_per_year);
            setValue('Downtime_reduction_pct', newDefaults.downtime.Downtime_reduction_pct);
            setValue('Cost_per_downtime_hour', newDefaults.downtime.Cost_per_downtime_hour);
        }
    }, [formValues.industry, selectedIndustry, setValue]);

    const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 5));
    const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

    const handleComplete = () => {
        const { inputs, results } = calculateResults();
        onComplete?.(inputs, results);
    };

    return (
        <div className="wizard">
            {/* Progress bar */}
            <div className="wizard__progress">
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={`wizard__step ${currentStep === step.id ? 'wizard__step--active' : ''} ${currentStep > step.id ? 'wizard__step--completed' : ''}`}
                    >
                        <div className="wizard__step-number">
                            {currentStep > step.id ? '✓' : step.id}
                        </div>
                        <span className="wizard__step-label">{step.title}</span>
                    </div>
                ))}
            </div>

            <div className="wizard__content">
                {/* Form content by step */}
                <div className="wizard__form">
                    {currentStep === 1 && (
                        <section className="form-section">
                            <h3 className="form-section__title">Tell us about your operation</h3>

                            <div className="form-field">
                                <label className="form-field__label">Industry</label>
                                <select {...register('industry')} className="form-field__select">
                                    {Object.entries(industryLabels).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Number of sites</label>
                                <input type="number" {...register('N_sites')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Number of operators using SOPs</label>
                                <input type="number" {...register('N_op')} className="form-field__input" />
                                <span className="form-field__help">Operators who perform the procedures you want to digitize in AR.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">New operators per year</label>
                                <input type="number" {...register('N_new')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Average SOP executions per operator per year</label>
                                <input type="number" {...register('Exec_per_op_per_year')} className="form-field__input" />
                                <span className="form-field__help">Across the procedures you want to digitize. Example: 400 setups/changeovers per operator per year.</span>
                            </div>
                        </section>
                    )}

                    {currentStep === 2 && (
                        <section className="form-section">
                            <h3 className="form-section__title">Training and onboarding today</h3>

                            <div className="form-field">
                                <label className="form-field__label">Training hours per new operator today</label>
                                <input type="number" {...register('H_train_base')} className="form-field__input" />
                                <span className="form-field__help">Classroom, on-the-job and shadowing, until they can work independently.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Training hours per new operator with AR (expected)</label>
                                <input type="number" {...register('H_train_AR')} className="form-field__input" />
                                <span className="form-field__help">In many AR projects, training time is reduced by 30–50%.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Hourly cost of operators (€)</label>
                                <input type="number" {...register('C_hour_op')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Hourly cost of trainers/experts (€)</label>
                                <input type="number" {...register('C_hour_trainer')} className="form-field__input" />
                            </div>

                            <div className="results-panel__insight" style={{ marginTop: 'var(--space-lg)' }}>
                                <p>💡 Studies show operators can learn up to 4x faster using AR versus traditional manuals.</p>
                            </div>
                        </section>
                    )}

                    {currentStep === 3 && (
                        <section className="form-section">
                            <h3 className="form-section__title">Quality losses and downtime</h3>

                            <div className="form-field">
                                <label className="form-field__label">Current error rate on these SOPs (%)</label>
                                <input type="number" step="0.1" {...register('Error_rate_base')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Expected error rate with AR (%)</label>
                                <input type="number" step="0.1" {...register('Error_rate_AR')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Average cost per error (€)</label>
                                <input type="number" {...register('Cost_per_error')} className="form-field__input" />
                                <span className="form-field__help">Include scrap, rework, extra QC, complaints, lost batch, etc.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Unplanned downtime hours per year caused by SOP issues</label>
                                <input type="number" {...register('H_downtime_base_per_year')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Expected reduction in SOP-related downtime (%)</label>
                                <input type="number" {...register('Downtime_reduction_pct')} className="form-field__input" />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Cost per hour of downtime (€)</label>
                                <input type="number" {...register('Cost_per_downtime_hour')} className="form-field__input" />
                            </div>
                        </section>
                    )}

                    {currentStep === 4 && (
                        <section className="form-section">
                            <h3 className="form-section__title">Solution costs and adoption</h3>

                            <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>Licenses & Hardware</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div className="form-field">
                                    <label className="form-field__label">Number of AR users</label>
                                    <input type="number" {...register('N_users')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">License cost per user/year (€)</label>
                                    <input type="number" {...register('C_license_user_year')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Site license/year (€)</label>
                                    <input type="number" {...register('C_license_site_year')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Number of devices</label>
                                    <input type="number" {...register('N_devices')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Device cost per unit (€)</label>
                                    <input type="number" {...register('C_device_per_user')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Hardware lifetime (years)</label>
                                    <input type="number" {...register('Device_lifetime_years')} className="form-field__input" />
                                </div>
                            </div>

                            <h4 style={{ margin: 'var(--space-lg) 0 var(--space-md)', color: 'var(--color-text-secondary)' }}>Implementation & Content</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div className="form-field">
                                    <label className="form-field__label">One-time implementation (€)</label>
                                    <input type="number" {...register('Implementation_one_time')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Initial content creation (€)</label>
                                    <input type="number" {...register('Content_initial')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Annual content maintenance (€)</label>
                                    <input type="number" {...register('Content_annual')} className="form-field__input" />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Internal PM hours/year</label>
                                    <input type="number" {...register('Internal_PM_hours')} className="form-field__input" />
                                </div>
                            </div>

                            <h4 style={{ margin: 'var(--space-lg) 0 var(--space-md)', color: 'var(--color-text-secondary)' }}>Adoption Timeline</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
                                <div className="form-field">
                                    <label className="form-field__label">Year 1 adoption</label>
                                    <input type="number" step="0.1" {...register('Adoption_year1')} className="form-field__input" />
                                </div>
                                <div className="form-field">
                                    <label className="form-field__label">Year 2 adoption</label>
                                    <input type="number" step="0.1" {...register('Adoption_year2')} className="form-field__input" />
                                </div>
                                <div className="form-field">
                                    <label className="form-field__label">Year 3 adoption</label>
                                    <input type="number" step="0.1" {...register('Adoption_year3')} className="form-field__input" />
                                </div>
                            </div>
                        </section>
                    )}

                    {currentStep === 5 && (
                        <section className="form-section">
                            <h3 className="form-section__title">Your AR SOP Business Case</h3>

                            <ResultsPanel results={results} variant="full" />

                            {results && (
                                <div style={{ marginTop: 'var(--space-xl)' }}>
                                    <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                                        Cumulative Cashflow
                                    </h4>
                                    <CashflowChart cashflow={results.cashflow} />
                                </div>
                            )}

                            <div className="quick-snapshot__cta" style={{ marginTop: 'var(--space-xl)' }}>
                                <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                                    Would you like us to validate this case with your real SOP data and build a rollout scenario?
                                </p>
                                <button type="button" className="btn btn--primary" onClick={handleComplete}>
                                    Schedule a 30-min ROI review with ActARion
                                </button>
                            </div>
                        </section>
                    )}

                    {/* Navigation */}
                    <div className="wizard__nav">
                        {currentStep > 1 && (
                            <button type="button" className="btn btn--secondary" onClick={prevStep}>
                                ← Previous
                            </button>
                        )}
                        {currentStep < 5 && (
                            <button
                                type="button"
                                className="btn btn--primary"
                                onClick={nextStep}
                                style={{ marginLeft: 'auto' }}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>

                {/* Side panel with live results (except on final step) */}
                {currentStep < 5 && (
                    <div className="wizard__sidebar">
                        <ResultsPanel results={results} variant="compact" />
                    </div>
                )}
            </div>
        </div>
    );
}
