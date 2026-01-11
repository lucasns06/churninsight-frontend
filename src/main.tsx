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
import PrevisaoLote from './pages/PrevisaoLote';
import MainLayout from './components/layout/MainLayout';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route element={<MainLayout />}>
          <Route path="/membros" element={<Membros />} />
          <Route path="/previsao" element={<Previsao />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/previsao-lote" element={<PrevisaoLote />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
