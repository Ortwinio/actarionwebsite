// ROI Calculator - Core Calculation Engine
// Implements all formulas from roi-calculator-concept.txt

import {
    RoiInputs,
    BenefitBreakdown,
    CostBreakdown,
    YearlyCashflow,
    RoiResults,
} from '@/types/roi';

// ============ BENEFIT CALCULATIONS ============

/**
 * 3.1 Training time and cost savings
 * Training_hours_saved = N_new * (H_train_base - H_train_AR)
 * Training_savings = Training_hours_saved * (C_hour_op + C_hour_trainer)
 */
export function calculateTrainingSavings(inputs: RoiInputs): number {
    const { workforce, training } = inputs;
    const trainingHoursSaved = workforce.N_new * (training.H_train_base - training.H_train_AR);
    return trainingHoursSaved * (training.C_hour_op + training.C_hour_trainer);
}

/**
 * 3.2 Fewer errors / scrap / rework
 * Total_executions = N_op * Exec_per_op_per_year
 * Errors_avoided = Total_executions * (Error_rate_base - Error_rate_AR)
 * Quality_savings = Errors_avoided * Cost_per_error
 */
export function calculateQualitySavings(inputs: RoiInputs): number {
    const { workforce, quality } = inputs;
    const totalExecutions = workforce.N_op * quality.Exec_per_op_per_year;
    const errorsBase = totalExecutions * (quality.Error_rate_base / 100);
    const errorsAR = totalExecutions * (quality.Error_rate_AR / 100);
    const errorsAvoided = errorsBase - errorsAR;
    return errorsAvoided * quality.Cost_per_error;
}

/**
 * 3.3 Less SOP-related downtime
 * Downtime_hours_saved = H_downtime_base_per_year * Downtime_reduction_pct
 * Downtime_savings = Downtime_hours_saved * Cost_per_downtime_hour
 */
export function calculateDowntimeSavings(inputs: RoiInputs): number {
    const { downtime } = inputs;
    const downtimeHoursSaved = downtime.H_downtime_base_per_year * (downtime.Downtime_reduction_pct / 100);
    return downtimeHoursSaved * downtime.Cost_per_downtime_hour;
}

/**
 * 3.4 Fewer on-site visits (remote expert)
 * Visits_avoided = Visits_per_year * Visit_reduction_pct
 * Remote_savings = Visits_avoided * Cost_per_visit
 */
export function calculateRemoteSavings(inputs: RoiInputs): number {
    const { remoteSupport } = inputs;
    const visitsAvoided = remoteSupport.Visits_per_year * (remoteSupport.Visit_reduction_pct / 100);
    return visitsAvoided * remoteSupport.Cost_per_visit;
}

/**
 * 3.5 Total annual benefits (steady state)
 */
export function calculateTotalBenefits(inputs: RoiInputs): BenefitBreakdown {
    const training_savings = calculateTrainingSavings(inputs);
    const quality_savings = calculateQualitySavings(inputs);
    const downtime_savings = calculateDowntimeSavings(inputs);
    const remote_savings = calculateRemoteSavings(inputs);

    return {
        training_savings,
        quality_savings,
        downtime_savings,
        remote_savings,
        total_annual_benefits: training_savings + quality_savings + downtime_savings + remote_savings,
    };
}

// ============ COST CALCULATIONS ============

/**
 * 4.1 Software costs
 * Software_annual = (C_license_user_year * N_users) + (C_license_site_year * N_sites)
 */
export function calculateSoftwareCosts(inputs: RoiInputs): number {
    const { costs } = inputs;
    return (costs.C_license_user_year * costs.N_users) + (costs.C_license_site_year * costs.N_sites);
}

/**
 * 4.2 Hardware costs (depreciation)
 * Hardware_annual = (C_device_per_user * N_devices) / Device_lifetime_years
 */
export function calculateHardwareCosts(inputs: RoiInputs): number {
    const { costs } = inputs;
    if (costs.Device_lifetime_years === 0) return 0;
    return (costs.C_device_per_user * costs.N_devices) / costs.Device_lifetime_years;
}

/**
 * 4.3 Opex costs
 * Internal_PM_annual = Internal_PM_hours * Internal_PM_rate
 * Opex_annual = Content_annual + Internal_PM_annual
 */
export function calculateOpexCosts(inputs: RoiInputs): number {
    const { costs } = inputs;
    const internalPMCost = costs.Internal_PM_hours * costs.Internal_PM_rate;
    return costs.Content_annual + internalPMCost;
}

