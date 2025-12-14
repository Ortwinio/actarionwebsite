'use client';

import { TrainingInputs } from '@/lib/roi/types';
import { roiFieldConfig } from '@/lib/roi/fieldConfig';
import { SimpleInputField } from '@/components/roi/InputField';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface TrainingInputFormProps {
    values: TrainingInputs;
    onChange: (values: TrainingInputs) => void;
}

export function TrainingInputForm({ values, onChange }: TrainingInputFormProps) {
    const update = <K extends keyof TrainingInputs>(key: K, value: TrainingInputs[K]) => {
        onChange({ ...values, [key]: value });
    };

    const cfg = roiFieldConfig;
    const useCaseInfo = USE_CASE_OPTIONS.find((uc) => uc.id === 'training');

    return (
        <section className="form-section">
            <h3 className="form-section__title">🎓 Onboarding & Training with AR SOPs</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {useCaseInfo?.description}
            </p>

            <SimpleInputField
                id={cfg.training_newOperatorsPerYear.id}
                label={cfg.training_newOperatorsPerYear.label}
                tooltip={cfg.training_newOperatorsPerYear.tooltip}
                placeholder={cfg.training_newOperatorsPerYear.placeholder}
                type={cfg.training_newOperatorsPerYear.type}
                value={values.newOperatorsPerYear}
                onChange={(v) => update('newOperatorsPerYear', v)}
                help="New hires + internal transfers needing training."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.training_hoursBase.id}
                    label={cfg.training_hoursBase.label}
                    tooltip={cfg.training_hoursBase.tooltip}
                    placeholder={cfg.training_hoursBase.placeholder}
                    type={cfg.training_hoursBase.type}
                    value={values.trainingHoursBase}
                    onChange={(v) => update('trainingHoursBase', v)}
                />

                <SimpleInputField
                    id={cfg.training_hoursAr.id}
                    label={cfg.training_hoursAr.label}
                    tooltip={cfg.training_hoursAr.tooltip}
                    placeholder={cfg.training_hoursAr.placeholder}
                    type={cfg.training_hoursAr.type}
                    value={values.trainingHoursAr}
                    onChange={(v) => update('trainingHoursAr', v)}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.training_operatorRate.id}
                    label={cfg.training_operatorRate.label}
                    tooltip={cfg.training_operatorRate.tooltip}
                    placeholder={cfg.training_operatorRate.placeholder}
                    type={cfg.training_operatorRate.type}
                    value={values.operatorRate}
                    onChange={(v) => update('operatorRate', v)}
                />

                <SimpleInputField
                    id={cfg.training_trainerRate.id}
                    label={cfg.training_trainerRate.label}
                    tooltip={cfg.training_trainerRate.tooltip}
                    placeholder={cfg.training_trainerRate.placeholder}
                    type={cfg.training_trainerRate.type}
                    value={values.trainerRate}
                    onChange={(v) => update('trainerRate', v)}
                />
            </div>

            <div className="results-panel__insight" style={{ marginTop: 'var(--space-lg)' }}>
                <p>💡 Studies show operators can learn up to 4x faster using AR versus traditional manuals.</p>
            </div>
        </section>
    );
}

export const DEFAULT_TRAINING_INPUTS: TrainingInputs = {
    newOperatorsPerYear: 8,
    trainingHoursBase: 40,
    trainingHoursAr: 20,
    operatorRate: 40,
    trainerRate: 60,
};
