# ActARion ROI Calculator

A Next.js-based ROI calculator for AR-guided work instructions, helping organizations estimate savings from implementing ActARion's AR SOP platform.

## Features

- **Quick ROI Snapshot**: Fast estimation based on key operational parameters
- **Detailed Calculator**: Use-case specific analysis for assembly, changeovers, maintenance, fault recovery, and training
- **PDF Report Generation**: Comprehensive business case document with detailed breakdowns
- **Lead Capture**: Integration with database for lead management

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

## Deployment on Vercel

This project is configured for Vercel deployment as a separate project within the ActARion monorepo.

### Integration with ActARion.com

The ROI calculator is integrated into the main ActARion website via Vercel rewrites:
- Users access it at: `https://www.actarion.com/roi-calculator`
- The calculator is deployed as a separate Vercel project
- The main website proxies `/roi-calculator` requests to this deployment

### vercel.json Configuration

- **Region**: `fra1` (Frankfurt) for optimal EU performance
- **Framework**: Next.js auto-detection
- **Build Command**: `npm run build`

### Required Environment Variables

For the lead capture and database features, configure these secrets in your Vercel project:

| Variable | Description |
|----------|-------------|
| `DATABASE_HOST` | PlanetScale or MySQL database host |
| `DATABASE_USERNAME` | Database username |
| `DATABASE_PASSWORD` | Database password |

### Deployment Steps

1. Create a **new Vercel project** for the ROI calculator:
   - Connect your repository to Vercel
   - Set the **Root Directory** to `roi-calculator`
   - Vercel will automatically detect Next.js
   - Note the deployment URL (e.g., `actarion-roi-calculator.vercel.app`)

2. Update the main website's `vercel.json` rewrites:
   - Set the rewrite destination to your Vercel deployment URL

3. Add the required environment variables in Vercel project settings

4. Deploy both projects - The main ActARion website will proxy requests from `/roi-calculator` to the ROI calculator deployment

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/             # API routes (leads, PDF generation)
│   ├── calculator/      # Detailed calculator page
│   └── page.tsx         # Quick snapshot calculator
├── components/          # React components
│   ├── roi-calculator/  # Calculator-specific components
│   └── SiteHeader.tsx   # Site navigation header
└── lib/                 # Business logic and utilities
    └── roi/            # ROI calculation engine and PDF generation
```

## Branding

The application uses ActARion's brand colors:

- **Primary**: Cyan/Teal (`#0891b2`)
- **Background**: Dark blue (`#0a1929`)
- **Accent**: Light cyan (`#22d3ee`)

## License

Proprietary - ActARion
