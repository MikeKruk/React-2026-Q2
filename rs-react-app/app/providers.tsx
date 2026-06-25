'use client';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
