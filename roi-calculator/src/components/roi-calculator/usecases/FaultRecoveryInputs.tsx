'use client';

import { FaultRecoveryInputs } from '@/lib/roi/types';
import { roiFieldConfig } from '@/lib/roi/fieldConfig';
import { SimpleInputField } from '@/components/roi/InputField';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface FaultRecoveryInputFormProps {
    values: FaultRecoveryInputs;
    onChange: (values: FaultRecoveryInputs) => void;
}

export function FaultRecoveryInputForm({ values, onChange }: FaultRecoveryInputFormProps) {
    const update = <K extends keyof FaultRecoveryInputs>(key: K, value: FaultRecoveryInputs[K]) => {
        onChange({ ...values, [key]: value });
    };

    const cfg = roiFieldConfig;
    const useCaseInfo = USE_CASE_OPTIONS.find((uc) => uc.id === 'fault_recovery');

    return (
        <section className="form-section">
            <h3 className="form-section__title">📡 Fast Fault Recovery (Remote Expert)</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {useCaseInfo?.description}
            </p>

            <SimpleInputField
                id={cfg.fault_incidentsPerYear.id}
                label={cfg.fault_incidentsPerYear.label}
                tooltip={cfg.fault_incidentsPerYear.tooltip}
                placeholder={cfg.fault_incidentsPerYear.placeholder}
                type={cfg.fault_incidentsPerYear.type}
                value={values.incidentsPerYear}
                onChange={(v) => update('incidentsPerYear', v)}
                help="Number of fault/breakdown incidents requiring resolution."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.fault_mttrBase.id}
                    label={cfg.fault_mttrBase.label}
                    tooltip={cfg.fault_mttrBase.tooltip}
                    placeholder={cfg.fault_mttrBase.placeholder}
                    type={cfg.fault_mttrBase.type}
                    value={values.mttrBase}
                    onChange={(v) => update('mttrBase', v)}
                />

                <SimpleInputField
                    id={cfg.fault_mttrAr.id}
                    label={cfg.fault_mttrAr.label}
                    tooltip={cfg.fault_mttrAr.tooltip}
                    placeholder={cfg.fault_mttrAr.placeholder}
                    type={cfg.fault_mttrAr.type}
                    value={values.mttrAr}
                    onChange={(v) => update('mttrAr', v)}
                />
            </div>

            <SimpleInputField
                id={cfg.fault_costPerHour.id}
                label={cfg.fault_costPerHour.label}
                tooltip={cfg.fault_costPerHour.tooltip}
                placeholder={cfg.fault_costPerHour.placeholder}
                type={cfg.fault_costPerHour.type}
                value={values.costPerDowntimeHour}
                onChange={(v) => update('costPerDowntimeHour', v)}
            />

            <h4 style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                Optional: On-Site Visits Avoided
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.fault_onsiteVisits.id}
                    label={cfg.fault_onsiteVisits.label}
                    tooltip={cfg.fault_onsiteVisits.tooltip}
                    placeholder={cfg.fault_onsiteVisits.placeholder}
                    type={cfg.fault_onsiteVisits.type}
                    value={values.onsiteVisitsPerYear ?? 0}
                    onChange={(v) => update('onsiteVisitsPerYear', v || undefined)}
                />

                <SimpleInputField
                    id={cfg.fault_costPerVisit.id}
                    label={cfg.fault_costPerVisit.label}
                    tooltip={cfg.fault_costPerVisit.tooltip}
                    placeholder={cfg.fault_costPerVisit.placeholder}
                    type={cfg.fault_costPerVisit.type}
                    value={values.costPerVisit ?? 0}
                    onChange={(v) => update('costPerVisit', v || undefined)}
                />

                <SimpleInputField
                    id={cfg.fault_visitReductionPct.id}
                    label={cfg.fault_visitReductionPct.label}
                    tooltip={cfg.fault_visitReductionPct.tooltip}
                    placeholder={cfg.fault_visitReductionPct.placeholder}
                    type={cfg.fault_visitReductionPct.type}
                    value={values.visitReductionPct ?? 0}
                    onChange={(v) => update('visitReductionPct', v || undefined)}
                />
            </div>
        </section>
    );
}

export const DEFAULT_FAULT_RECOVERY_INPUTS: FaultRecoveryInputs = {
    incidentsPerYear: 50,
    mttrBase: 4,
    mttrAr: 2,
    costPerDowntimeHour: 2500,
};
