'use client';

import { UseCaseId, UseCaseOption } from '@/lib/roi/types';
import { USE_CASE_OPTIONS } from '@/lib/roi/useCases';

interface UseCaseSelectorProps {
    selectedUseCases: UseCaseId[];
    onChange: (selected: UseCaseId[]) => void;
}

export function UseCaseSelector({ selectedUseCases, onChange }: UseCaseSelectorProps) {
    const toggleUseCase = (id: UseCaseId) => {
        if (selectedUseCases.includes(id)) {
            onChange(selectedUseCases.filter((uc) => uc !== id));
        } else {
            onChange([...selectedUseCases, id]);
        }
    };

    const selectAll = () => {
        onChange(USE_CASE_OPTIONS.map((uc) => uc.id));
    };

    const clearAll = () => {
        onChange([]);
    };

    return (
        <div className="usecase-selector">
            <div className="usecase-selector__header">
                <h3 className="form-section__title">Which AR use cases do you want to calculate?</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
                    Select one or more use cases to see combined ROI.
                </p>
                <div className="usecase-selector__actions">
                    <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={selectAll}
                        style={{ marginRight: 'var(--space-sm)', padding: 'var(--space-sm) var(--space-md)', fontSize: '0.875rem' }}
                    >
                        Select All
                    </button>
                    <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={clearAll}
                        style={{ padding: 'var(--space-sm) var(--space-md)', fontSize: '0.875rem' }}
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="usecase-selector__grid">
                {USE_CASE_OPTIONS.map((option) => (
                    <UseCaseCard
                        key={option.id}
                        option={option}
                        selected={selectedUseCases.includes(option.id)}
                        onToggle={() => toggleUseCase(option.id)}
                    />
                ))}
            </div>

            {selectedUseCases.length === 0 && (
                <p style={{ marginTop: 'var(--space-lg)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Please select at least one use case to continue.
                </p>
            )}
        </div>
    );
}

interface UseCaseCardProps {
    option: UseCaseOption;
    selected: boolean;
    onToggle: () => void;
}

function UseCaseCard({ option, selected, onToggle }: UseCaseCardProps) {
    return (
        <label className={`usecase-card ${selected ? 'usecase-card--selected' : ''}`}>
            <input
                type="checkbox"
                checked={selected}
                onChange={onToggle}
                className="usecase-card__checkbox"
            />
            <div className="usecase-card__content">
                <span className="usecase-card__icon">{option.icon}</span>
                <div className="usecase-card__text">
                    <strong className="usecase-card__label">{option.label}</strong>
                    <span className="usecase-card__description">{option.description}</span>
                </div>
            </div>
            <div className="usecase-card__drivers">
                {option.primaryDrivers.map((driver) => (
                    <span key={driver} className="usecase-card__driver-tag">
                        {driver}
                    </span>
                ))}
            </div>
        </label>
    );
}
