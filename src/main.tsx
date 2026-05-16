import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GoogleAnalytics } from './lib/analytics';
import { LanguageProvider } from './lib/i18n.tsx';
import { CartProvider } from './lib/cart.tsx';
import { AuthProvider } from './lib/auth.tsx';
import { ProductProvider } from './lib/products.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <LanguageProvider>
                <App />
              </LanguageProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
