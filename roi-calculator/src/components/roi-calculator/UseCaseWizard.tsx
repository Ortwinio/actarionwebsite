'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    UseCaseId,
    UseCaseInputs,
    CostInputs,
    GlobalInputs,
    ScenarioResult,
    ScenarioInputs,
    AssemblyInputs,
    ChangeoverInputs,
    MaintenanceInputs,
    FaultRecoveryInputs,
    TrainingInputs,
} from '@/lib/roi/types';
import { calculateScenario, DEFAULT_GLOBAL_INPUTS, DEFAULT_COST_INPUTS } from '@/lib/roi/scenario';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';
import { RequesterInfo } from '@/lib/roi/pdf/types';
import { UseCaseSelector } from './UseCaseSelector';
import { ResultsPanel } from './ResultsPanel';
import { CashflowChart } from './CashflowChart';
import {
    AssemblyInputForm,
    ChangeoverInputForm,
    MaintenanceInputForm,
    FaultRecoveryInputForm,
    TrainingInputForm,
    DEFAULT_ASSEMBLY_INPUTS,
    DEFAULT_CHANGEOVER_INPUTS,
    DEFAULT_MAINTENANCE_INPUTS,
    DEFAULT_FAULT_RECOVERY_INPUTS,
    DEFAULT_TRAINING_INPUTS,
} from './usecases';

interface UseCaseWizardProps {
    onComplete?: (result: ScenarioResult) => void;
}

