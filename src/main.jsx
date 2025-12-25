import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Membros from './pages/Membros.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Previsao from './pages/Previsao.jsx';
import NotFound from './pages/NotFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/membros" element={<><Navbar /><Membros /><Footer /></>} />
        <Route path="/previsao" element={<><Navbar /><Previsao /><Footer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
