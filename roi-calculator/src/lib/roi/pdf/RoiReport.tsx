// ROI Report PDF Component
// Uses @react-pdf/renderer to generate multi-section PDF

import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';
import { RoiReportData } from './types';
import { UseCaseId, UseCaseInputs } from '../types';
import { USE_CASE_OPTIONS } from '../useCases';
import { getTypeSuffix } from '../fieldConfig';
import {
    FUTURE_OF_WORK_SECTION,
    NEXT_STEPS_SECTION,
    CONTACT_INFO,
    DISCLAIMER,
} from './staticContent';

// ============ STYLES ============

// Actarion brand colors for PDF
const colors = {
    primary: '#0891b2',
    primaryDark: '#0e7490',
    primaryLight: '#22d3ee',
    secondary: '#22c55e',
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
    background: '#f8fafc',
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        color: colors.text,
    },
    // Cover page
    coverPage: {
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverTitle: {
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
        color: colors.primary,
        marginBottom: 10,
        textAlign: 'center',
    },
    coverSubtitle: {
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 40,
        textAlign: 'center',
    },
    coverInfo: {
        marginTop: 40,
        padding: 20,
        backgroundColor: colors.background,
        borderRadius: 4,
        width: '100%',
    },
    coverInfoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    coverInfoLabel: {
        width: 120,
        color: colors.textMuted,
    },
    coverInfoValue: {
        flex: 1,
        fontFamily: 'Helvetica-Bold',
    },
    // Section headers
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        color: colors.primary,
        marginBottom: 15,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 5,
    },
    subsectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: colors.text,
        marginBottom: 10,
        marginTop: 15,
    },
    // Text
    paragraph: {
        fontSize: 10,
        lineHeight: 1.6,
        marginBottom: 10,
        textAlign: 'justify',
    },
    // Tables
    table: {
        marginBottom: 15,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: colors.primary,
        padding: 8,
    },
    tableHeaderCell: {
        color: 'white',
        fontFamily: 'Helvetica-Bold',
        fontSize: 9,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        padding: 8,
    },
    tableRowAlt: {
        backgroundColor: colors.background,
    },
    tableCell: {
        fontSize: 9,
    },
    // Metrics
    metricsRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    metricBox: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.background,
        marginRight: 10,
        borderRadius: 4,
    },
    metricLabel: {
        fontSize: 9,
        color: colors.textMuted,
        marginBottom: 5,
    },
    metricValue: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: colors.primary,
    },
    metricValueGreen: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: colors.secondary,
    },
    // Footer
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 8,
        color: colors.textMuted,
        textAlign: 'center',
    },
    // Use case list
    useCaseList: {
        marginTop: 20,
    },
    useCaseItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    useCaseIcon: {
        width: 20,
    },
    useCaseLabel: {
        flex: 1,
    },
    // Disclaimer
    disclaimer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: colors.background,
        borderRadius: 4,
        fontSize: 8,
        color: colors.textMuted,
    },
});

// ============ HELPERS ============

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function formatPercent(value: number): string {
    return `${Math.round(value)}%`;
}

// formatValue is not currently used but kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatValue(value: number, type?: string): string {
    if (type === 'currency') return formatCurrency(value);
    if (type === 'percent') return formatPercent(value * 100);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const suffix = getTypeSuffix(type as any);
    return `${value}${suffix ? ' ' + suffix : ''}`;
}

function getUseCaseLabel(id: UseCaseId): string {
    return USE_CASE_OPTIONS.find((uc) => uc.id === id)?.label || id;
}

function getUseCaseDescription(id: UseCaseId): string {
    return USE_CASE_OPTIONS.find((uc) => uc.id === id)?.description || '';
}

function getUseCaseIcon(id: UseCaseId): string {
    return USE_CASE_OPTIONS.find((uc) => uc.id === id)?.icon || '•';
}

// Format use case inputs for display in PDF
interface ParameterDisplay {
    label: string;
    value: string;
}

