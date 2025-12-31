import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Membros from './pages/Membros';
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Previsao from './pages/Previsao';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/membros" element={<><Navbar /><Membros /><Footer /></>} />
        <Route path="/previsao" element={<><Navbar /><Previsao /><Footer /></>} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /><Footer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
