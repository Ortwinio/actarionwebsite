// PDF Report Types
import { ScenarioInputs, ScenarioResult, UseCaseId } from '../types';

export interface RequesterInfo {
    companyName: string;
    contactName: string;
    email: string;
    role?: string;
    country?: string;
    siteName?: string;
    notes?: string;
}

export interface RoiReportRequest {
    requester: RequesterInfo;
    scenarioInputs: ScenarioInputs;
    selectedUseCases: UseCaseId[];
}

export interface RoiReportData {
    requester: RequesterInfo;
    scenarioInputs: ScenarioInputs;
    scenarioResult: ScenarioResult;
    selectedUseCases: UseCaseId[];
    generatedAt: Date;
}
