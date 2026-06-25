import { redirect } from '@/i18n/navigation';

export default function LocaleRootPage() {
  redirect({ href: '/1', locale: 'en' });
}
