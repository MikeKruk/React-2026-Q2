import { createRoot } from 'react-dom/client';

import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import './index.css';
import { router } from './router';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
