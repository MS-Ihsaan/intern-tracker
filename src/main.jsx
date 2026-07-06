import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApplicationsProvider } from "./context/ApplicationsContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationsProvider>
      <App />
    </ApplicationsProvider>
  </StrictMode>,
)
