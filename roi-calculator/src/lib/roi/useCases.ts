// Use Case Calculator Functions
// Each function returns a BenefitBreakdown for its specific use case

import {
    BenefitDriver,
    BenefitBreakdown,
    AssemblyInputs,
    ChangeoverInputs,
    MaintenanceInputs,
    FaultRecoveryInputs,
    TrainingInputs,
    UseCaseOption,
} from './types';

// ============ USE CASE OPTIONS ============

export const USE_CASE_OPTIONS: UseCaseOption[] = [
    {
        id: 'assembly',
        label: 'Error-free assembly with AR',
        description: 'Guide operators through complex assembly procedures with step-by-step AR instructions. Eliminate errors from missed steps, wrong parts, or incorrect sequences—reducing rework, scrap, and quality escapes.',
        icon: '🔧',
        primaryDrivers: ['quality', 'training'],
    },
    {
        id: 'changeover',
        label: 'AR-guided changeovers (SMED)',
        description: 'Standardize and accelerate product/format changeovers using AR work instructions. Reduce changeover time, minimize first-batch scrap, and enable less experienced operators to perform changeovers confidently.',
        icon: '⚙️',
        primaryDrivers: ['downtime', 'quality'],
    },
    {
        id: 'maintenance',
        label: 'Data-driven / AR-guided maintenance',
        description: 'Empower technicians with AR-guided preventive and corrective maintenance procedures. Reduce unplanned downtime, cut Mean Time To Repair (MTTR), and decrease reliance on on-site expert visits.',
        icon: '🛠️',
        primaryDrivers: ['downtime', 'travel'],
    },
    {
        id: 'fault_recovery',
        label: 'Fast fault recovery (remote expert)',
        description: 'Resolve equipment issues faster by connecting frontline workers with remote experts via AR. Reduce downtime through real-time visual guidance and eliminate unnecessary travel for specialist support.',
        icon: '📡',
        primaryDrivers: ['downtime', 'travel'],
    },
    {
        id: 'training',
        label: 'Onboarding & training with AR SOPs',
        description: 'Accelerate new operator onboarding with interactive AR training modules. Reduce time-to-competence, free up trainers for value-added work, and decrease learning curve errors and scrap.',
        icon: '🎓',
        primaryDrivers: ['training'],
    },
];

// ============ HELPER ============

function createEmptyBreakdown(): Record<BenefitDriver, number> {
    return {
        training: 0,
        quality: 0,
        downtime: 0,
        travel: 0,
        throughput: 0,
    };
}

function sumBreakdown(annual: Record<BenefitDriver, number>): number {
    return Object.values(annual).reduce((a, b) => a + b, 0);
}

// ============ ASSEMBLY ============

export function calcAssemblyBenefits(i: AssemblyInputs): BenefitBreakdown {
    // Quality savings from fewer errors
    const errorsBase = i.unitsPerYear * i.errorRateBase;
    const errorsAr = i.unitsPerYear * i.errorRateAr;
    const errorsAvoided = Math.max(errorsBase - errorsAr, 0);
    const qualitySavings = errorsAvoided * i.costPerError;

    // Optional training savings
    let trainingSavings = 0;
    if (
        i.trainingHoursBase !== undefined &&
        i.trainingHoursAr !== undefined &&
        i.newOperatorsPerYear &&
        i.operatorRate &&
        i.trainerRate
    ) {
        const hoursSaved = i.newOperatorsPerYear * (i.trainingHoursBase - i.trainingHoursAr);
        trainingSavings = Math.max(hoursSaved, 0) * (i.operatorRate + i.trainerRate);
    }

    const annual = createEmptyBreakdown();
    annual.quality = qualitySavings;
    annual.training = trainingSavings;

    return {
        annual,
        totalAnnual: sumBreakdown(annual),
    };
}

// ============ CHANGEOVER ============

export function calcChangeoverBenefits(i: ChangeoverInputs): BenefitBreakdown {
    // Downtime savings from faster changeovers
    const minutesSavedPerChangeover = Math.max(i.changeoverTimeBase - i.changeoverTimeAr, 0);
    const downtimeSavings = i.changeoversPerYear * minutesSavedPerChangeover * i.costPerChangeoverMinute;

    // Optional quality savings from reduced scrap
    let qualitySavings = 0;
    if (
        i.scrapCostBasePerChangeover !== undefined &&
        i.scrapCostArPerChangeover !== undefined
    ) {
        const scrapSavedPerChangeover = i.scrapCostBasePerChangeover - i.scrapCostArPerChangeover;
        qualitySavings = i.changeoversPerYear * Math.max(scrapSavedPerChangeover, 0);
    }

    const annual = createEmptyBreakdown();
    annual.downtime = downtimeSavings;
    annual.quality = qualitySavings;

    return {
        annual,
        totalAnnual: sumBreakdown(annual),
    };
}

// ============ MAINTENANCE ============

export function calcMaintenanceBenefits(i: MaintenanceInputs): BenefitBreakdown {
    // Downtime savings
    const hoursSaved = i.downtimeHoursBasePerYear * i.downtimeReductionPct;
    const downtimeSavings = hoursSaved * i.costPerDowntimeHour;

    // Optional travel savings from fewer emergency visits
    let travelSavings = 0;
    if (
        i.emergencyVisitsPerYear &&
        i.costPerVisit &&
        i.visitReductionPct !== undefined
    ) {
        const visitsAvoided = i.emergencyVisitsPerYear * i.visitReductionPct;
        travelSavings = visitsAvoided * i.costPerVisit;
    }

    const annual = createEmptyBreakdown();
    annual.downtime = downtimeSavings;
    annual.travel = travelSavings;

    return {
        annual,
        totalAnnual: sumBreakdown(annual),
    };
}

// ============ FAULT RECOVERY ============

export function calcFaultRecoveryBenefits(i: FaultRecoveryInputs): BenefitBreakdown {
    // Downtime savings from reduced MTTR
    const hoursSavedPerIncident = Math.max(i.mttrBase - i.mttrAr, 0);
    const downtimeSavings = i.incidentsPerYear * hoursSavedPerIncident * i.costPerDowntimeHour;

    // Optional travel savings
    let travelSavings = 0;
    if (
        i.onsiteVisitsPerYear &&
        i.costPerVisit &&
        i.visitReductionPct !== undefined
    ) {
        const visitsAvoided = i.onsiteVisitsPerYear * i.visitReductionPct;
        travelSavings = visitsAvoided * i.costPerVisit;
    }

    const annual = createEmptyBreakdown();
    annual.downtime = downtimeSavings;
    annual.travel = travelSavings;

    return {
        annual,
        totalAnnual: sumBreakdown(annual),
    };
}

// ============ TRAINING ============

export function calcTrainingBenefits(i: TrainingInputs): BenefitBreakdown {
    // Training time savings
    const hoursSaved = i.newOperatorsPerYear * Math.max(i.trainingHoursBase - i.trainingHoursAr, 0);
    const trainingSavings = hoursSaved * (i.operatorRate + i.trainerRate);

    // Optional quality savings from reduced learning curve scrap
    let qualitySavings = 0;
    if (
        i.scrapDuringLearningBase !== undefined &&
        i.scrapDuringLearningAr !== undefined
    ) {
        qualitySavings = i.newOperatorsPerYear * Math.max(
            i.scrapDuringLearningBase - i.scrapDuringLearningAr,
            0
        );
    }

    const annual = createEmptyBreakdown();
    annual.training = trainingSavings;
    annual.quality = qualitySavings;

    return {
        annual,
        totalAnnual: sumBreakdown(annual),
    };
}
