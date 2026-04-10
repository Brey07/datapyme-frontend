import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Overview from './pages/Overview';
import UploadDGII from './pages/cms/UploadDGII';
import EntradaManual from './pages/cms/EntradaManual';
import ChatbotFinanciero from './pages/cms/ChatbotFinanciero';
import PasaporteFinanciero from './pages/cms/PasaporteFinanciero';

// ERP
import ERPDashboard from './pages/erp/ERPDashboard';
import CuentasPagar from './pages/erp/CuentasPagar';
import CuentasCobrar from './pages/erp/CuentasCobrar';
import KPIsDuros from './pages/erp/KPIsDuros';

// CRM
import PipelineCobranza from './pages/crm/PipelineCobranza';
import ScoringProveedores from './pages/crm/ScoringProveedores';
import PreparacionCrediticia from './pages/crm/PreparacionCrediticia';

// n8n & AI & Config
import N8NDashboard from './pages/orchestrator/N8NDashboard';
import AIFinanciera from './pages/ai/AIFinanciera';
import PerfilEmpresarial from './pages/config/PerfilEmpresarial';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import MIPYMES from './pages/MIPYMES';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register onRegisterSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      ) : (
        <div className="app-shell">
          <Sidebar />
          <div className="main-content">
            <Header />
            <Routes>
              <Route path="/"                  element={<Overview />} />
              <Route path="/mipymes"           element={<MIPYMES />} />
              {/* CMS */}
              <Route path="/cms/upload"        element={<UploadDGII />} />
              <Route path="/cms/manual"        element={<EntradaManual />} />
              <Route path="/cms/chatbot"       element={<ChatbotFinanciero />} />
              <Route path="/cms/pasaporte"     element={<PasaporteFinanciero />} />
              {/* ERP */}
              <Route path="/erp"               element={<ERPDashboard />} />
              <Route path="/erp/pagar"         element={<CuentasPagar />} />
              <Route path="/erp/cobrar"        element={<CuentasCobrar />} />
              <Route path="/erp/kpis"          element={<KPIsDuros />} />
              {/* CRM */}
              <Route path="/crm/cobranza"      element={<PipelineCobranza />} />
              <Route path="/crm/proveedores"   element={<ScoringProveedores />} />
              <Route path="/crm/credito"       element={<PreparacionCrediticia />} />
              {/* Config & System */}
              <Route path="/perfil"            element={<PerfilEmpresarial />} />
              <Route path="/n8n"               element={<N8NDashboard />} />
              <Route path="/ai"                element={<AIFinanciera />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )}
    </Router>
  );
}
