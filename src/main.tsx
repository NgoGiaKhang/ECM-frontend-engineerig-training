import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { enableMocking } from './mocks/index.ts'
import ScrollToTop from './components/ScrollToTop.tsx'

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HashRouter>
        <ScrollToTop />
        <App />
      </HashRouter>
    </StrictMode>
  )
})