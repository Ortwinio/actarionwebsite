import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function CareerLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'career'));
}