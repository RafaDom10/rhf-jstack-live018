import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/ui/styles/index.css'
import { App } from './App.tsx'
import { ThemeProvider } from './app/contexts/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark'>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
