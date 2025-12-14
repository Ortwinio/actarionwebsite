'use client';

import { MaintenanceInputs } from '@/lib/roi/types';
import { roiFieldConfig } from '@/lib/roi/fieldConfig';
import { SimpleInputField } from '@/components/roi/InputField';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface MaintenanceInputFormProps {
    values: MaintenanceInputs;
    onChange: (values: MaintenanceInputs) => void;
}

export function MaintenanceInputForm({ values, onChange }: MaintenanceInputFormProps) {
    const update = <K extends keyof MaintenanceInputs>(key: K, value: MaintenanceInputs[K]) => {
        onChange({ ...values, [key]: value });
    };

    const cfg = roiFieldConfig;
    const useCaseInfo = USE_CASE_OPTIONS.find((uc) => uc.id === 'maintenance');

    return (
        <section className="form-section">
            <h3 className="form-section__title">🛠️ Data-Driven / AR-Guided Maintenance</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {useCaseInfo?.description}
            </p>

            <SimpleInputField
                id={cfg.maintenance_downtimeHours.id}
                label={cfg.maintenance_downtimeHours.label}
                tooltip={cfg.maintenance_downtimeHours.tooltip}
                placeholder={cfg.maintenance_downtimeHours.placeholder}
                type={cfg.maintenance_downtimeHours.type}
                value={values.downtimeHoursBasePerYear}
                onChange={(v) => update('downtimeHoursBasePerYear', v)}
                help="Hours of unplanned stops due to maintenance issues."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.maintenance_reductionPct.id}
                    label={cfg.maintenance_reductionPct.label}
                    tooltip={cfg.maintenance_reductionPct.tooltip}
                    placeholder={cfg.maintenance_reductionPct.placeholder}
                    type={cfg.maintenance_reductionPct.type}
                    value={values.downtimeReductionPct}
                    onChange={(v) => update('downtimeReductionPct', v)}
                />

                <SimpleInputField
                    id={cfg.maintenance_costPerHour.id}
                    label={cfg.maintenance_costPerHour.label}
                    tooltip={cfg.maintenance_costPerHour.tooltip}
                    placeholder={cfg.maintenance_costPerHour.placeholder}
                    type={cfg.maintenance_costPerHour.type}
                    value={values.costPerDowntimeHour}
                    onChange={(v) => update('costPerDowntimeHour', v)}
                />
            </div>

            <h4 style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                Optional: Emergency Visits
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.maintenance_visitsPerYear.id}
                    label={cfg.maintenance_visitsPerYear.label}
                    tooltip={cfg.maintenance_visitsPerYear.tooltip}
                    placeholder={cfg.maintenance_visitsPerYear.placeholder}
                    type={cfg.maintenance_visitsPerYear.type}
                    value={values.emergencyVisitsPerYear ?? 0}
                    onChange={(v) => update('emergencyVisitsPerYear', v || undefined)}
                />

                <SimpleInputField
                    id={cfg.maintenance_costPerVisit.id}
                    label={cfg.maintenance_costPerVisit.label}
                    tooltip={cfg.maintenance_costPerVisit.tooltip}
                    placeholder={cfg.maintenance_costPerVisit.placeholder}
                    type={cfg.maintenance_costPerVisit.type}
                    value={values.costPerVisit ?? 0}
                    onChange={(v) => update('costPerVisit', v || undefined)}
                />

                <SimpleInputField
                    id={cfg.maintenance_visitReductionPct.id}
                    label={cfg.maintenance_visitReductionPct.label}
                    tooltip={cfg.maintenance_visitReductionPct.tooltip}
                    placeholder={cfg.maintenance_visitReductionPct.placeholder}
                    type={cfg.maintenance_visitReductionPct.type}
                    value={values.visitReductionPct ?? 0}
                    onChange={(v) => update('visitReductionPct', v || undefined)}
                />
            </div>
        </section>
    );
}

export const DEFAULT_MAINTENANCE_INPUTS: MaintenanceInputs = {
    downtimeHoursBasePerYear: 80,
    downtimeReductionPct: 0.35,
    costPerDowntimeHour: 2000,
};
