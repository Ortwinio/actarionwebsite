'use client';

import { ChangeoverInputs } from '@/lib/roi/types';
import { roiFieldConfig } from '@/lib/roi/fieldConfig';
import { SimpleInputField } from '@/components/roi/InputField';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface ChangeoverInputFormProps {
    values: ChangeoverInputs;
    onChange: (values: ChangeoverInputs) => void;
}

export function ChangeoverInputForm({ values, onChange }: ChangeoverInputFormProps) {
    const update = <K extends keyof ChangeoverInputs>(key: K, value: ChangeoverInputs[K]) => {
        onChange({ ...values, [key]: value });
    };

    const cfg = roiFieldConfig;
    const useCaseInfo = USE_CASE_OPTIONS.find((uc) => uc.id === 'changeover');

    return (
        <section className="form-section">
            <h3 className="form-section__title">⚙️ AR-Guided Changeovers (SMED)</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {useCaseInfo?.description}
            </p>

            <SimpleInputField
                id={cfg.changeover_changeoversPerYear.id}
                label={cfg.changeover_changeoversPerYear.label}
                tooltip={cfg.changeover_changeoversPerYear.tooltip}
                placeholder={cfg.changeover_changeoversPerYear.placeholder}
                type={cfg.changeover_changeoversPerYear.type}
                value={values.changeoversPerYear}
                onChange={(v) => update('changeoversPerYear', v)}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.changeover_timeBase.id}
                    label={cfg.changeover_timeBase.label}
                    tooltip={cfg.changeover_timeBase.tooltip}
                    placeholder={cfg.changeover_timeBase.placeholder}
                    type={cfg.changeover_timeBase.type}
                    value={values.changeoverTimeBase}
                    onChange={(v) => update('changeoverTimeBase', v)}
                />

                <SimpleInputField
                    id={cfg.changeover_timeAr.id}
                    label={cfg.changeover_timeAr.label}
                    tooltip={cfg.changeover_timeAr.tooltip}
                    placeholder={cfg.changeover_timeAr.placeholder}
                    type={cfg.changeover_timeAr.type}
                    value={values.changeoverTimeAr}
                    onChange={(v) => update('changeoverTimeAr', v)}
                />
            </div>

            <SimpleInputField
                id={cfg.changeover_costPerMinute.id}
                label={cfg.changeover_costPerMinute.label}
                tooltip={cfg.changeover_costPerMinute.tooltip}
                placeholder={cfg.changeover_costPerMinute.placeholder}
                type={cfg.changeover_costPerMinute.type}
                value={values.costPerChangeoverMinute}
                onChange={(v) => update('costPerChangeoverMinute', v)}
                help="Based on OEE loss / throughput value per minute."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <SimpleInputField
                    id={cfg.changeover_scrapCostBase.id}
                    label={cfg.changeover_scrapCostBase.label}
                    tooltip={cfg.changeover_scrapCostBase.tooltip}
                    placeholder={cfg.changeover_scrapCostBase.placeholder}
                    type={cfg.changeover_scrapCostBase.type}
                    value={values.scrapCostBasePerChangeover ?? 0}
                    onChange={(v) => update('scrapCostBasePerChangeover', v || undefined)}
                />

                <SimpleInputField
                    id={cfg.changeover_scrapCostAr.id}
                    label={cfg.changeover_scrapCostAr.label}
                    tooltip={cfg.changeover_scrapCostAr.tooltip}
                    placeholder={cfg.changeover_scrapCostAr.placeholder}
                    type={cfg.changeover_scrapCostAr.type}
                    value={values.scrapCostArPerChangeover ?? 0}
                    onChange={(v) => update('scrapCostArPerChangeover', v || undefined)}
                />
            </div>
        </section>
    );
}

export const DEFAULT_CHANGEOVER_INPUTS: ChangeoverInputs = {
    changeoversPerYear: 200,
    changeoverTimeBase: 45,
    changeoverTimeAr: 30,
    costPerChangeoverMinute: 50,
};