function getUseCaseParameters(uc: UseCaseInputs): ParameterDisplay[] {
    const params: ParameterDisplay[] = [];

    switch (uc.id) {
        case 'assembly': {
            const p = uc.payload;
            params.push({ label: 'Assemblies per year', value: p.unitsPerYear.toLocaleString('de-DE') });
            params.push({ label: 'Current error rate', value: `${(p.errorRateBase * 100).toFixed(1)}%` });
            params.push({ label: 'Error rate with AR', value: `${(p.errorRateAr * 100).toFixed(1)}%` });
            params.push({ label: 'Cost per error', value: formatCurrency(p.costPerError) });
            if (p.trainingHoursBase !== undefined) {
                params.push({ label: 'Training hours (before)', value: `${p.trainingHoursBase}h` });
                params.push({ label: 'Training hours (with AR)', value: `${p.trainingHoursAr}h` });
            }
            break;
        }
        case 'changeover': {
            const p = uc.payload;
            params.push({ label: 'Changeovers per year', value: p.changeoversPerYear.toLocaleString('de-DE') });
            params.push({ label: 'Changeover time (before)', value: `${p.changeoverTimeBase} min` });
            params.push({ label: 'Changeover time (with AR)', value: `${p.changeoverTimeAr} min` });
            params.push({ label: 'Cost per minute', value: formatCurrency(p.costPerChangeoverMinute) });
            if (p.scrapCostBasePerChangeover !== undefined) {
                params.push({ label: 'Scrap cost (before)', value: formatCurrency(p.scrapCostBasePerChangeover) });
                params.push({ label: 'Scrap cost (with AR)', value: formatCurrency(p.scrapCostArPerChangeover || 0) });
            }
            break;
        }
        case 'maintenance': {
            const p = uc.payload;
            params.push({ label: 'Downtime hours/year', value: `${p.downtimeHoursBasePerYear}h` });
            params.push({ label: 'Downtime reduction', value: `${(p.downtimeReductionPct * 100).toFixed(0)}%` });
            params.push({ label: 'Cost per hour downtime', value: formatCurrency(p.costPerDowntimeHour) });
            if (p.emergencyVisitsPerYear !== undefined) {
                params.push({ label: 'Emergency visits/year', value: String(p.emergencyVisitsPerYear) });
                params.push({ label: 'Cost per visit', value: formatCurrency(p.costPerVisit || 0) });
                params.push({ label: 'Visit reduction', value: `${((p.visitReductionPct || 0) * 100).toFixed(0)}%` });
            }
            break;
        }
        case 'fault_recovery': {
            const p = uc.payload;
            params.push({ label: 'Incidents per year', value: String(p.incidentsPerYear) });
            params.push({ label: 'MTTR (before)', value: `${p.mttrBase}h` });
            params.push({ label: 'MTTR (with AR)', value: `${p.mttrAr}h` });
            params.push({ label: 'Cost per hour downtime', value: formatCurrency(p.costPerDowntimeHour) });
            if (p.onsiteVisitsPerYear !== undefined) {
                params.push({ label: 'On-site visits/year', value: String(p.onsiteVisitsPerYear) });
                params.push({ label: 'Cost per visit', value: formatCurrency(p.costPerVisit || 0) });
                params.push({ label: 'Visit reduction', value: `${((p.visitReductionPct || 0) * 100).toFixed(0)}%` });
            }
            break;
        }
        case 'training': {
            const p = uc.payload;
            params.push({ label: 'New operators/year', value: String(p.newOperatorsPerYear) });
            params.push({ label: 'Training hours (before)', value: `${p.trainingHoursBase}h` });
            params.push({ label: 'Training hours (with AR)', value: `${p.trainingHoursAr}h` });
            params.push({ label: 'Operator hourly rate', value: formatCurrency(p.operatorRate) });
            params.push({ label: 'Trainer hourly rate', value: formatCurrency(p.trainerRate) });
            if (p.scrapDuringLearningBase !== undefined) {
                params.push({ label: 'Scrap during learning (before)', value: formatCurrency(p.scrapDuringLearningBase) });
                params.push({ label: 'Scrap during learning (with AR)', value: formatCurrency(p.scrapDuringLearningAr || 0) });
            }
            break;
        }
    }

    return params;
}

// ============ COMPONENTS ============

interface RoiReportProps {
    data: RoiReportData;
}

