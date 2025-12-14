// Industry Presets and Default Values
// Based on roi-calculator-best-practise.txt and roi-calculator-webformconcept.txt

import { RoiInputs, Industry, ImpactPreset } from '@/types/roi';

// Industry-specific defaults
export const industryDefaults: Record<Industry, Partial<RoiInputs>> = {
    food_beverage: {
        workforce: { N_op: 25, N_new: 6, SOP_count: 15 },
        training: { H_train_base: 24, H_train_AR: 14, C_hour_op: 40, C_hour_trainer: 60 },
        quality: { Exec_per_op_per_year: 400, Error_rate_base: 3, Error_rate_AR: 1.5, Cost_per_error: 250 },
        downtime: { H_downtime_base_per_year: 40, Downtime_reduction_pct: 40, Cost_per_downtime_hour: 2000 },
        remoteSupport: { Visits_per_year: 12, Cost_per_visit: 1500, Visit_reduction_pct: 50 },
    },
    pharma: {
        workforce: { N_op: 30, N_new: 8, SOP_count: 25 },
        training: { H_train_base: 40, H_train_AR: 20, C_hour_op: 50, C_hour_trainer: 80 },
        quality: { Exec_per_op_per_year: 300, Error_rate_base: 2, Error_rate_AR: 0.8, Cost_per_error: 500 },
        downtime: { H_downtime_base_per_year: 30, Downtime_reduction_pct: 40, Cost_per_downtime_hour: 5000 },
        remoteSupport: { Visits_per_year: 8, Cost_per_visit: 2500, Visit_reduction_pct: 60 },
    },
    packaging: {
        workforce: { N_op: 20, N_new: 5, SOP_count: 12 },
        training: { H_train_base: 20, H_train_AR: 12, C_hour_op: 35, C_hour_trainer: 55 },
        quality: { Exec_per_op_per_year: 500, Error_rate_base: 4, Error_rate_AR: 2, Cost_per_error: 200 },
        downtime: { H_downtime_base_per_year: 50, Downtime_reduction_pct: 35, Cost_per_downtime_hour: 1500 },
        remoteSupport: { Visits_per_year: 10, Cost_per_visit: 1200, Visit_reduction_pct: 45 },
    },
    logistics: {
        workforce: { N_op: 35, N_new: 10, SOP_count: 10 },
        training: { H_train_base: 16, H_train_AR: 10, C_hour_op: 30, C_hour_trainer: 50 },
        quality: { Exec_per_op_per_year: 600, Error_rate_base: 5, Error_rate_AR: 2.5, Cost_per_error: 150 },
        downtime: { H_downtime_base_per_year: 60, Downtime_reduction_pct: 30, Cost_per_downtime_hour: 1000 },
        remoteSupport: { Visits_per_year: 6, Cost_per_visit: 1000, Visit_reduction_pct: 40 },
    },
    other: {
        workforce: { N_op: 25, N_new: 6, SOP_count: 15 },
        training: { H_train_base: 24, H_train_AR: 14, C_hour_op: 40, C_hour_trainer: 60 },
        quality: { Exec_per_op_per_year: 400, Error_rate_base: 3, Error_rate_AR: 1.5, Cost_per_error: 250 },
        downtime: { H_downtime_base_per_year: 40, Downtime_reduction_pct: 35, Cost_per_downtime_hour: 2000 },
        remoteSupport: { Visits_per_year: 10, Cost_per_visit: 1500, Visit_reduction_pct: 50 },
    },
};

// Impact presets (Conservative, Typical, Ambitious)
export const impactPresets: Record<ImpactPreset, {
    errorReduction: number;      // % reduction in errors
    trainingReduction: number;   // % reduction in training time
    downtimeReduction: number;   // % reduction in downtime
    label: string;
    description: string;
}> = {
    conservative: {
        errorReduction: 30,
        trainingReduction: 25,
        downtimeReduction: 25,
        label: 'Conservative',
        description: '30% fewer errors, 25% less training time, 25% less downtime',
    },
    typical: {
        errorReduction: 50,
        trainingReduction: 40,
        downtimeReduction: 40,
        label: 'Typical',
        description: '50% fewer errors, 40% less training time, 40% less downtime',
    },
    ambitious: {
        errorReduction: 70,
        trainingReduction: 50,
        downtimeReduction: 50,
        label: 'Ambitious',
        description: '70% fewer errors, 50% less training time, 50% less downtime',
    },
};

// Apply impact preset to inputs
export function applyImpactPreset(
    inputs: Partial<RoiInputs>,
    preset: ImpactPreset
): Partial<RoiInputs> {
    const impact = impactPresets[preset];

    return {
        ...inputs,
        training: {
            ...inputs.training!,
            H_train_AR: inputs.training!.H_train_base * (1 - impact.trainingReduction / 100),
        },
        quality: {
            ...inputs.quality!,
            Error_rate_AR: inputs.quality!.Error_rate_base * (1 - impact.errorReduction / 100),
        },
        downtime: {
            ...inputs.downtime!,
            Downtime_reduction_pct: impact.downtimeReduction,
        },
    };
}

// Default cost assumptions for AR solution
export const defaultCosts: RoiInputs['costs'] = {
    C_license_user_year: 1200,     // €1,200 per user per year
    N_users: 10,
    C_license_site_year: 5000,     // €5,000 per site per year
    N_sites: 1,
    C_device_per_user: 800,        // €800 per tablet/device
    N_devices: 5,
    Device_lifetime_years: 3,
    Implementation_one_time: 15000, // €15,000 implementation
    Content_initial: 10000,         // €10,000 initial content creation
    Content_annual: 3000,           // €3,000 annual maintenance
    Internal_PM_hours: 100,         // 100 hours internal PM
    Internal_PM_rate: 80,           // €80/hour
};

// Default financial assumptions
export const defaultFinancial: RoiInputs['financial'] = {
    Horizon_years: 3,
    Discount_rate: 0.08,
    Adoption_year1: 0.6,
    Adoption_year2: 0.8,
    Adoption_year3: 1.0,
};

// Get complete default inputs for an industry
export function getDefaultInputs(industry: Industry = 'other'): RoiInputs {
    const industryDefaults_ = industryDefaults[industry];

    return {
        workforce: industryDefaults_.workforce as RoiInputs['workforce'],
        training: industryDefaults_.training as RoiInputs['training'],
        quality: industryDefaults_.quality as RoiInputs['quality'],
        downtime: industryDefaults_.downtime as RoiInputs['downtime'],
        remoteSupport: industryDefaults_.remoteSupport as RoiInputs['remoteSupport'],
        costs: defaultCosts,
        financial: defaultFinancial,
    };
}

// Industry labels for display
export const industryLabels: Record<Industry, string> = {
    food_beverage: 'Food & Beverage',
    pharma: 'Pharma & Life Sciences',
    packaging: 'Packaging',
    logistics: 'Logistics',
    other: 'Other',
};

// Country list for lead form
export const countries = [
    'Belgium', 'Netherlands', 'Germany', 'France', 'United Kingdom',
    'Spain', 'Italy', 'Poland', 'Austria', 'Switzerland',
    'Sweden', 'Denmark', 'Norway', 'Finland', 'Ireland',
    'United States', 'Canada', 'Other',
];
