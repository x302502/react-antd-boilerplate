import { TanstackQuery } from '~/components';
import { setupI18n } from '~/locales';
import { setupLoading } from '~/plugins';

// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import App from './app';
import './styles/index.css';

async function setupApp() {
  /**
   * @zh Initialize internationalization, must be placed first, as loading references internationalization
   * @en Initialize internationalization, must be placed first, as loading references internationalization
   */
  setupI18n();

  // App Loading
  setupLoading();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    return;
  }
  const root = createRoot(rootElement);

  root.render(
    // <StrictMode>
    <TanstackQuery>
      <App />
    </TanstackQuery>,
    // </StrictMode>,
  );
}

setupApp();
