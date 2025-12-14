import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { RoiReport } from '@/lib/roi/pdf/RoiReport';
import { RoiReportRequest, RoiReportData } from '@/lib/roi/pdf/types';
import { calculateScenario } from '@/lib/roi/scenario';
import React from 'react';

export async function POST(request: NextRequest) {
    try {
        const body: RoiReportRequest = await request.json();
        const { requester, scenarioInputs, selectedUseCases } = body;

        // Validate required fields
        if (!requester?.companyName || !requester?.contactName || !requester?.email) {
            return NextResponse.json(
                { error: 'Missing required requester fields: companyName, contactName, email' },
                { status: 400 }
            );
        }

        if (!scenarioInputs?.useCases || scenarioInputs.useCases.length === 0) {
            return NextResponse.json(
                { error: 'At least one use case must be selected' },
                { status: 400 }
            );
        }

        // Recompute scenario result server-side for trust
        const scenarioResult = calculateScenario(scenarioInputs);

        // Build report data
        const reportData: RoiReportData = {
            requester,
            scenarioInputs,
            scenarioResult,
            selectedUseCases,
            generatedAt: new Date(),
        };

        // Render PDF - use type assertion to satisfy react-pdf's strict typing
        const pdfBuffer = await renderToBuffer(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.createElement(RoiReport, { data: reportData }) as any
        );

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const pdfBytes = new Uint8Array(pdfBuffer);

        // Return PDF as download
        return new NextResponse(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="actarion-roi-report-${requester.companyName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
