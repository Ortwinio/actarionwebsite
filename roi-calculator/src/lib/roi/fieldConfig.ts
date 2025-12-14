// ROI Calculator Field Configuration
// Central configuration for all form field labels, tooltips, and types

export type RoiFieldType =
    | 'number'
    | 'percent'
    | 'currency'
    | 'integer'
    | 'years'
    | 'minutes'
    | 'hours';

export interface RoiFieldConfigItem {
    id: string;
    label: string;
    tooltip: string;
    placeholder?: string;
    type?: RoiFieldType;
}

// ============ FIELD CONFIGURATION ============

export const roiFieldConfig: Record<string, RoiFieldConfigItem> = {
    // ============ GLOBAL / FINANCIAL FIELDS ============

    discountRate: {
        id: 'discountRate',
        label: 'Discount rate',
        tooltip: 'Annual discount rate used to calculate Net Present Value (NPV). Typically 8-10% for industrial projects.',
        placeholder: '8',
        type: 'percent',
    },

    horizonYears: {
        id: 'horizonYears',
        label: 'Business case horizon',
        tooltip: 'Number of years to project the ROI calculation. Standard is 3 years.',
        placeholder: '3',
        type: 'years',
    },

    adoptionYear1: {
        id: 'adoptionYear1',
        label: 'Adoption level Year 1',
        tooltip: 'Expected percentage of full AR adoption in the first year of rollout.',
        placeholder: '60',
        type: 'percent',
    },

    adoptionYear2: {
        id: 'adoptionYear2',
        label: 'Adoption level Year 2',
        tooltip: 'Expected percentage of full AR adoption in the second year.',
        placeholder: '80',
        type: 'percent',
    },

    adoptionYear3: {
        id: 'adoptionYear3',
        label: 'Adoption level Year 3',
        tooltip: 'Expected percentage of full AR adoption in the third year.',
        placeholder: '100',
        type: 'percent',
    },

    // ============ COST FIELDS ============

    annualSoftwareCost: {
        id: 'annualSoftwareCost',
        label: 'Annual software cost',
        tooltip: 'Total annual licensing cost for the AR platform, including user licenses and site fees.',
        placeholder: '17000',
        type: 'currency',
    },

    annualHardwareCost: {
        id: 'annualHardwareCost',
        label: 'Annual hardware cost',
        tooltip: 'Annualized cost of AR hardware (devices / lifetime years).',
        placeholder: '1333',
        type: 'currency',
    },

    annualOpexCost: {
        id: 'annualOpexCost',
        label: 'Annual OPEX',
        tooltip: 'Ongoing operational costs: content maintenance, internal project management, support.',
        placeholder: '11000',
        type: 'currency',
    },

    oneTimeCost: {
        id: 'oneTimeCost',
        label: 'One-time implementation',
        tooltip: 'Initial investment including implementation services and initial content creation.',
        placeholder: '25000',
        type: 'currency',
    },

    // ============ ASSEMBLY USE CASE ============

    assembly_unitsPerYear: {
        id: 'assembly_unitsPerYear',
        label: 'Assemblies per year',
        tooltip: 'Total number of assembly operations performed annually across all operators.',
        placeholder: '50000',
        type: 'integer',
    },

    assembly_errorRateBase: {
        id: 'assembly_errorRateBase',
        label: 'Current error rate',
        tooltip: 'Current percentage of assemblies that result in errors requiring rework or scrap.',
        placeholder: '3',
        type: 'percent',
    },

    assembly_errorRateAr: {
        id: 'assembly_errorRateAr',
        label: 'Error rate with AR',
        tooltip: 'Expected error rate with AR-guided assembly. Studies show 50-90% reduction is common.',
        placeholder: '1',
        type: 'percent',
    },

    assembly_costPerError: {
        id: 'assembly_costPerError',
        label: 'Cost per assembly error',
        tooltip: 'Average cost per error including rework, scrap, downtime, and quality checks.',
        placeholder: '150',
        type: 'currency',
    },

    assembly_trainingHoursBase: {
        id: 'assembly_trainingHoursBase',
        label: 'Training hours today',
        tooltip: 'Hours required to train a new operator on assembly procedures.',
        placeholder: '24',
        type: 'hours',
    },

    assembly_trainingHoursAr: {
        id: 'assembly_trainingHoursAr',
        label: 'Training hours with AR',
        tooltip: 'Expected training hours with AR guidance. Typically 40-60% reduction.',
        placeholder: '12',
        type: 'hours',
    },

    // ============ CHANGEOVER USE CASE ============

    changeover_changeoversPerYear: {
        id: 'changeover_changeoversPerYear',
        label: 'Changeovers per year',
        tooltip: 'Total number of product/format changeovers performed annually.',
        placeholder: '200',
        type: 'integer',
    },

    changeover_timeBase: {
        id: 'changeover_timeBase',
        label: 'Changeover time today',
        tooltip: 'Average changeover duration in minutes without AR guidance.',
        placeholder: '45',
        type: 'minutes',
    },

    changeover_timeAr: {
        id: 'changeover_timeAr',
        label: 'Changeover time with AR',
        tooltip: 'Expected changeover duration with AR-guided SMED procedures.',
        placeholder: '30',
        type: 'minutes',
    },

    changeover_costPerMinute: {
        id: 'changeover_costPerMinute',
        label: 'Cost per minute of changeover',
        tooltip: 'Cost per minute of changeover based on OEE loss and throughput value.',
        placeholder: '50',
        type: 'currency',
    },

    changeover_scrapCostBase: {
        id: 'changeover_scrapCostBase',
        label: 'Scrap cost per changeover today',
        tooltip: 'Average scrap and ramp-up waste cost per changeover without AR.',
        placeholder: '200',
        type: 'currency',
    },

    changeover_scrapCostAr: {
        id: 'changeover_scrapCostAr',
        label: 'Scrap cost with AR',
        tooltip: 'Expected scrap cost per changeover with AR guidance.',
        placeholder: '50',
        type: 'currency',
    },

    // ============ MAINTENANCE USE CASE ============

    maintenance_downtimeHours: {
        id: 'maintenance_downtimeHours',
        label: 'Unplanned downtime hours/year',
        tooltip: 'Total hours of unplanned production stops due to maintenance issues annually.',
        placeholder: '80',
        type: 'hours',
    },

    maintenance_reductionPct: {
        id: 'maintenance_reductionPct',
        label: 'Downtime reduction with AR',
        tooltip: 'Expected percentage reduction in downtime with AR-guided maintenance.',
        placeholder: '35',
        type: 'percent',
    },

    maintenance_costPerHour: {
        id: 'maintenance_costPerHour',
        label: 'Cost per hour of downtime',
        tooltip: 'Cost per hour of unplanned downtime including lost production and labor.',
        placeholder: '2000',
        type: 'currency',
    },

    maintenance_visitsPerYear: {
        id: 'maintenance_visitsPerYear',
        label: 'Emergency visits per year',
        tooltip: 'Number of emergency on-site visits by external technicians or experts.',
        placeholder: '12',
        type: 'integer',
    },

    maintenance_costPerVisit: {
        id: 'maintenance_costPerVisit',
        label: 'Cost per visit',
        tooltip: 'Cost per emergency visit including travel, time, and service fees.',
        placeholder: '2000',
        type: 'currency',
    },

    maintenance_visitReductionPct: {
        id: 'maintenance_visitReductionPct',
        label: 'Visit reduction',
        tooltip: 'Expected percentage reduction in on-site visits using remote AR support.',
        placeholder: '50',
        type: 'percent',
    },

    // ============ FAULT RECOVERY USE CASE ============

    fault_incidentsPerYear: {
        id: 'fault_incidentsPerYear',
        label: 'Incidents per year',
        tooltip: 'Number of fault/breakdown incidents requiring troubleshooting annually.',
        placeholder: '50',
        type: 'integer',
    },

    fault_mttrBase: {
        id: 'fault_mttrBase',
        label: 'Mean time to repair today',
        tooltip: 'Average time to resolve a fault without AR/remote expert support.',
        placeholder: '4',
        type: 'hours',
    },

    fault_mttrAr: {
        id: 'fault_mttrAr',
        label: 'MTTR with AR/remote expert',
        tooltip: 'Expected mean time to repair with AR-guided troubleshooting and remote expert access.',
        placeholder: '2',
        type: 'hours',
    },

    fault_costPerHour: {
        id: 'fault_costPerHour',
        label: 'Cost per hour of downtime',
        tooltip: 'Cost per hour of production downtime during fault recovery.',
        placeholder: '2500',
        type: 'currency',
    },

    fault_onsiteVisits: {
        id: 'fault_onsiteVisits',
        label: 'On-site visits per year',
        tooltip: 'Number of on-site visits by external experts for fault resolution.',
        placeholder: '20',
        type: 'integer',
    },

    fault_costPerVisit: {
        id: 'fault_costPerVisit',
        label: 'Cost per visit',
        tooltip: 'Cost per on-site expert visit including travel and service time.',
        placeholder: '1500',
        type: 'currency',
    },

    fault_visitReductionPct: {
        id: 'fault_visitReductionPct',
        label: 'Visit reduction',
        tooltip: 'Expected percentage of visits avoided using remote AR expert support.',
        placeholder: '60',
        type: 'percent',
    },

    // ============ TRAINING USE CASE ============

    training_newOperatorsPerYear: {
        id: 'training_newOperatorsPerYear',
        label: 'New operators per year',
        tooltip: 'Number of new operators requiring training annually (new hires + transfers).',
        placeholder: '8',
        type: 'integer',
    },

    training_hoursBase: {
        id: 'training_hoursBase',
        label: 'Training hours per person today',
        tooltip: 'Hours of training required per new operator with traditional methods.',
        placeholder: '40',
        type: 'hours',
    },

    training_hoursAr: {
        id: 'training_hoursAr',
        label: 'Training hours with AR',
        tooltip: 'Expected training hours with AR SOPs. Studies show up to 4x faster learning.',
        placeholder: '20',
        type: 'hours',
    },

    training_operatorRate: {
        id: 'training_operatorRate',
        label: 'Operator hourly rate',
        tooltip: 'Fully loaded hourly cost of an operator (salary + benefits + overhead).',
        placeholder: '40',
        type: 'currency',
    },

    training_trainerRate: {
        id: 'training_trainerRate',
        label: 'Trainer hourly rate',
        tooltip: 'Fully loaded hourly cost of a trainer or subject matter expert.',
        placeholder: '60',
        type: 'currency',
    },

    training_scrapDuringLearningBase: {
        id: 'training_scrapDuringLearningBase',
        label: 'Scrap during learning today',
        tooltip: 'Average scrap/waste cost during the learning curve period per new operator.',
        placeholder: '500',
        type: 'currency',
    },

    training_scrapDuringLearningAr: {
        id: 'training_scrapDuringLearningAr',
        label: 'Scrap during learning with AR',
        tooltip: 'Expected scrap cost during learning period with AR guidance.',
        placeholder: '200',
        type: 'currency',
    },

    // ============ LEGACY GENERIC FIELDS ============
    // These are used by the Quick ROI Snapshot and generic calculator

    N_op: {
        id: 'N_op',
        label: 'Operators using these SOPs',
        tooltip: 'Operators who regularly perform the procedures you plan to support with AR.',
        placeholder: '25',
        type: 'integer',
    },

    N_new: {
        id: 'N_new',
        label: 'New operators per year',
        tooltip: 'Number of new hires and internal transfers requiring training annually.',
        placeholder: '6',
        type: 'integer',
    },

    H_train_base: {
        id: 'H_train_base',
        label: 'Training hours per new operator',
        tooltip: 'Hours of formal training required for a new operator today.',
        placeholder: '24',
        type: 'hours',
    },

    Error_rate_base: {
        id: 'Error_rate_base',
        label: 'Current error rate',
        tooltip: 'Percentage of SOP executions that result in errors requiring rework.',
        placeholder: '3',
        type: 'percent',
    },

    Cost_per_error: {
        id: 'Cost_per_error',
        label: 'Cost per error',
        tooltip: 'Average cost per error including rework, scrap, and quality impacts.',
        placeholder: '250',
        type: 'currency',
    },

    H_downtime_base: {
        id: 'H_downtime_base',
        label: 'Unplanned downtime hours/year',
        tooltip: 'Total hours of unplanned production stops per year.',
        placeholder: '40',
        type: 'hours',
    },

    Cost_per_downtime_hour: {
        id: 'Cost_per_downtime_hour',
        label: 'Cost per hour of downtime',
        tooltip: 'Cost per hour of unplanned production downtime.',
        placeholder: '2000',
        type: 'currency',
    },

    C_hour_op: {
        id: 'C_hour_op',
        label: 'Operator hourly rate',
        tooltip: 'Fully loaded hourly cost of an operator.',
        placeholder: '40',
        type: 'currency',
    },

    C_hour_trainer: {
        id: 'C_hour_trainer',
        label: 'Trainer hourly rate',
        tooltip: 'Fully loaded hourly cost for trainers, subject-matter experts or supervisors involved in training.',
        placeholder: '60',
        type: 'currency',
    },

    N_sites: {
        id: 'N_sites',
        label: 'Number of sites',
        tooltip: 'How many plants or sites will use AR-guided SOPs in this scenario.',
        placeholder: '1',
        type: 'integer',
    },

    Exec_per_op_per_year: {
        id: 'Exec_per_op_per_year',
        label: 'SOP executions per operator per year',
        tooltip: 'Average number of times per year each operator runs these procedures (e.g. setups, changeovers, inspections).',
        placeholder: '400',
        type: 'integer',
    },

    H_train_AR: {
        id: 'H_train_AR',
        label: 'Training hours with AR',
        tooltip: 'Expected training time once AR-guided SOPs are in place. Often 30–50% lower than today.',
        placeholder: '14',
        type: 'hours',
    },

    Downtime_reduction_pct: {
        id: 'Downtime_reduction_pct',
        label: 'Expected reduction in SOP-related downtime',
        tooltip: 'Estimated percentage reduction in downtime after standardising and guiding SOPs with AR.',
        placeholder: '40',
        type: 'percent',
    },

    Visits_per_year: {
        id: 'Visits_per_year',
        label: 'On-site expert visits per year',
        tooltip: 'Number of on-site troubleshooting or training visits by internal experts or external vendors per year.',
        placeholder: '20',
        type: 'integer',
    },

    Cost_per_visit: {
        id: 'Cost_per_visit',
        label: 'Average cost per expert visit',
        tooltip: 'Total cost of one on-site visit, including travel time, travel expenses and lost productive time.',
        placeholder: '800',
        type: 'currency',
    },

    Visit_reduction_pct: {
        id: 'Visit_reduction_pct',
        label: 'Expected reduction in on-site visits',
        tooltip: 'Estimated percentage of visits that can be replaced by remote expert support and AR-guided troubleshooting.',
        placeholder: '50',
        type: 'percent',
    },

    // ============ DETAILED COST FIELDS ============

    C_license_user_year: {
        id: 'C_license_user_year',
        label: 'License cost per user per year',
        tooltip: 'Annual software license cost per active AR user (authors + viewers).',
        placeholder: '600',
        type: 'currency',
    },

    N_users: {
        id: 'N_users',
        label: 'Number of AR users',
        tooltip: 'Total number of users who will access AR-guided SOPs or author content.',
        placeholder: '30',
        type: 'integer',
    },

    C_license_site_year: {
        id: 'C_license_site_year',
        label: 'Fixed license cost per site per year',
        tooltip: 'Any additional fixed annual platform or site fee, if applicable. Leave at 0 if not used.',
        placeholder: '0',
        type: 'currency',
    },

    N_devices: {
        id: 'N_devices',
        label: 'Number of devices',
        tooltip: 'Number of dedicated devices that will be used for AR-guided SOPs at the sites in scope.',
        placeholder: '15',
        type: 'integer',
    },

    C_device_per_user: {
        id: 'C_device_per_user',
        label: 'Average device cost',
        tooltip: 'Average investment per device, such as a rugged tablet or smart glasses, including accessories if relevant.',
        placeholder: '1200',
        type: 'currency',
    },

    Device_lifetime_years: {
        id: 'Device_lifetime_years',
        label: 'Device lifetime',
        tooltip: 'Number of years over which you want to depreciate or spread the device investment.',
        placeholder: '3',
        type: 'years',
    },

    Implementation_one_time: {
        id: 'Implementation_one_time',
        label: 'One-time implementation cost',
        tooltip: 'One-time cost for implementation, integration, configuration and initial onboarding of the AR platform.',
        placeholder: '25000',
        type: 'currency',
    },

    Content_initial: {
        id: 'Content_initial',
        label: 'One-time AR content creation cost',
        tooltip: 'Initial effort to convert your most critical SOPs into AR workflows (engineering, SME, and content work).',
        placeholder: '15000',
        type: 'currency',
    },

    Content_annual: {
        id: 'Content_annual',
        label: 'Annual content maintenance cost',
        tooltip: 'Estimated yearly effort to keep AR SOPs up to date when processes, products or equipment change.',
        placeholder: '8000',
        type: 'currency',
    },

    Internal_PM_hours: {
        id: 'Internal_PM_hours',
        label: 'Internal project management hours/year',
        tooltip: 'Estimated internal time spent on coordination, stakeholder management and governance for this AR program.',
        placeholder: '120',
        type: 'number',
    },

    Internal_PM_rate: {
        id: 'Internal_PM_rate',
        label: 'Internal PM hourly rate',
        tooltip: 'Fully loaded hourly cost for internal project or program managers involved in the AR rollout.',
        placeholder: '70',
        type: 'currency',
    },
};

// ============ HELPER FUNCTIONS ============

/**
 * Get field config by ID, throws if not found
 */
export function getFieldConfig(id: string): RoiFieldConfigItem {
    const config = roiFieldConfig[id];
    if (!config) {
        throw new Error(`Field config not found for: ${id}`);
    }
    return config;
}

/**
 * Get field config by ID, returns undefined if not found
 */
export function getFieldConfigSafe(id: string): RoiFieldConfigItem | undefined {
    return roiFieldConfig[id];
}

/**
 * Get type suffix for display (e.g., "%" for percent, "€" for currency)
 */
export function getTypeSuffix(type?: RoiFieldType): string {
    switch (type) {
        case 'percent':
            return '%';
        case 'currency':
            return '€';
        case 'minutes':
            return 'min';
        case 'hours':
            return 'h';
        case 'years':
            return 'yr';
        default:
            return '';
    }
}

/**
 * Get type prefix for display (e.g., "€" for currency)
 */
export function getTypePrefix(type?: RoiFieldType): string {
    switch (type) {
        case 'currency':
            return '€';
        default:
            return '';
    }
}
