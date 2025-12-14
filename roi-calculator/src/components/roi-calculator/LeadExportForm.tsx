'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RoiInputs, RoiResults, LeadInfo } from '@/types/roi';
import { FullRoiWizard } from './FullRoiWizard';
import { countries } from '@/lib/industryPresets';

const leadSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    company: z.string().min(2, 'Company is required'),
    email: z.string().email('Valid work email required'),
    country: z.string().min(2, 'Country is required'),
    timeline: z.enum(['exploring', '6_12_months', '3_6_months']).optional(),
    process_description: z.string().optional(),
});

type LeadForm = z.infer<typeof leadSchema>;

interface LeadExportFormProps {
    onSubmit?: (data: { lead: LeadInfo; inputs: RoiInputs; results: RoiResults }) => void;
}

export function LeadExportForm({ onSubmit }: LeadExportFormProps) {
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [calculatorData, setCalculatorData] = useState<{ inputs: RoiInputs; results: RoiResults } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LeadForm>({
        resolver: zodResolver(leadSchema),
    });

    const handleCalculatorComplete = (inputs: RoiInputs, results: RoiResults) => {
        setCalculatorData({ inputs, results });
        setShowLeadForm(true);
    };

    const handleLeadSubmit = async (data: LeadForm) => {
        if (!calculatorData) return;

        setIsSubmitting(true);

        try {
            // Submit to API
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead: data,
                    inputs: calculatorData.inputs,
                    results: calculatorData.results,
                }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                onSubmit?.({ lead: data, ...calculatorData });
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadPdf = async () => {
        if (!calculatorData) return;

        try {
            const response = await fetch('/api/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inputs: calculatorData.inputs,
                    results: calculatorData.results,
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'actarion-roi-report.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    if (submitSuccess) {
        return (
            <div className="container">
                <div className="form-section" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>✅</div>
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>Thank you!</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
                        We&apos;ll review your numbers and propose 1–2 concrete pilot scenarios
                        (e.g. one line, one site), including a detailed ROI with DeepSight AR workflows.
                    </p>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        You&apos;ll hear from us within 1-2 business days.
                    </p>
                </div>
            </div>
        );
    }

    if (showLeadForm && calculatorData) {
        return (
            <div className="container">
                <div className="form-section" style={{ maxWidth: 600, margin: '0 auto' }}>
                    <h3 className="form-section__title">Get your personalized ROI report</h3>

                    <form onSubmit={handleSubmit(handleLeadSubmit)}>
                        <div className="form-field">
                            <label className="form-field__label">Your name</label>
                            <input
                                type="text"
                                {...register('name')}
                                className="form-field__input"
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="form-field__error">{errors.name.message}</span>}
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Company</label>
                            <input
                                type="text"
                                {...register('company')}
                                className="form-field__input"
                                placeholder="Your Company"
                            />
                            {errors.company && <span className="form-field__error">{errors.company.message}</span>}
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Work email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="form-field__input"
                                placeholder="john@company.com"
                            />
                            {errors.email && <span className="form-field__error">{errors.email.message}</span>}
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Country</label>
                            <select {...register('country')} className="form-field__select">
                                <option value="">Select country...</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            {errors.country && <span className="form-field__error">{errors.country.message}</span>}
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">Preferred timeline for a pilot (optional)</label>
                            <select {...register('timeline')} className="form-field__select">
                                <option value="">Select timeline...</option>
                                <option value="exploring">Just exploring</option>
                                <option value="6_12_months">Planning for 6–12 months</option>
                                <option value="3_6_months">Actively looking within 3–6 months</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label className="form-field__label">What process do you have in mind? (optional)</label>
                            <input
                                type="text"
                                {...register('process_description')}
                                className="form-field__input"
                                placeholder="e.g. changeovers, maintenance, assembly"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={handleDownloadPdf}
                            >
                                Download ROI Report (PDF)
                            </button>
                            <button
                                type="submit"
                                className="btn btn--primary"
                                disabled={isSubmitting}
                                style={{ flex: 1 }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Share with ActARion & Request Follow-up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return <FullRoiWizard onComplete={handleCalculatorComplete} />;
}
