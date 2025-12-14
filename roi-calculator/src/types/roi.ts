// ROI Calculator Types
// Based on roi-calculator-concept.txt specifications

export interface WorkforceInputs {
    N_op: number;                    // Number of operators working with SOPs
    N_new: number;                   // Number of new operators per year
    SOP_count: number;               // Number of critical SOPs supported by AR
}

export interface TrainingInputs {
    H_train_base: number;            // Training hours per new operator today
    H_train_AR: number;              // Training hours per new operator with AR
    C_hour_op: number;               // Fully loaded hourly cost of an operator
    C_hour_trainer: number;          // Fully loaded hourly cost of trainer/SME
}

export interface QualityInputs {
    Exec_per_op_per_year: number;    // SOP executions per operator per year
    Error_rate_base: number;         // Current error probability per execution (%)
    Error_rate_AR: number;           // Error probability with AR (%)
    Cost_per_error: number;          // Average cost per error
}

export interface DowntimeInputs {
    H_downtime_base_per_year: number; // Hours of unplanned downtime per year
    Downtime_reduction_pct: number;   // % reduction of downtime with AR
    Cost_per_downtime_hour: number;   // Cost per hour of downtime
}

export interface RemoteSupportInputs {
    Visits_per_year: number;         // On-site troubleshooting/training visits per year
    Cost_per_visit: number;          // Cost per visit (travel + time)
    Visit_reduction_pct: number;     // % reduction of visits with remote expert
}

export interface CostInputs {
    C_license_user_year: number;     // Annual license cost per user
    N_users: number;                 // Number of users (authors + viewers)
    C_license_site_year: number;     // Fixed license cost per site per year
    N_sites: number;                 // Number of sites
    C_device_per_user: number;       // Device investment per user
    N_devices: number;               // Number of devices
    Device_lifetime_years: number;   // Hardware lifetime in years
    Implementation_one_time: number; // One-time implementation cost
    Content_initial: number;         // One-time cost to convert SOPs to AR
    Content_annual: number;          // Annual cost to maintain content
    Internal_PM_hours: number;       // Internal PM hours per year
    Internal_PM_rate: number;        // Hourly rate of internal PM
}

export interface FinancialInputs {
    Horizon_years: number;           // Business case horizon (e.g. 3 years)
    Discount_rate: number;           // Discount rate for NPV (e.g. 0.08-0.10)
    Adoption_year1: number;          // Adoption level year 1 (e.g. 0.6)
    Adoption_year2: number;          // Adoption level year 2 (e.g. 0.8)
    Adoption_year3: number;          // Adoption level year 3 (e.g. 1.0)
}

export interface RoiInputs {
    workforce: WorkforceInputs;
    training: TrainingInputs;
    quality: QualityInputs;
    downtime: DowntimeInputs;
    remoteSupport: RemoteSupportInputs;
    costs: CostInputs;
    financial: FinancialInputs;
}

export interface BenefitBreakdown {
    training_savings: number;
    quality_savings: number;
    downtime_savings: number;
    remote_savings: number;
    total_annual_benefits: number;
}

export interface CostBreakdown {
    software_annual: number;
    hardware_annual: number;
    opex_annual: number;
    total_annual_costs: number;
    one_time_costs: number;
}

export interface YearlyCashflow {
    year: number;
    benefits: number;
    costs: number;
    net: number;
    cumulative: number;
    discounted: number;
}

export interface RoiResults {
    benefits: BenefitBreakdown;
    costs: CostBreakdown;
    cashflow: YearlyCashflow[];
    payback_months: number;
    roi_3y_percent: number;
    npv: number;
    net_annual_steady: number;
}

export type Industry = 'food_beverage' | 'pharma' | 'packaging' | 'logistics' | 'other';

export type ImpactPreset = 'conservative' | 'typical' | 'ambitious';

export interface LeadInfo {
    name: string;
    company: string;
    email: string;
    country: string;
    timeline?: 'exploring' | '6_12_months' | '3_6_months';
    process_description?: string;
}
