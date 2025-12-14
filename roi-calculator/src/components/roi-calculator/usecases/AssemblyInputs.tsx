'use client';

import { AssemblyInputs } from '@/lib/roi/types';
import { roiFieldConfig } from '@/lib/roi/fieldConfig';
import { SimpleInputField } from '@/components/roi/InputField';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface AssemblyInputFormProps {
    values: AssemblyInputs;
    onChange: (values: AssemblyInputs) => void;
}

export function AssemblyInputForm({ values, onChange }: AssemblyInputFormProps) {
    const update = <K extends keyof AssemblyInputs>(key: K, value: AssemblyInputs[K]) => {
        onChange({ ...values, [key]: value });
    };

    const cfg = roiFieldConfig;
    const useCaseInfo = USE_CASE_OPTIONS.find((uc) => uc.id === 'assembly');

    return (
        <section className="form-section">
            <h3 className="form-section__title">🔧 Error-free Assembly with AR</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {useCaseInfo?.description}
            </p>

            <SimpleInputField
                id={cfg.assembly_unitsPerYear.id}
                label={cfg.assembly_unitsPerYear.label}
                tooltip={cfg.assembly_unitsPerYear.tooltip}
                placeholder={cfg.assembly_unitsPerYear.placeholder}
                type={cfg.assembly_unitsPerYear.type}
                value={values.unitsPerYear}
                onChange={(v) => update('unitsPerYear', v)}
                help="Total number of assemblies performed annually."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.assembly_errorRateBase.id}
                    label={cfg.assembly_errorRateBase.label}
                    tooltip={cfg.assembly_errorRateBase.tooltip}
                    placeholder={cfg.assembly_errorRateBase.placeholder}
                    type={cfg.assembly_errorRateBase.type}
                    value={values.errorRateBase}
                    onChange={(v) => update('errorRateBase', v)}
                />

                <SimpleInputField
                    id={cfg.assembly_errorRateAr.id}
                    label={cfg.assembly_errorRateAr.label}
                    tooltip={cfg.assembly_errorRateAr.tooltip}
                    placeholder={cfg.assembly_errorRateAr.placeholder}
                    type={cfg.assembly_errorRateAr.type}
                    value={values.errorRateAr}
                    onChange={(v) => update('errorRateAr', v)}
                />
            </div>

            <SimpleInputField
                id={cfg.assembly_costPerError.id}
                label={cfg.assembly_costPerError.label}
                tooltip={cfg.assembly_costPerError.tooltip}
                placeholder={cfg.assembly_costPerError.placeholder}
                type={cfg.assembly_costPerError.type}
                value={values.costPerError}
                onChange={(v) => update('costPerError', v)}
                help="Include rework, scrap, downtime, quality checks."
            />
        </section>
    );
}

// Default values
export const DEFAULT_ASSEMBLY_INPUTS: AssemblyInputs = {
    unitsPerYear: 50000,
    errorRateBase: 0.03,
    errorRateAr: 0.01,
    costPerError: 150,
};