export function RoiReport({ data }: RoiReportProps) {
    const { requester, scenarioInputs, scenarioResult, selectedUseCases, generatedAt } = data;

    return (
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={styles.coverPage}>
                <Text style={styles.coverTitle}>AR-Guided SOP ROI Report</Text>
                <Text style={styles.coverSubtitle}>
                    Business case for AR-guided work instructions and remote support
                </Text>

                <View style={styles.coverInfo}>
                    <View style={styles.coverInfoRow}>
                        <Text style={styles.coverInfoLabel}>Company:</Text>
                        <Text style={styles.coverInfoValue}>{requester.companyName}</Text>
                    </View>
                    {requester.siteName && (
                        <View style={styles.coverInfoRow}>
                            <Text style={styles.coverInfoLabel}>Site:</Text>
                            <Text style={styles.coverInfoValue}>{requester.siteName}</Text>
                        </View>
                    )}
                    <View style={styles.coverInfoRow}>
                        <Text style={styles.coverInfoLabel}>Contact:</Text>
                        <Text style={styles.coverInfoValue}>
                            {requester.contactName}
                            {requester.role ? `, ${requester.role}` : ''}
                        </Text>
                    </View>
                    {requester.country && (
                        <View style={styles.coverInfoRow}>
                            <Text style={styles.coverInfoLabel}>Country:</Text>
                            <Text style={styles.coverInfoValue}>{requester.country}</Text>
                        </View>
                    )}
                    <View style={styles.coverInfoRow}>
                        <Text style={styles.coverInfoLabel}>Report Date:</Text>
                        <Text style={styles.coverInfoValue}>
                            {generatedAt.toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                </View>

                <View style={styles.useCaseList}>
                    <Text style={{ fontSize: 11, marginBottom: 10, fontFamily: 'Helvetica-Bold' }}>
                        Use Cases Analyzed:
                    </Text>
                    {selectedUseCases.map((ucId) => {
                        const option = USE_CASE_OPTIONS.find((uc) => uc.id === ucId);
                        return (
                            <View key={ucId} style={styles.useCaseItem}>
                                <Text style={styles.useCaseIcon}>{option?.icon || '•'}</Text>
                                <Text style={styles.useCaseLabel}>{option?.label || ucId}</Text>
                            </View>
                        );
                    })}
                </View>

                <Text style={styles.footer}>Prepared by ActARion | www.actarion.com</Text>
            </Page>

            {/* Section 1: About the Requester */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>1. About the Requester</Text>
                <Text style={styles.paragraph}>
                    This ROI assessment was prepared for {requester.companyName}
                    {requester.siteName ? ` (${requester.siteName})` : ''}.
                    {requester.notes
                        ? ` The scope of this analysis focuses on: ${requester.notes}.`
                        : ` The analysis covers ${selectedUseCases.length} AR use case${selectedUseCases.length > 1 ? 's' : ''}: ${selectedUseCases.map(getUseCaseLabel).join(', ')}.`}
                </Text>
                <Text style={styles.paragraph}>
                    The input data was provided by {requester.contactName}
                    {requester.role ? ` (${requester.role})` : ''}
                    {requester.country ? ` from ${requester.country}` : ''}.
                </Text>

                {/* Section 2: Future of Work */}
                <Text style={styles.sectionTitle}>2. Why Invest in the Future of Work</Text>
                {FUTURE_OF_WORK_SECTION.trim()
                    .split('\n\n')
                    .map((para, i) => (
                        <Text key={i} style={styles.paragraph}>
                            {para.trim()}
                        </Text>
                    ))}

                <Text style={styles.footer}>ActARion ROI Report | Page 2</Text>
            </Page>

            {/* Section 3: ROI Model Definitions */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>3. ROI Model – Assumptions and Inputs</Text>

                {/* Global/Financial inputs */}
                <Text style={styles.subsectionTitle}>Financial Parameters</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Field</Text>
                        <Text style={[styles.tableHeaderCell, { width: '50%' }]}>Description</Text>
                        <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Value</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Business case horizon</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Number of years for ROI projection</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{scenarioInputs.global.horizonYears} years</Text>
                    </View>
                    <View style={[styles.tableRow, styles.tableRowAlt]}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Discount rate</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Annual rate for NPV calculation</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatPercent(scenarioInputs.global.discountRate * 100)}</Text>
                    </View>
                </View>

                {/* Cost inputs */}
                <Text style={styles.subsectionTitle}>Investment</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Field</Text>
                        <Text style={[styles.tableHeaderCell, { width: '50%' }]}>Description</Text>
                        <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Value</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>One-time implementation</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Initial setup and content creation</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(scenarioInputs.costs.oneTimeCost)}</Text>
                    </View>
                    <View style={[styles.tableRow, styles.tableRowAlt]}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Annual software cost</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Licensing and platform fees</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(scenarioInputs.costs.annualSoftwareCost)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Annual hardware cost</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Device amortization</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(scenarioInputs.costs.annualHardwareCost)}</Text>
                    </View>
                    <View style={[styles.tableRow, styles.tableRowAlt]}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Annual OPEX</Text>
                        <Text style={[styles.tableCell, { width: '50%' }]}>Content maintenance and internal PM</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(scenarioInputs.costs.annualOpexCost)}</Text>
                    </View>
                </View>

                <Text style={styles.footer}>ActARion ROI Report | Page 3</Text>
            </Page>

            {/* Section 4: Use Case Details */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>4. Use Case Details</Text>
                <Text style={styles.paragraph}>
                    The following section provides a detailed breakdown of each selected use case, including the input parameters used for calculation and the resulting annual benefits.
                </Text>

                {scenarioInputs.useCases.map((uc) => {
                    const ucResult = scenarioResult.useCases.find((r) => r.id === uc.id);
                    const params = getUseCaseParameters(uc);

                    return (
                        <View key={uc.id} style={{ marginBottom: 20 }} wrap={false}>
                            {/* Use case header */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Text style={{ fontSize: 14, marginRight: 8 }}>{getUseCaseIcon(uc.id)}</Text>
                                <Text style={[styles.subsectionTitle, { marginTop: 0, marginBottom: 0 }]}>
                                    {getUseCaseLabel(uc.id)}
                                </Text>
                            </View>

                            {/* Description */}
                            <Text style={[styles.paragraph, { fontSize: 9, fontStyle: 'italic', marginBottom: 8 }]}>
                                {getUseCaseDescription(uc.id)}
                            </Text>

                            {/* Parameters table */}
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <Text style={[styles.tableHeaderCell, { width: '60%' }]}>Parameter</Text>
                                    <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Value</Text>
                                </View>
                                {params.map((param, i) => (
                                    <View key={param.label} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                                        <Text style={[styles.tableCell, { width: '60%' }]}>{param.label}</Text>
                                        <Text style={[styles.tableCell, { width: '40%' }]}>{param.value}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Results for this use case */}
                            {ucResult && (
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <View style={[styles.metricBox, { padding: 10, flex: 1 }]}>
                                        <Text style={[styles.metricLabel, { fontSize: 8 }]}>Annual Benefit</Text>
                                        <Text style={[styles.metricValueGreen, { fontSize: 14 }]}>
                                            {formatCurrency(ucResult.benefits.totalAnnual)}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 2, marginLeft: 10, padding: 10, backgroundColor: colors.background, borderRadius: 4 }}>
                                        <Text style={[styles.metricLabel, { fontSize: 8, marginBottom: 5 }]}>Benefit Breakdown</Text>
                                        {(['training', 'quality', 'downtime', 'travel'] as const).map((driver) => {
                                            const value = ucResult.benefits.annual[driver];
                                            if (value === 0) return null;
                                            const labels: Record<string, string> = {
                                                training: 'Training',
                                                quality: 'Quality',
                                                downtime: 'Downtime',
                                                travel: 'Travel',
                                            };
                                            return (
                                                <Text key={driver} style={{ fontSize: 8, marginBottom: 2 }}>
                                                    • {labels[driver]}: {formatCurrency(value)}
                                                </Text>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}

                <Text style={styles.footer}>ActARion ROI Report | Page 4</Text>
            </Page>

            {/* Section 5: Summary */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>5. Summary of Costs, Benefits and ROI</Text>

                {/* Key metrics */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>Estimated Annual Savings</Text>
                        <Text style={styles.metricValueGreen}>
                            {formatCurrency(scenarioResult.aggregated.totalAnnual)}
                        </Text>
                    </View>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>Payback Period</Text>
                        <Text style={styles.metricValue}>
                            {scenarioResult.paybackMonths ? `~${scenarioResult.paybackMonths} months` : 'N/A'}
                        </Text>
                    </View>
                    <View style={[styles.metricBox, { marginRight: 0 }]}>
                        <Text style={styles.metricLabel}>{scenarioInputs.global.horizonYears}-Year ROI</Text>
                        <Text style={styles.metricValue}>{formatPercent(scenarioResult.roiHorizon)}</Text>
                    </View>
                </View>

                <View style={styles.metricsRow}>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>Net Present Value (NPV)</Text>
                        <Text style={styles.metricValue}>{formatCurrency(scenarioResult.npv)}</Text>
                    </View>
                    <View style={styles.metricBox}>
                        <Text style={styles.metricLabel}>Total One-time Investment</Text>
                        <Text style={styles.metricValue}>{formatCurrency(scenarioResult.oneTimeCosts)}</Text>
                    </View>
                    <View style={[styles.metricBox, { marginRight: 0 }]}>
                        <Text style={styles.metricLabel}>Annual Costs</Text>
                        <Text style={styles.metricValue}>{formatCurrency(scenarioResult.annualCosts)}</Text>
                    </View>
                </View>

                {/* Benefits by driver */}
                <Text style={styles.subsectionTitle}>Benefits by Driver (Annual)</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '60%' }]}>Benefit Driver</Text>
                        <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Annual Benefit</Text>
                    </View>
                    {(['training', 'quality', 'downtime', 'travel', 'throughput'] as const).map((driver, i) => {
                        const value = scenarioResult.aggregated.annual[driver];
                        if (value === 0) return null;
                        const labels: Record<string, string> = {
                            training: 'Training & Onboarding',
                            quality: 'Fewer Errors & Scrap',
                            downtime: 'Less Downtime',
                            travel: 'Fewer On-site Visits',
                            throughput: 'Increased Throughput',
                        };
                        return (
                            <View key={driver} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                                <Text style={[styles.tableCell, { width: '60%' }]}>{labels[driver]}</Text>
                                <Text style={[styles.tableCell, { width: '40%', color: colors.secondary }]}>
                                    {formatCurrency(value)}
                                </Text>
                            </View>
                        );
                    })}
                    <View style={[styles.tableRow, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.tableCell, { width: '60%', color: 'white', fontFamily: 'Helvetica-Bold' }]}>
                            Total Annual Savings
                        </Text>
                        <Text style={[styles.tableCell, { width: '40%', color: 'white', fontFamily: 'Helvetica-Bold' }]}>
                            {formatCurrency(scenarioResult.aggregated.totalAnnual)}
                        </Text>
                    </View>
                </View>

                {/* Benefits by use case */}
                <Text style={styles.subsectionTitle}>Benefits by Use Case (Annual)</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '60%' }]}>Use Case</Text>
                        <Text style={[styles.tableHeaderCell, { width: '40%' }]}>Annual Benefit</Text>
                    </View>
                    {scenarioResult.useCases.map((uc, i) => (
                        <View key={uc.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                            <Text style={[styles.tableCell, { width: '60%' }]}>{uc.label}</Text>
                            <Text style={[styles.tableCell, { width: '40%', color: colors.secondary }]}>
                                {formatCurrency(uc.benefits.totalAnnual)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Cumulative cashflow */}
                <Text style={styles.subsectionTitle}>Cumulative Cashflow</Text>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Year</Text>
                        <Text style={[styles.tableHeaderCell, { width: '35%' }]}>Net Cashflow</Text>
                        <Text style={[styles.tableHeaderCell, { width: '35%' }]}>Cumulative</Text>
                    </View>
                    {scenarioResult.cashflows.map((cf, i) => (
                        <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                            <Text style={[styles.tableCell, { width: '30%' }]}>Year {i}</Text>
                            <Text style={[styles.tableCell, { width: '35%' }]}>{formatCurrency(cf)}</Text>
                            <Text
                                style={[
                                    styles.tableCell,
                                    { width: '35%', color: scenarioResult.cumulativeCashflows[i] >= 0 ? colors.secondary : '#ef4444' },
                                ]}
                            >
                                {formatCurrency(scenarioResult.cumulativeCashflows[i])}
                            </Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.footer}>ActARion ROI Report | Page 5</Text>
            </Page>

            {/* Section 5: Next Steps */}
            <Page size="A4" style={styles.page}>
                <Text style={styles.sectionTitle}>6. Next Steps</Text>
                {NEXT_STEPS_SECTION.trim()
                    .split('\n\n')
                    .map((para, i) => (
                        <Text key={i} style={styles.paragraph}>
                            {para.trim()}
                        </Text>
                    ))}
                <Text style={[styles.paragraph, { fontFamily: 'Helvetica-Bold', color: colors.primary }]}>
                    {CONTACT_INFO.trim()}
                </Text>

                {/* Disclaimer */}
                <View style={styles.disclaimer}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 5 }}>Disclaimer</Text>
                    <Text>{DISCLAIMER}</Text>
                </View>

                <Text style={styles.footer}>ActARion ROI Report | Page 6</Text>
            </Page>
        </Document>
    );
}
