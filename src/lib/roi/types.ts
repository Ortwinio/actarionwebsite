// Ported unchanged from github.com/Ortwinio/roicalculator (calculation engine).
// ROI Calculator Domain Types
// Use-case-driven calculation model

// ============ BENEFIT DRIVERS ============

export type BenefitDriver = 'training' | 'quality' | 'downtime' | 'travel' | 'throughput';

export interface BenefitBreakdown {
    annual: Record<BenefitDriver, number>; // € per year per driver
    totalAnnual: number;                   // sum of all drivers
}

// ============ GLOBAL INPUTS ============

export interface GlobalInputs {
    discountRate: number;       // e.g. 0.08 for 8%
    horizonYears: number;       // e.g. 3
    adoptionByYear: number[];   // e.g. [0.6, 0.8, 1.0]
}

// ============ COST INPUTS ============

export interface CostInputs {
    annualSoftwareCost: number;
    annualHardwareCost: number;
    annualOpexCost: number;
    oneTimeCost: number;
}

// ============ USE CASE IDS ============

export type UseCaseId =
    | 'assembly'
    | 'changeover'
    | 'maintenance'
    | 'fault_recovery'
    | 'training';

export interface UseCaseOption {
    id: UseCaseId;
    label: string;
    description: string;
    icon: string;
    primaryDrivers: BenefitDriver[];
}

// ============ USE CASE INPUTS ============

export interface AssemblyInputs {
    unitsPerYear: number;
    errorRateBase: number;        // 0-1 (e.g. 0.03 = 3%)
    errorRateAr: number;          // 0-1
    costPerError: number;
    // Optional training component
    trainingHoursBase?: number;
    trainingHoursAr?: number;
    newOperatorsPerYear?: number;
    operatorRate?: number;
    trainerRate?: number;
}

export interface ChangeoverInputs {
    changeoversPerYear: number;
    changeoverTimeBase: number;   // minutes
    changeoverTimeAr: number;     // minutes
    costPerChangeoverMinute: number;
    // Optional scrap during ramp-up
    scrapCostBasePerChangeover?: number;
    scrapCostArPerChangeover?: number;
}

export interface MaintenanceInputs {
    downtimeHoursBasePerYear: number;
    downtimeReductionPct: number;   // 0-1
    costPerDowntimeHour: number;
    // Optional emergency visits
    emergencyVisitsPerYear?: number;
    costPerVisit?: number;
    visitReductionPct?: number;     // 0-1
}

export interface FaultRecoveryInputs {
    incidentsPerYear: number;
    mttrBase: number;               // hours
    mttrAr: number;                 // hours
    costPerDowntimeHour: number;
    // Optional on-site visits
    onsiteVisitsPerYear?: number;
    costPerVisit?: number;
    visitReductionPct?: number;     // 0-1
}

export interface TrainingInputs {
    newOperatorsPerYear: number;
    trainingHoursBase: number;
    trainingHoursAr: number;
    operatorRate: number;
    trainerRate: number;
    // Optional learning curve scrap
    scrapDuringLearningBase?: number;
    scrapDuringLearningAr?: number;
}

export type UseCaseInputs =
    | { id: 'assembly'; payload: AssemblyInputs }
    | { id: 'changeover'; payload: ChangeoverInputs }
    | { id: 'maintenance'; payload: MaintenanceInputs }
    | { id: 'fault_recovery'; payload: FaultRecoveryInputs }
    | { id: 'training'; payload: TrainingInputs };

// ============ RESULTS ============

export interface UseCaseResult {
    id: UseCaseId;
    label: string;
    benefits: BenefitBreakdown;
}

export interface ScenarioResult {
    useCases: UseCaseResult[];
    aggregated: BenefitBreakdown;
    annualCosts: number;
    oneTimeCosts: number;
    cashflows: number[];           // per year including year 0
    cumulativeCashflows: number[];
    paybackYears: number | null;   // null if never breaks even
    paybackMonths: number | null;
    roiHorizon: number;            // simple ROI %
    npv: number;
}

// ============ SCENARIO INPUTS ============

export interface ScenarioInputs {
    global: GlobalInputs;
    useCases: UseCaseInputs[];
    costs: CostInputs;
}
