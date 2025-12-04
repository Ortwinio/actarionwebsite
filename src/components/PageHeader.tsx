/**
 * Re-export PageHeader from its new location in layout/
 * This file is kept for backwards compatibility with existing imports.
 * 
 * Prefer importing from: @/components/layout/PageHeader
 */
export { default as PageHeader } from "./layout/PageHeader";
export { PageHeader as default } from "./layout/PageHeader";
export { ALL_HEADER_IMAGES, getRandomHeaderImage } from "@/lib/headerImages";
