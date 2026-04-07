import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlankThemePage from './pages/BlankThemePage.jsx'
import OrganizersPage from './pages/OrganizersPage.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/event" element={<Navigate to="/#event" replace />} />
        <Route path="/segments" element={<Navigate to="/#segment" replace />} />
        <Route path="/organizers" element={<OrganizersPage />} />
        <Route path="/volunteers" element={<BlankThemePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
