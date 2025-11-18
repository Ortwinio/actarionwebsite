import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function AboutLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'about'));
}