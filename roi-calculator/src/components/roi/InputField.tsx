'use client';

import { useState } from 'react';
import { RoiFieldConfigItem, RoiFieldType, getTypeSuffix } from '@/lib/roi/fieldConfig';

interface InputFieldProps {
    fieldConfig: RoiFieldConfigItem;
    value: number | string;
    onChange: (value: number) => void;
    disabled?: boolean;
    className?: string;
}

export function InputField({
    fieldConfig,
    value,
    onChange,
    disabled = false,
    className = '',
}: InputFieldProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const { id, label, tooltip, placeholder, type } = fieldConfig;
    const suffix = getTypeSuffix(type);

    // Handle value display for percent fields (stored as 0-1, displayed as 0-100)
    const displayValue = type === 'percent' && typeof value === 'number'
        ? value * 100
        : value;

    // Handle value change for percent fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value === '' ? 0 : Number(e.target.value);
        const finalValue = type === 'percent' ? rawValue / 100 : rawValue;
        onChange(finalValue);
    };

    // Determine input step based on type
    const step = type === 'percent' ? '0.1' : type === 'currency' ? '1' : '1';

    return (
        <div className={`form-field ${className}`}>
            <label className="form-field__label" htmlFor={id}>
                {label}
                {tooltip && (
                    <span
                        className="form-field__tooltip-trigger"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        aria-label="More information"
                    >
                        ⓘ
                        {showTooltip && (
                            <span className="form-field__tooltip">
                                {tooltip}
                            </span>
                        )}
                    </span>
                )}
                {suffix && type !== 'currency' && (
                    <span className="form-field__suffix-indicator">({suffix})</span>
                )}
            </label>
            <div className="form-field__input-wrapper">
                {type === 'currency' && (
                    <span className="form-field__prefix">€</span>
                )}
                <input
                    id={id}
                    type="number"
                    step={step}
                    value={displayValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`form-field__input ${type === 'currency' ? 'form-field__input--with-prefix' : ''}`}
                />
            </div>
        </div>
    );
}

// Simplified version for inline use
interface SimpleInputFieldProps {
    id: string;
    label: string;
    value: number | string;
    onChange: (value: number) => void;
    tooltip?: string;
    placeholder?: string;
    type?: RoiFieldType;
    help?: string;
}

export function SimpleInputField({
    id,
    label,
    value,
    onChange,
    tooltip,
    placeholder,
    type,
    help,
}: SimpleInputFieldProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const suffix = getTypeSuffix(type);

    const displayValue = type === 'percent' && typeof value === 'number'
        ? value * 100
        : value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value === '' ? 0 : Number(e.target.value);
        const finalValue = type === 'percent' ? rawValue / 100 : rawValue;
        onChange(finalValue);
    };

    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={id}>
                {label}
                {tooltip && (
                    <span
                        className="form-field__tooltip-trigger"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        ⓘ
                        {showTooltip && (
                            <span className="form-field__tooltip">{tooltip}</span>
                        )}
                    </span>
                )}
                {suffix && type !== 'currency' && (
                    <span className="form-field__suffix-indicator">({suffix})</span>
                )}
            </label>
            <div className="form-field__input-wrapper">
                {type === 'currency' && (
                    <span className="form-field__prefix">€</span>
                )}
                <input
                    id={id}
                    type="number"
                    value={displayValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`form-field__input ${type === 'currency' ? 'form-field__input--with-prefix' : ''}`}
                />
            </div>
            {help && <span className="form-field__help">{help}</span>}
        </div>
    );
}
