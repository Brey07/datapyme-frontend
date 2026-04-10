import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, UploadCloud, MessageSquare, Award,
  BarChart3, CreditCard, FileSpreadsheet, TrendingUp,
  Users, Star, Landmark, Workflow, Brain, Database, FileText,
  Settings, ShieldCheck, ChevronRight
} from 'lucide-react';

const principalLinks = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview', path: '/' },
];

const cmsLinks = [
  { id: 'cms-upload', icon: UploadCloud, label: 'Carga DGII (606/607)', path: '/cms/upload' },
  { id: 'cms-manual', icon: Database, label: 'Entrada Manual (Física)', path: '/cms/manual' },
  { id: 'cms-chatbot', icon: MessageSquare, label: 'CFO Virtual (LLaMA)', path: '/cms/chatbot' },
  { id: 'cms-passport', icon: FileText, label: 'Pasaporte Financiero', path: '/cms/pasaporte' },
];

const erpLinks = [
  { id: 'erp-dashboard', icon: BarChart3, label: 'Dashboard ERP', path: '/erp' },
  { id: 'erp-payables', icon: CreditCard, label: 'Cuentas por Pagar', path: '/erp/pagar' },
  { id: 'erp-receivables', icon: FileSpreadsheet, label: 'Cuentas por Cobrar', path: '/erp/cobrar' },
  { id: 'erp-kpis', icon: TrendingUp, label: 'KPIs Duros', path: '/erp/kpis' },
];

const crmLinks = [
  { id: 'crm-collection', icon: Users, label: 'Pipeline Cobranza', path: '/crm/cobranza' },
  { id: 'crm-suppliers', icon: Star, label: 'Scoring Proveedores', path: '/crm/proveedores' },
  { id: 'crm-credit', icon: Landmark, label: 'Prep. Crediticia', path: '/crm/credito' },
];

const systemLinks = [
  { id: 'sys-n8n', icon: Workflow, label: 'Orquestador n8n', path: '/n8n' },
  { id: 'sys-ia', icon: Brain, label: 'IA Financiera', path: '/ia' },
];

const configLinks = [
  { id: 'perfil', icon: Settings, label: 'Perfil Empresarial', path: '/perfil' },
];

export default function Sidebar() {
  const location = useLocation();

  const renderLink = (item) => {
    const Icon = item.icon;
    const isActive = item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path);
    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
      >
        <Icon size={16} />
        <span style={{ flex: 1 }}>{item.label}</span>
        {isActive && <ChevronRight size={12} />}
      </NavLink>
    );
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <img src="/logo.svg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">DataPyme</span>
          <span className="sidebar-logo-sub">MIPYME Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Principal</div>
        {principalLinks.map(renderLink)}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">CMS — Portal</div>
        {cmsLinks.map(renderLink)}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">ERP — Contabilidad</div>
        {erpLinks.map(renderLink)}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">CRM — Riesgo</div>
        {crmLinks.map(renderLink)}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Sistema</div>
        {systemLinks.map(renderLink)}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-nav-item" style={{ cursor: 'default' }}>
          <div className="pulse-dot" />
          <span style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 600 }}>Sistema operativo</span>
        </div>
        <div className="sidebar-nav-item">
          <ShieldCheck size={16} />
          <span>Ley 172-13 RD</span>
        </div>

        <div className="sidebar-group">
          <div className="sidebar-group-title">CONFIGURACIÓN</div>
          {configLinks.map(renderLink)}
        </div>
      </div>
    </aside>
  );
}
