// Scenario Aggregation
// Combines multiple use cases into unified ROI metrics

import {
    BenefitDriver,
    BenefitBreakdown,
    UseCaseInputs,
    UseCaseResult,
    ScenarioInputs,
    ScenarioResult,
} from './types';

import {
    USE_CASE_OPTIONS,
    calcAssemblyBenefits,
    calcChangeoverBenefits,
    calcMaintenanceBenefits,
    calcFaultRecoveryBenefits,
    calcTrainingBenefits,
} from './useCases';

// ============ CALCULATE SCENARIO ============

export function calculateScenario(input: ScenarioInputs): ScenarioResult {
    // Calculate benefits for each selected use case
    const useCaseResults: UseCaseResult[] = input.useCases.map((uc) => {
        const option = USE_CASE_OPTIONS.find((o) => o.id === uc.id);
        const label = option?.label || uc.id;

        let benefits: BenefitBreakdown;
        switch (uc.id) {
            case 'assembly':
                benefits = calcAssemblyBenefits(uc.payload);
                break;
            case 'changeover':
                benefits = calcChangeoverBenefits(uc.payload);
                break;
            case 'maintenance':
                benefits = calcMaintenanceBenefits(uc.payload);
                break;
            case 'fault_recovery':
                benefits = calcFaultRecoveryBenefits(uc.payload);
                break;
            case 'training':
                benefits = calcTrainingBenefits(uc.payload);
                break;
            default:
                throw new Error(`Unsupported use case: ${(uc as UseCaseInputs).id}`);
        }

        return { id: uc.id, label, benefits };
    });

    // Aggregate annual benefits across all use cases
    const emptyAnnual: Record<BenefitDriver, number> = {
        training: 0,
        quality: 0,
        downtime: 0,
        travel: 0,
        throughput: 0,
    };

    const aggregatedAnnual = useCaseResults.reduce((acc, uc) => {
        (Object.keys(acc) as BenefitDriver[]).forEach((driver) => {
            acc[driver] += uc.benefits.annual[driver] || 0;
        });
        return acc;
    }, { ...emptyAnnual });

    const totalAnnualBenefits = Object.values(aggregatedAnnual).reduce((a, b) => a + b, 0);

    // Calculate costs
    const annualCosts =
        input.costs.annualSoftwareCost +
        input.costs.annualHardwareCost +
        input.costs.annualOpexCost;

    const oneTimeCosts = input.costs.oneTimeCost;

    // Build cashflows over horizon
    const { horizonYears, adoptionByYear, discountRate } = input.global;
    const cashflows: number[] = [];
    const cumulativeCashflows: number[] = [];

    // Year 0: Initial investment only
    cashflows[0] = -oneTimeCosts;
    cumulativeCashflows[0] = cashflows[0];

    // Years 1 to horizon
    for (let year = 1; year <= horizonYears; year++) {
        const adoptionFactor = adoptionByYear[year - 1] ?? 1;
        const benefitsY = totalAnnualBenefits * adoptionFactor;
        const costsY = annualCosts; // Costs don't scale with adoption in this model
        const net = benefitsY - costsY;
        cashflows[year] = net;
        cumulativeCashflows[year] = cumulativeCashflows[year - 1] + net;
    }

    // Calculate payback
    const paybackIndex = cumulativeCashflows.findIndex((v) => v >= 0);
    const paybackYears = paybackIndex === -1 ? null : paybackIndex;
    const paybackMonths = paybackYears !== null ? Math.round(paybackYears * 12) : null;

    // Calculate simple ROI over horizon
    const totalBenefitsHorizon = cashflows
        .slice(1) // Exclude year 0
        .reduce((sum, cf) => sum + Math.max(cf + annualCosts, 0), 0); // Add back costs to get gross benefits

    const totalCostsHorizon = oneTimeCosts + annualCosts * horizonYears;

    const roiHorizon =
        totalCostsHorizon === 0
            ? 0
            : ((totalBenefitsHorizon - totalCostsHorizon) / totalCostsHorizon) * 100;

    // Calculate NPV
    let npv = cashflows[0]; // Year 0 not discounted
    for (let year = 1; year <= horizonYears; year++) {
        npv += cashflows[year] / Math.pow(1 + discountRate, year);
    }

    return {
        useCases: useCaseResults,
        aggregated: {
            annual: aggregatedAnnual,
            totalAnnual: totalAnnualBenefits,
        },
        annualCosts,
        oneTimeCosts,
        cashflows,
        cumulativeCashflows,
        paybackYears,
        paybackMonths,
        roiHorizon,
        npv,
    };
}

// ============ DEFAULT VALUES ============

export const DEFAULT_GLOBAL_INPUTS = {
    discountRate: 0.08,
    horizonYears: 3,
    adoptionByYear: [0.6, 0.8, 1.0],
};

export const DEFAULT_COST_INPUTS = {
    annualSoftwareCost: 17000,    // €12k licenses + €5k site
    annualHardwareCost: 1333,     // €4k devices / 3 years
    annualOpexCost: 11000,        // €3k content + €8k internal PM
    oneTimeCost: 25000,           // €15k implementation + €10k initial content
};
