import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function TermsLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'terms'));
}