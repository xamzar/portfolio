import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens.css'
import './layout.css'
import './typography.css'
import './components.css'
import { LanguageProvider } from './i18n/context'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