export function UseCaseWizard({ onComplete }: UseCaseWizardProps) {
    // State
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedUseCases, setSelectedUseCases] = useState<UseCaseId[]>(['changeover']);
    const [results, setResults] = useState<ScenarioResult | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    // Lead capture
    const [requesterInfo, setRequesterInfo] = useState<RequesterInfo>({
        companyName: '',
        contactName: '',
        email: '',
        role: '',
        country: '',
        siteName: '',
        notes: '',
    });

    // Use case inputs
    const [assemblyInputs, setAssemblyInputs] = useState<AssemblyInputs>(DEFAULT_ASSEMBLY_INPUTS);
    const [changeoverInputs, setChangeoverInputs] = useState<ChangeoverInputs>(DEFAULT_CHANGEOVER_INPUTS);
    const [maintenanceInputs, setMaintenanceInputs] = useState<MaintenanceInputs>(DEFAULT_MAINTENANCE_INPUTS);
    const [faultRecoveryInputs, setFaultRecoveryInputs] = useState<FaultRecoveryInputs>(DEFAULT_FAULT_RECOVERY_INPUTS);
    const [trainingInputs, setTrainingInputs] = useState<TrainingInputs>(DEFAULT_TRAINING_INPUTS);

    // Cost inputs
    const [costInputs, setCostInputs] = useState<CostInputs>(DEFAULT_COST_INPUTS);

    // Global inputs
    const [globalInputs] = useState<GlobalInputs>(DEFAULT_GLOBAL_INPUTS);

    // Build steps dynamically based on selected use cases
    const steps = useMemo(() => {
        const baseSteps = [{ id: 'select', title: 'Select Use Cases' }];

        selectedUseCases.forEach((ucId) => {
            const option = USE_CASE_OPTIONS.find((o) => o.id === ucId);
            if (option) {
                baseSteps.push({ id: ucId, title: option.label });
            }
        });

        baseSteps.push({ id: 'costs', title: 'Investment' });
        baseSteps.push({ id: 'results', title: 'Results' });

        return baseSteps;
    }, [selectedUseCases]);

    const totalSteps = steps.length;

    // Build use case inputs array
    const buildUseCaseInputs = useCallback((): UseCaseInputs[] => {
        const inputs: UseCaseInputs[] = [];

        if (selectedUseCases.includes('assembly')) {
            inputs.push({ id: 'assembly', payload: assemblyInputs });
        }
        if (selectedUseCases.includes('changeover')) {
            inputs.push({ id: 'changeover', payload: changeoverInputs });
        }
        if (selectedUseCases.includes('maintenance')) {
            inputs.push({ id: 'maintenance', payload: maintenanceInputs });
        }
        if (selectedUseCases.includes('fault_recovery')) {
            inputs.push({ id: 'fault_recovery', payload: faultRecoveryInputs });
        }
        if (selectedUseCases.includes('training')) {
            inputs.push({ id: 'training', payload: trainingInputs });
        }

        return inputs;
    }, [selectedUseCases, assemblyInputs, changeoverInputs, maintenanceInputs, faultRecoveryInputs, trainingInputs]);

    // Build scenario inputs
    const buildScenarioInputs = useCallback((): ScenarioInputs => ({
        global: globalInputs,
        useCases: buildUseCaseInputs(),
        costs: costInputs,
    }), [globalInputs, buildUseCaseInputs, costInputs]);

    // Calculate results
    const calculateResults = useCallback(() => {
        if (selectedUseCases.length === 0) {
            setResults(null);
            return;
        }

        const scenarioInputs = buildScenarioInputs();
        const result = calculateScenario(scenarioInputs);
        setResults(result);
    }, [selectedUseCases, buildScenarioInputs]);

    useEffect(() => {
        const timer = setTimeout(calculateResults, 100);
        return () => clearTimeout(timer);
    }, [calculateResults]);

    // Navigation
    const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
    const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

    const canProceed = currentStep === 0 ? selectedUseCases.length > 0 : true;

    // PDF Download
    const handleDownloadPdf = async () => {
        if (!results) return;

        // Validate required fields
        if (!requesterInfo.companyName || !requesterInfo.contactName || !requesterInfo.email) {
            setDownloadError('Please fill in Company, Name, and Email to download the report.');
            return;
        }

        setIsDownloading(true);
        setDownloadError(null);

        try {
            const response = await fetch('/api/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requester: requesterInfo,
                    scenarioInputs: buildScenarioInputs(),
                    selectedUseCases,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to generate PDF');
            }

            // Download the PDF
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `actarion-roi-report-${requesterInfo.companyName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Notify completion
            onComplete?.(results);
        } catch (err) {
            setDownloadError(err instanceof Error ? err.message : 'Failed to download PDF');
        } finally {
            setIsDownloading(false);
        }
    };

    // Render current step content
    const renderStepContent = () => {
        const step = steps[currentStep];
        if (!step) return null;

        switch (step.id) {
            case 'select':
                return (
                    <UseCaseSelector
                        selectedUseCases={selectedUseCases}
                        onChange={setSelectedUseCases}
                    />
                );

            case 'assembly':
                return <AssemblyInputForm values={assemblyInputs} onChange={setAssemblyInputs} />;

            case 'changeover':
                return <ChangeoverInputForm values={changeoverInputs} onChange={setChangeoverInputs} />;

            case 'maintenance':
                return <MaintenanceInputForm values={maintenanceInputs} onChange={setMaintenanceInputs} />;

            case 'fault_recovery':
                return <FaultRecoveryInputForm values={faultRecoveryInputs} onChange={setFaultRecoveryInputs} />;

            case 'training':
                return <TrainingInputForm values={trainingInputs} onChange={setTrainingInputs} />;

            case 'costs':
                return (
                    <section className="form-section">
                        <h3 className="form-section__title">💰 Investment</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                            <div className="form-field">
                                <label className="form-field__label">Annual software cost (€)</label>
                                <input
                                    type="number"
                                    value={costInputs.annualSoftwareCost}
                                    onChange={(e) => setCostInputs({ ...costInputs, annualSoftwareCost: Number(e.target.value) })}
                                    className="form-field__input"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Annual hardware cost (€)</label>
                                <input
                                    type="number"
                                    value={costInputs.annualHardwareCost}
                                    onChange={(e) => setCostInputs({ ...costInputs, annualHardwareCost: Number(e.target.value) })}
                                    className="form-field__input"
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">Annual OPEX (€)</label>
                                <input
                                    type="number"
                                    value={costInputs.annualOpexCost}
                                    onChange={(e) => setCostInputs({ ...costInputs, annualOpexCost: Number(e.target.value) })}
                                    className="form-field__input"
                                />
                                <span className="form-field__help">Content maintenance, internal PM, etc.</span>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">One-time implementation (€)</label>
                                <input
                                    type="number"
                                    value={costInputs.oneTimeCost}
                                    onChange={(e) => setCostInputs({ ...costInputs, oneTimeCost: Number(e.target.value) })}
                                    className="form-field__input"
                                />
                            </div>
                        </div>
                    </section>
                );

            case 'results':
                return (
                    <section className="form-section">
                        <h3 className="form-section__title">📊 Your AR SOP Business Case</h3>

                        <ResultsPanel results={results} variant="full" />

                        {results && (
                            <div style={{ marginTop: 'var(--space-xl)' }}>
                                <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                                    Cumulative Cashflow
                                </h4>
                                <CashflowChart cashflow={results.cumulativeCashflows.map((c, i) => ({ year: i, cumulative: c }))} />
                            </div>
                        )}

                        {/* Lead Capture Form */}
                        <div style={{ marginTop: 'var(--space-2xl)', padding: 'var(--space-lg)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                            <h4 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
                                📄 Download Your ROI Report
                            </h4>
                            <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                Fill in your details to receive a comprehensive PDF report with all calculations and recommendations.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div className="form-field">
                                    <label className="form-field__label">Company *</label>
                                    <input
                                        type="text"
                                        value={requesterInfo.companyName}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, companyName: e.target.value })}
                                        className="form-field__input"
                                        placeholder="Acme Manufacturing"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Site (optional)</label>
                                    <input
                                        type="text"
                                        value={requesterInfo.siteName}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, siteName: e.target.value })}
                                        className="form-field__input"
                                        placeholder="Plant Munich"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Your Name *</label>
                                    <input
                                        type="text"
                                        value={requesterInfo.contactName}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, contactName: e.target.value })}
                                        className="form-field__input"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Role (optional)</label>
                                    <input
                                        type="text"
                                        value={requesterInfo.role}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, role: e.target.value })}
                                        className="form-field__input"
                                        placeholder="Operations Manager"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Email *</label>
                                    <input
                                        type="email"
                                        value={requesterInfo.email}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, email: e.target.value })}
                                        className="form-field__input"
                                        placeholder="john.doe@acme.com"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Country (optional)</label>
                                    <input
                                        type="text"
                                        value={requesterInfo.country}
                                        onChange={(e) => setRequesterInfo({ ...requesterInfo, country: e.target.value })}
                                        className="form-field__input"
                                        placeholder="Germany"
                                    />
                                </div>
                            </div>

                            <div className="form-field" style={{ marginTop: 'var(--space-md)' }}>
                                <label className="form-field__label">Notes / specific context (optional)</label>
                                <textarea
                                    value={requesterInfo.notes}
                                    onChange={(e) => setRequesterInfo({ ...requesterInfo, notes: e.target.value })}
                                    className="form-field__input"
                                    rows={2}
                                    placeholder="e.g., Changeovers on Line 3 and preventive maintenance on fillers"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            {downloadError && (
                                <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-sm) var(--space-md)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', color: '#ef4444', fontSize: '0.875rem' }}>
                                    {downloadError}
                                </div>
                            )}

                            <div style={{ marginTop: 'var(--space-lg)' }}>
                                <button
                                    type="button"
                                    className="btn btn--primary"
                                    onClick={handleDownloadPdf}
                                    disabled={isDownloading}
                                    style={{ width: '100%' }}
                                >
                                    {isDownloading ? 'Generating PDF...' : '📥 Download ROI Report (PDF)'}
                                </button>
                            </div>
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div className="wizard">
            {/* Progress bar */}
            <div className="wizard__progress">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`wizard__step ${currentStep === index ? 'wizard__step--active' : ''} ${currentStep > index ? 'wizard__step--completed' : ''}`}
                    >
                        <div className="wizard__step-number">
                            {currentStep > index ? '✓' : index + 1}
                        </div>
                        <span className="wizard__step-label">{step.title}</span>
                    </div>
                ))}
            </div>

            <div className="wizard__content">
                {/* Form content */}
                <div className="wizard__form">
                    {renderStepContent()}

                    {/* Navigation */}
                    <div className="wizard__nav">
                        {currentStep > 0 && (
                            <button type="button" className="btn btn--secondary" onClick={prevStep}>
                                ← Previous
                            </button>
                        )}
                        {currentStep < totalSteps - 1 && (
                            <button
                                type="button"
                                className="btn btn--primary"
                                onClick={nextStep}
                                disabled={!canProceed}
                                style={{ marginLeft: 'auto' }}
                            >
                                Next →
                            </button>
                        )}
                    </div>
                </div>

                {/* Side panel with live results (except on results step) */}
                {currentStep > 0 && currentStep < totalSteps - 1 && (
                    <div className="wizard__sidebar">
                        <ResultsPanel results={results} variant="compact" />
                    </div>
                )}
            </div>
        </div>
    );
}
