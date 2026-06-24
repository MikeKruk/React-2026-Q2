'use server';

import { redirect } from '@/i18n/navigation';
import { BASE_URL_API } from '@/shared/constants/constants';
import { getLocale } from 'next-intl/server';

export async function searchPokemon(formData: FormData) {
  const term = formData.get('search') as string;
  const locale = await getLocale();

  if (!term?.trim())
    redirect({
      href: `/`,
      locale,
    });

  const response = await fetch(`${BASE_URL_API}pokemon/${term}`);
  if (!response.ok) throw new Error(`Failed to get pokemon ${term}`);
  
  const pokemon = await response.json();

  redirect({
    href: `/1/${pokemon.id}`,
    locale: locale,
  });
}
