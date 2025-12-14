'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoiInputs, Industry, ImpactPreset, RoiResults } from '@/types/roi';
import { calculateRoi } from '@/lib/roiCalculator';
import {
    getDefaultInputs,
    industryLabels,
    impactPresets,
} from '@/lib/industryPresets';
import { ResultsPanel } from './ResultsPanel';

// Validation schema for Quick Snapshot form
const quickSnapshotSchema = z.object({
    industry: z.enum(['food_beverage', 'pharma', 'packaging', 'logistics', 'other']),
    N_op: z.coerce.number().min(1).max(1000),
    N_new: z.coerce.number().min(0).max(200),
    H_train_base: z.coerce.number().min(1).max(200),
    Error_rate_base: z.coerce.number().min(0).max(20),
    Cost_per_error: z.coerce.number().min(0).max(10000),
    H_downtime_base_per_year: z.coerce.number().min(0).max(1000),
    Cost_per_downtime_hour: z.coerce.number().min(0).max(50000),
    C_hour_op: z.coerce.number().min(10).max(200),
    Horizon_years: z.coerce.number().min(1).max(5),
    impactPreset: z.enum(['conservative', 'typical', 'ambitious']),
});

type QuickSnapshotForm = z.infer<typeof quickSnapshotSchema>;

export function QuickRoiSnapshot() {
    const [results, setResults] = useState<RoiResults | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry>('food_beverage');

    const defaultInputs = getDefaultInputs(selectedIndustry);

    const { register, watch, setValue, formState: { errors } } = useForm<QuickSnapshotForm>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(quickSnapshotSchema) as any,
        defaultValues: {
            industry: 'food_beverage',
            N_op: defaultInputs.workforce.N_op,
            N_new: defaultInputs.workforce.N_new,
            H_train_base: defaultInputs.training.H_train_base,
            Error_rate_base: defaultInputs.quality.Error_rate_base,
            Cost_per_error: defaultInputs.quality.Cost_per_error,
            H_downtime_base_per_year: defaultInputs.downtime.H_downtime_base_per_year,
            Cost_per_downtime_hour: defaultInputs.downtime.Cost_per_downtime_hour,
            C_hour_op: defaultInputs.training.C_hour_op,
            Horizon_years: 3,
            impactPreset: 'typical',
        },
    });

    const formValues = watch();

    // Calculate ROI whenever form values change
    const calculateResults = useCallback(() => {
        const baseInputs = getDefaultInputs(formValues.industry as Industry);
        const impact = impactPresets[formValues.impactPreset as ImpactPreset];

        // Build complete inputs from form values
        const inputs: RoiInputs = {
            workforce: {
                N_op: formValues.N_op,
                N_new: formValues.N_new,
                SOP_count: baseInputs.workforce.SOP_count,
            },
            training: {
                H_train_base: formValues.H_train_base,
                H_train_AR: formValues.H_train_base * (1 - impact.trainingReduction / 100),
                C_hour_op: formValues.C_hour_op,
                C_hour_trainer: baseInputs.training.C_hour_trainer,
            },
            quality: {
                Exec_per_op_per_year: baseInputs.quality.Exec_per_op_per_year,
                Error_rate_base: formValues.Error_rate_base,
                Error_rate_AR: formValues.Error_rate_base * (1 - impact.errorReduction / 100),
                Cost_per_error: formValues.Cost_per_error,
            },
            downtime: {
                H_downtime_base_per_year: formValues.H_downtime_base_per_year,
                Downtime_reduction_pct: impact.downtimeReduction,
                Cost_per_downtime_hour: formValues.Cost_per_downtime_hour,
            },
            remoteSupport: baseInputs.remoteSupport,
            costs: baseInputs.costs,
            financial: {
                ...baseInputs.financial,
                Horizon_years: formValues.Horizon_years,
            },
        };

        const calculatedResults = calculateRoi(inputs);
        setResults(calculatedResults);
    }, [formValues]);

    useEffect(() => {
        const timer = setTimeout(() => {
            calculateResults();
        }, 100);
        return () => clearTimeout(timer);
    }, [calculateResults]);

    // Update defaults when industry changes
    useEffect(() => {
        if (formValues.industry !== selectedIndustry) {
            const newDefaults = getDefaultInputs(formValues.industry as Industry);
            setSelectedIndustry(formValues.industry as Industry);
            setValue('N_op', newDefaults.workforce.N_op);
            setValue('N_new', newDefaults.workforce.N_new);
            setValue('H_train_base', newDefaults.training.H_train_base);
            setValue('Error_rate_base', newDefaults.quality.Error_rate_base);
            setValue('Cost_per_error', newDefaults.quality.Cost_per_error);
            setValue('H_downtime_base_per_year', newDefaults.downtime.H_downtime_base_per_year);
            setValue('Cost_per_downtime_hour', newDefaults.downtime.Cost_per_downtime_hour);
            setValue('C_hour_op', newDefaults.training.C_hour_op);
        }
    }, [formValues.industry, selectedIndustry, setValue]);

    return (
        <div className="quick-snapshot">
            <div className="quick-snapshot__header">
                <h2 className="quick-snapshot__title">What could AR-guided SOPs save your plant?</h2>
                <p className="quick-snapshot__subtitle">
                    Answer a few questions and see your estimated savings, payback time, and 3-year ROI.
                </p>
            </div>

            <div className="quick-snapshot__layout">
                <form className="quick-snapshot__form">
                    {/* Section A: Your Operation */}
                    <section className="form-section">
                        <h3 className="form-section__title">Your Operation</h3>

                        <div className="form-field">
                            <label className="form-field__label">Industry</label>
                            <select {...register('industry')} className="form-field__select">
                                {Object.entries(industryLabels).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                            <span className="form-field__help">Used to pre-fill some assumptions. You can change them.</span>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Number of operators using SOPs</label>
                            <input
                                type="number"
                                {...register('N_op')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Operators who perform the procedures you want to digitize in AR.</span>
                            {errors.N_op && <span className="form-field__error">{errors.N_op.message}</span>}
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">New operators per year</label>
                            <input
                                type="number"
                                {...register('N_new')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Rough estimate of new hires or internal transfers per year.</span>
                        </div>
                    </section>

                    {/* Section B: Training & Quality */}
                    <section className="form-section">
                        <h3 className="form-section__title">Training & Quality</h3>

                        <div className="form-field">
                            <label className="form-field__label">Training hours per new operator today</label>
                            <input
                                type="number"
                                {...register('H_train_base')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Formal training + shadowing before someone can run independently.</span>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Average error rate on these SOPs (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                {...register('Error_rate_base')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">How many executions out of 100 lead to scrap, rework, or deviation?</span>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Average cost per error (€)</label>
                            <input
                                type="number"
                                {...register('Cost_per_error')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Include scrap, rework time, extra checks, lost output.</span>
                        </div>
                    </section>

                    {/* Section C: Downtime & Cost */}
                    <section className="form-section">
                        <h3 className="form-section__title">Downtime & Cost of Time</h3>

                        <div className="form-field">
                            <label className="form-field__label">Downtime hours per year caused by SOP issues</label>
                            <input
                                type="number"
                                {...register('H_downtime_base_per_year')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Unplanned stops due to incorrect setup, changeover, or procedure mistakes.</span>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Cost of one hour downtime (€)</label>
                            <input
                                type="number"
                                {...register('Cost_per_downtime_hour')}
                                className="form-field__input"
                            />
                            <span className="form-field__help">Rough OEE cost or lost margin per hour line downtime.</span>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Average hourly cost of an operator (€)</label>
                            <input
                                type="number"
                                {...register('C_hour_op')}
                                className="form-field__input"
                            />
                        </div>
                    </section>

                    {/* Section D: AR Adoption */}
                    <section className="form-section">
                        <h3 className="form-section__title">AR Adoption</h3>

                        <div className="form-field">
                            <label className="form-field__label">AR adoption horizon</label>
                            <div className="form-field__radio-group">
                                {[1, 3, 5].map((years) => (
                                    <label key={years} className="form-field__radio">
                                        <input
                                            type="radio"
                                            value={years}
                                            {...register('Horizon_years')}
                                        />
                                        <span>{years} year{years > 1 ? 's' : ''}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Expected AR impact</label>
                            <div className="form-field__preset-group">
                                {Object.entries(impactPresets).map(([key, preset]) => (
                                    <label key={key} className="form-field__preset">
                                        <input
                                            type="radio"
                                            value={key}
                                            {...register('impactPreset')}
                                        />
                                        <div className="form-field__preset-content">
                                            <strong>{preset.label}</strong>
                                            <span>{preset.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>
                </form>

                {/* Results Panel */}
                <div className="quick-snapshot__results">
                    <ResultsPanel results={results} variant="compact" />

                    <div className="quick-snapshot__cta">
                        <button type="button" className="btn btn--primary">
                            Discuss your numbers with ActARion
                        </button>
                        <p className="quick-snapshot__cta-help">
                            We&apos;ll validate the assumptions with you and build a project-sized ROI.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
