import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { initTheme } from '@/lib/theme'
import { HelmetProvider } from 'react-helmet-async';
import './i18n';

initTheme()

function Root() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>

  );
}

createRoot(document.getElementById("root")!).render(<Root />);