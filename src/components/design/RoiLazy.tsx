'use client';

/**
 * Lazy chunks for the ROI calculator (design v2). Only pages that render these load the JS.
 * Still server-side rendered (ssr default), so the HTML with default results is complete for crawlers.
 */
import dynamic from 'next/dynamic';

export const RoiCalculatorLazy = dynamic(() => import('./RoiCalculator').then((m) => m.RoiCalculatorDesign));
export const RoiReportLazy = dynamic(() => import('./RoiReport').then((m) => m.RoiReportClient));
