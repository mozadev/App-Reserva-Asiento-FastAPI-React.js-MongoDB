import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FiltersProvider } from './context/filters.jsx'
import './index.css'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-0mN/ZqoE+d1haMkP3a1Yv2e5lKXRNiAA3ekqD3jCT1AbCegQwAJZ2lMpvRSR2fuyI1+3VZo8uy5+PdOqb5B4LXRw==" crossorigin="anonymous" />


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <FiltersProvider>
    <App />
  </FiltersProvider>,
  // </React.StrictMode>,
)
