import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function ContactLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'contact'));
}