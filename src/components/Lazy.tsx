'use client';

/**
 * Client-side dynamic imports: each interactive widget becomes its own chunk that is
 * only downloaded on pages that render it. Still server-side rendered (ssr: true),
 * so the HTML is complete for crawlers.
 */
import dynamic from 'next/dynamic';

export const RoiCalculator = dynamic(() => import('./RoiCalculator').then((m) => m.RoiCalculator));
export const FitCheck = dynamic(() => import('./FitCheck').then((m) => m.FitCheck));
export const ResourceSearch = dynamic(() => import('./ResourceSearch').then((m) => m.ResourceSearch));
