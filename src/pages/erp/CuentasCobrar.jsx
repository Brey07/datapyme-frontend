import { cuentasCobrar } from '../../data/mockData';
import { AlertTriangle } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

const estadoClass = { cobrado: 'status-aprobado', pendiente: 'status-pendiente', credito: 'status-revision' };
const estadoLabel = { cobrado: 'COBRADO', pendiente: 'PENDIENTE', credito: 'A CRÉDITO' };

export default function CuentasCobrar() {
  const efectivo = cuentasCobrar.filter(c => c.estado === 'cobrado').reduce((s,c) => s + c.monto, 0);
  const credito  = cuentasCobrar.filter(c => c.estado === 'credito').reduce((s,c) => s + c.monto, 0);
  const pendiente= cuentasCobrar.filter(c => c.estado === 'pendiente').reduce((s,c) => s + c.monto, 0);
  const riesgo   = credito / (efectivo + credito + pendiente);

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>ERP</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">CUENTAS POR COBRAR</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cuentas por Cobrar — Formato 607</h1>
          <p className="page-subtitle">Separación inteligente: efectivo real vs. facturas a crédito que pueden asfixiar la liquidez.</p>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <span className="kpi-card-badge badge-success">Efectivo</span>
          <div className="kpi-label">Cobrado — Efectivo Real</div>
          <div className="kpi-value" style={{ fontSize: 20, color: 'var(--color-success)' }}>{fmt(efectivo)}</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-card-badge badge-info">Crédito</span>
          <div className="kpi-label">Facturas a Crédito</div>
          <div className="kpi-value" style={{ fontSize: 20, color: 'var(--color-info)' }}>{fmt(credito)}</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-card-badge badge-warning">Exposición</span>
          <div className="kpi-label">Riesgo de Cash-Crunch</div>
          <div className="kpi-value" style={{ fontSize: 20, color: riesgo > 0.5 ? 'var(--color-danger)' : 'var(--color-warning)' }}>
            {(riesgo * 100).toFixed(0)}%
          </div>
          <div className="kpi-meta">{riesgo > 0.5 ? '⚠ Alto riesgo de liquidez' : 'Controlado'}</div>
        </div>
      </div>

      {riesgo > 0.5 && (
        <div className="alert alert-warning">
          <AlertTriangle size={16} />
          <div className="alert-text">
            <strong>Alerta de Cash-Crunch</strong>
            Más del 50% de tus ingresos están en facturas a crédito. Activa recordatorios de pago en el CRM.
          </div>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NCF</th><th>Cliente</th><th>Tipo</th><th>Monto</th><th>Vencimiento</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cuentasCobrar.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{c.ncf}</td>
                <td>
                  <div className="table-company-cell">
                    <div className="company-avatar">{c.cliente.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.cliente}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>RNC: {c.rnc}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{c.tipo}</td>
                <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmt(c.monto)}</td>
                <td style={{ fontSize: 12 }}>{c.vencimiento}</td>
                <td><span className={`status-badge ${estadoClass[c.estado]}`}>{estadoLabel[c.estado]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
