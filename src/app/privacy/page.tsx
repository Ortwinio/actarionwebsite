import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function PrivacyLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'privacy'));
}