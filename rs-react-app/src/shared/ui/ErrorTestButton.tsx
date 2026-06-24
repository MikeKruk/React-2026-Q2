import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ErrorTestButton() {
  const t = useTranslations('home');
  const [crash, setCrash] = useState(false);

  if (crash) throw new Error('Test error');

  const handelClick = () => {
    setCrash(true);
  }
  return (
    <button
      className="    
    w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
    border border-gray-500"
      onClick={handelClick}
    >
      {t('throwError')}
    </button>
  );
}
