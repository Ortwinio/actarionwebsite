'use client';

import { RoiResults } from '@/types/roi';
import { ScenarioResult, BenefitDriver } from '@/lib/roi/types';
import { formatCurrency, formatPercent } from '@/lib/roiCalculator';

// Union type for either old or new results
type Results = RoiResults | ScenarioResult | null;

interface ResultsPanelProps {
    results: Results;
    isCalculating?: boolean;
    variant?: 'compact' | 'full';
}

// Type guard to check if result is ScenarioResult
function isScenarioResult(result: Results): result is ScenarioResult {
    return result !== null && 'aggregated' in result;
}

// Driver labels mapping
const driverLabels: Record<BenefitDriver, string> = {
    training: 'Training & Onboarding',
    quality: 'Fewer Errors & Scrap',
    downtime: 'Less Downtime',
    travel: 'Fewer Site Visits',
    throughput: 'Increased Throughput',
};

const driverColors: Record<BenefitDriver, string> = {
    training: '#6366f1',
    quality: '#22c55e',
    downtime: '#f59e0b',
    travel: '#ec4899',
    throughput: '#14b8a6',
};

export function ResultsPanel({ results, isCalculating = false, variant = 'compact' }: ResultsPanelProps) {
    if (!results && !isCalculating) {
        return (
            <div className="results-panel results-panel--empty">
                <div className="results-panel__placeholder">
                    <div className="results-panel__icon">📊</div>
                    <p>Fill in the form to see your estimated ROI</p>
                </div>
            </div>
        );
    }

    if (isCalculating) {
        return (
            <div className="results-panel results-panel--loading">
                <div className="results-panel__spinner"></div>
                <p>Calculating...</p>
            </div>
        );
    }

    if (!results) return null;

    // Extract values based on result type
    let totalBenefits: number;
    let paybackMonths: number | null;
    let roiPercent: number;
    let npv: number;
    let netAnnual: number;
    let oneTimeCosts: number;
    let annualCosts: number;
    let benefitDistribution: Array<{ label: string; value: number; color: string }>;

    if (isScenarioResult(results)) {
        // New ScenarioResult format
        totalBenefits = results.aggregated.totalAnnual;
        paybackMonths = results.paybackMonths;
        roiPercent = results.roiHorizon;
        npv = results.npv;
        netAnnual = results.aggregated.totalAnnual - results.annualCosts;
        oneTimeCosts = results.oneTimeCosts;
        annualCosts = results.annualCosts;

        benefitDistribution = (Object.keys(results.aggregated.annual) as BenefitDriver[])
            .filter((driver) => results.aggregated.annual[driver] > 0)
            .map((driver) => ({
                label: driverLabels[driver],
                value: results.aggregated.annual[driver],
                color: driverColors[driver],
            }));
    } else {
        // Old RoiResults format
        const { benefits, costs, payback_months, roi_3y_percent, npv: oldNpv, net_annual_steady } = results;
        totalBenefits = benefits.total_annual_benefits;
        paybackMonths = payback_months === Infinity ? null : payback_months;
        roiPercent = roi_3y_percent;
        npv = oldNpv;
        netAnnual = net_annual_steady;
        oneTimeCosts = costs.one_time_costs;
        annualCosts = costs.total_annual_costs;

        benefitDistribution = [
            { label: 'Training & Onboarding', value: benefits.training_savings, color: '#6366f1' },
            { label: 'Fewer Errors & Scrap', value: benefits.quality_savings, color: '#22c55e' },
            { label: 'Less Downtime', value: benefits.downtime_savings, color: '#f59e0b' },
            { label: 'Fewer Site Visits', value: benefits.remote_savings, color: '#ec4899' },
        ].filter((b) => b.value > 0);
    }

    // Find the main driver
    const mainDriver = benefitDistribution.reduce(
        (max, item) => (item.value > max.value ? item : max),
        benefitDistribution[0]
    );

    const mainDriverPercent =
        totalBenefits > 0 ? Math.round((mainDriver?.value || 0) / totalBenefits * 100) : 0;

    return (
        <div className={`results-panel results-panel--${variant}`}>
            {/* Main headline */}
            <div className="results-panel__headline">
                <span className="results-panel__label">Estimated Annual Savings</span>
                <span className="results-panel__value results-panel__value--large">
                    {formatCurrency(totalBenefits)}
                </span>
            </div>

            {/* Key metrics row */}
            <div className="results-panel__metrics">
                <div className="results-panel__metric">
                    <span className="results-panel__metric-label">Payback</span>
                    <span className="results-panel__metric-value">
                        {paybackMonths === null ? '—' : `~${paybackMonths} months`}
                    </span>
                </div>
                <div className="results-panel__metric">
                    <span className="results-panel__metric-label">3-Year ROI</span>
                    <span className="results-panel__metric-value results-panel__metric-value--highlight">
                        {formatPercent(roiPercent)}
                    </span>
                </div>
                {variant === 'full' && (
                    <div className="results-panel__metric">
                        <span className="results-panel__metric-label">NPV</span>
                        <span className="results-panel__metric-value">{formatCurrency(npv)}</span>
                    </div>
                )}
            </div>

            {/* Benefit breakdown */}
            <div className="results-panel__breakdown">
                <h4 className="results-panel__breakdown-title">Savings Breakdown</h4>
                {benefitDistribution.map((item) => (
                    <div key={item.label} className="results-panel__breakdown-item">
                        <div className="results-panel__breakdown-header">
                            <span
                                className="results-panel__breakdown-dot"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="results-panel__breakdown-label">{item.label}</span>
                            <span className="results-panel__breakdown-value">
                                {formatCurrency(item.value)}/year
                            </span>
                        </div>
                        <div className="results-panel__breakdown-bar">
                            <div
                                className="results-panel__breakdown-fill"
                                style={{
                                    width: `${totalBenefits > 0 ? (item.value / totalBenefits) * 100 : 0}%`,
                                    backgroundColor: item.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Insight */}
            {mainDriver && (
                <div className="results-panel__insight">
                    <p>
                        💡 Most of your gains come from <strong>{mainDriver.label.toLowerCase()}</strong> ({mainDriverPercent}%).
                    </p>
                </div>
            )}

            {/* Full variant: additional details */}
            {variant === 'full' && (
                <>
                    <div className="results-panel__costs">
                        <h4>Investment Summary</h4>
                        <div className="results-panel__costs-grid">
                            <div className="results-panel__cost-item">
                                <span>One-time costs</span>
                                <span>{formatCurrency(oneTimeCosts)}</span>
                            </div>
                            <div className="results-panel__cost-item">
                                <span>Annual costs</span>
                                <span>{formatCurrency(annualCosts)}</span>
                            </div>
                            <div className="results-panel__cost-item results-panel__cost-item--highlight">
                                <span>Net annual benefit</span>
                                <span>{formatCurrency(netAnnual)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="results-panel__disclaimer">
                        <p>
                            This calculator is for orientation only. In actual projects we refine
                            these numbers using your real SOP data, OEE data, and scrap reports.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
