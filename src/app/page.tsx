import { redirect } from 'next/navigation';
import { buildLocalizedPath, defaultLocale } from '@/config/site';

export default function RootPage() {
  redirect(buildLocalizedPath(defaultLocale));
}
