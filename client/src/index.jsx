import React from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
