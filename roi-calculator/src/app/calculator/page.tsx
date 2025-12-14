import { UseCaseWizard } from '@/components/roi-calculator';

export const metadata = {
    title: 'Use Case ROI Calculator | ActARion',
    description: 'Calculate ROI for specific AR use cases: assembly, changeovers, maintenance, fault recovery, and training.',
};

export default function CalculatorPage() {
    return (
        <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    AR SOP ROI Calculator
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
                    Select your AR use cases and build a detailed business case
                </p>
            </div>

            <UseCaseWizard />
        </div>
    );
}
