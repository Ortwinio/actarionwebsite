import { NextRequest, NextResponse } from 'next/server';

// Lead storage interface
interface LeadData {
    lead: {
        name: string;
        company: string;
        email: string;
        country: string;
        timeline?: string;
        process_description?: string;
    };
    inputs: Record<string, unknown>;
    results: {
        benefits: {
            total_annual_benefits: number;
            training_savings: number;
            quality_savings: number;
            downtime_savings: number;
            remote_savings: number;
        };
        costs: {
            total_annual_costs: number;
            one_time_costs: number;
        };
        payback_months: number;
        roi_3y_percent: number;
        npv: number;
    };
}

// Calculate savings band for CRM tagging
function getSavingsBand(annualSavings: number): string {
    if (annualSavings >= 250000) return 'high_250k_plus';
    if (annualSavings >= 100000) return 'medium_100k_250k';
    if (annualSavings >= 50000) return 'low_50k_100k';
    return 'minimal_under_50k';
}

// Determine main benefit driver
function getMainDriver(benefits: LeadData['results']['benefits']): string {
    const drivers = [
        { name: 'training', value: benefits.training_savings },
        { name: 'quality', value: benefits.quality_savings },
        { name: 'downtime', value: benefits.downtime_savings },
        { name: 'remote_support', value: benefits.remote_savings },
    ];
    return drivers.reduce((max, d) => d.value > max.value ? d : max, drivers[0]).name;
}

export async function POST(request: NextRequest) {
    try {
        const data: LeadData = await request.json();

        // Validate required fields
        if (!data.lead?.email || !data.lead?.name || !data.lead?.company) {
            return NextResponse.json(
                { error: 'Missing required lead information' },
                { status: 400 }
            );
        }

        // Enrich data with calculated tags for CRM
        const enrichedLead = {
            ...data.lead,
            savings_band: getSavingsBand(data.results.benefits.total_annual_benefits),
            main_driver: getMainDriver(data.results.benefits),
            estimated_annual_savings: Math.round(data.results.benefits.total_annual_benefits),
            estimated_roi_3y: Math.round(data.results.roi_3y_percent),
            payback_months: data.results.payback_months,
            submitted_at: new Date().toISOString(),
        };

        // Store in PlanetScale (when configured)
        // For now, we'll log the data - in production, this connects to PlanetScale
        console.log('Lead submitted:', {
            lead: enrichedLead,
            inputs_summary: {
                operators: (data.inputs as { workforce?: { N_op?: number } })?.workforce?.N_op,
                sites: (data.inputs as { costs?: { N_sites?: number } })?.costs?.N_sites,
            },
        });

        // TODO: Uncomment when PlanetScale is configured
        // const connection = connect({
        //   host: process.env.DATABASE_HOST,
        //   username: process.env.DATABASE_USERNAME,
        //   password: process.env.DATABASE_PASSWORD,
        // });
        // 
        // await connection.execute(
        //   `INSERT INTO leads (name, email, company, country, timeline, process_description, 
        //     savings_band, main_driver, annual_savings, roi_3y, payback_months, inputs_json, results_json)
        //    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        //   [
        //     enrichedLead.name,
        //     enrichedLead.email,
        //     enrichedLead.company,
        //     enrichedLead.country,
        //     enrichedLead.timeline || null,
        //     enrichedLead.process_description || null,
        //     enrichedLead.savings_band,
        //     enrichedLead.main_driver,
        //     enrichedLead.estimated_annual_savings,
        //     enrichedLead.estimated_roi_3y,
        //     enrichedLead.payback_months,
        //     JSON.stringify(data.inputs),
        //     JSON.stringify(data.results),
        //   ]
        // );

        return NextResponse.json({
            success: true,
            message: 'Lead submitted successfully',
            lead_id: `lead_${Date.now()}`,
        });

    } catch (error) {
        console.error('Error processing lead:', error);
        return NextResponse.json(
            { error: 'Failed to process lead' },
            { status: 500 }
        );
    }
}

// Database schema for reference (run this in PlanetScale):
/*
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  timeline VARCHAR(50),
  process_description TEXT,
  savings_band VARCHAR(50),
  main_driver VARCHAR(50),
  annual_savings INT,
  roi_3y INT,
  payback_months INT,
  inputs_json JSON,
  results_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
