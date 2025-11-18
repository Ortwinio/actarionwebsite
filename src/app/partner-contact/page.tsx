import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function PartnerContactLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'partner-contact'));
}