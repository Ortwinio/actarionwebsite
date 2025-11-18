import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function DemoLegacyPage() {
  redirect(buildLocalizedPath(defaultLocale, 'demo'));
}