/**
 * 4.4 Total costs breakdown
 */
export function calculateTotalCosts(inputs: RoiInputs): CostBreakdown {
    const { costs } = inputs;
    const software_annual = calculateSoftwareCosts(inputs);
    const hardware_annual = calculateHardwareCosts(inputs);
    const opex_annual = calculateOpexCosts(inputs);
    const one_time_costs = costs.Implementation_one_time + costs.Content_initial;

    return {
        software_annual,
        hardware_annual,
        opex_annual,
        total_annual_costs: software_annual + hardware_annual + opex_annual,
        one_time_costs,
    };
}

// ============ CASHFLOW & ROI METRICS ============

/**
 * Calculate yearly cashflow with adoption rates
 */
export function calculateCashflow(inputs: RoiInputs): YearlyCashflow[] {
    const { financial } = inputs;
    const benefits = calculateTotalBenefits(inputs);
    const costs = calculateTotalCosts(inputs);

    const adoptionRates = [
        financial.Adoption_year1,
        financial.Adoption_year2,
        financial.Adoption_year3,
    ];

    const cashflow: YearlyCashflow[] = [];
    let cumulative = 0;

    // Year 0: Initial investment
    const year0Costs = costs.one_time_costs + (costs.total_annual_costs * adoptionRates[0]);
    cumulative = -year0Costs;
    cashflow.push({
        year: 0,
        benefits: 0,
        costs: year0Costs,
        net: -year0Costs,
        cumulative,
        discounted: -year0Costs,
    });

    // Years 1-3 (or horizon)
    for (let i = 0; i < Math.min(financial.Horizon_years, 3); i++) {
        const yearBenefits = benefits.total_annual_benefits * adoptionRates[Math.min(i, 2)];
        const yearCosts = costs.total_annual_costs;
        const net = yearBenefits - yearCosts;
        cumulative += net;
        const discounted = net / Math.pow(1 + financial.Discount_rate, i + 1);

        cashflow.push({
            year: i + 1,
            benefits: yearBenefits,
            costs: yearCosts,
            net,
            cumulative,
            discounted,
        });
    }

    return cashflow;
}

/**
 * 5.2 Payback period (simple approximation)
 * Returns payback in months
 */
export function calculatePayback(inputs: RoiInputs): number {
    const benefits = calculateTotalBenefits(inputs);
    const costs = calculateTotalCosts(inputs);

    const netAnnualSteady = benefits.total_annual_benefits - costs.total_annual_costs;

    if (netAnnualSteady <= 0) return Infinity;

    const paybackYears = costs.one_time_costs / netAnnualSteady;
    return Math.round(paybackYears * 12);
}

/**
 * 5.3 Simple ROI over 3 years
 * ROI_3Y = (Total_benefits_3Y - Total_costs_3Y) / Total_costs_3Y
 */
export function calculateROI(inputs: RoiInputs): number {
    const cashflow = calculateCashflow(inputs);

    let totalBenefits = 0;
    let totalCosts = 0;

    for (const year of cashflow) {
        totalBenefits += year.benefits;
        totalCosts += year.costs;
    }

    if (totalCosts === 0) return 0;
    return ((totalBenefits - totalCosts) / totalCosts) * 100;
}

/**
 * 5.4 NPV calculation
 * NPV = sum of discounted cashflows
 */
export function calculateNPV(inputs: RoiInputs): number {
    const cashflow = calculateCashflow(inputs);
    const { financial } = inputs;

    let npv = 0;
    for (const year of cashflow) {
        npv += year.net / Math.pow(1 + financial.Discount_rate, year.year);
    }

    return npv;
}

/**
 * Complete ROI calculation returning all results
 */
export function calculateRoi(inputs: RoiInputs): RoiResults {
    const benefits = calculateTotalBenefits(inputs);
    const costs = calculateTotalCosts(inputs);
    const cashflow = calculateCashflow(inputs);
    const payback_months = calculatePayback(inputs);
    const roi_3y_percent = calculateROI(inputs);
    const npv = calculateNPV(inputs);
    const net_annual_steady = benefits.total_annual_benefits - costs.total_annual_costs;

    return {
        benefits,
        costs,
        cashflow,
        payback_months,
        roi_3y_percent,
        npv,
        net_annual_steady,
    };
}

// ============ FORMATTING UTILITIES ============

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatPercent(value: number): string {
    return `${Math.round(value)}%`;
}
