import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Settings, Search } from 'lucide-react';
import { empresaActual, kpisPrincipales } from '../../data/mockData';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Dashboard', path: '/' },
    { label: 'Evaluaciones', path: '/ai' },
    { label: 'Reportes', path: '/erp/kpis' },
    { label: 'MIPYMES', path: '/mipymes' }
  ];

  const ratio = kpisPrincipales.ratioCirculante;
  const healthColor = ratio >= 1.2 ? 'var(--color-success)' : ratio >= 1.05 ? 'var(--color-warning)' : 'var(--color-danger)';
  const healthLabel = ratio >= 1.2 ? 'Salud Óptima' : ratio >= 1.05 ? 'Salud Aceptable' : '⚠ Riesgo de Liquidez';

  return (
    <header className="topnav">
      {/* Health indicator pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '5px 12px',
        background: `${healthColor}18`,
        border: `1px solid ${healthColor}40`,
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: 600,
        color: healthColor,
        whiteSpace: 'nowrap',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: healthColor, display: 'inline-block' }} />
        {healthLabel} — RC: {ratio.toFixed(2)}
      </div>

      {/* Tabs */}
      <nav className="topnav-tabs">
        {tabs.map((tab) => (
          <span 
            key={tab.path}
            className={`topnav-tab ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
            style={{ cursor: 'pointer' }}
          >
            {tab.label}
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div className="topnav-actions">
        <div className="search-bar">
          <Search size={13} />
          <input placeholder="Buscar registros..." />
        </div>
        <button className="icon-btn"><Bell size={16} /></button>
        <button className="icon-btn"><Settings size={16} /></button>
        <div className="avatar" title={empresaActual.nombre}>
          {empresaActual.nombre.charAt(0)}
        </div>
      </div>
    </header>
  );
}
