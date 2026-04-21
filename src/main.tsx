import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './lib/i18n.tsx';
import { CartProvider } from './lib/cart.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CartProvider>
  </StrictMode>,
);
