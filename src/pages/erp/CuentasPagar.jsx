import { cuentasPagar } from '../../data/mockData';
import { AlertTriangle } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

const estadoClass = { pendiente: 'status-pendiente', vencido: 'status-riesgo', pagado: 'status-aprobado' };
const estadoLabel = { pendiente: 'PENDIENTE', vencido: 'VENCIDO', pagado: 'PAGADO' };

export default function CuentasPagar() {
  const vencidas = cuentasPagar.filter(c => c.estado === 'vencido');
  const totalPendiente = cuentasPagar.filter(c => c.estado === 'pendiente').reduce((s, c) => s + c.monto, 0);

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>ERP</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">CUENTAS POR PAGAR</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cuentas por Pagar — Formato 606</h1>
          <p className="page-subtitle">NCF de compras y gastos. Presión de deuda a corto plazo calculada automáticamente.</p>
        </div>
      </div>

      {vencidas.length > 0 && (
        <div className="alert alert-danger">
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <div className="alert-text">
            <strong>{vencidas.length} factura(s) vencida(s)</strong>
            {vencidas.map(v => v.proveedor).join(', ')} — Riesgo de recargos. Acción requerida.
          </div>
        </div>
      )}

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-label">Total Pendiente</div>
          <div className="kpi-value" style={{ fontSize: 20 }}>{fmt(totalPendiente)}</div>
          <div className="kpi-meta">Próximos 30 días</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Facturas Activas</div>
          <div className="kpi-value" style={{ fontSize: 20 }}>{cuentasPagar.filter(c=>c.estado!=='pagado').length}</div>
          <div className="kpi-meta">de {cuentasPagar.length} registros</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Vencidas</div>
          <div className="kpi-value" style={{ fontSize: 20, color: 'var(--color-danger)' }}>{vencidas.length}</div>
          <div className="kpi-meta" style={{ color: 'var(--color-danger)' }}>Requieren atención inmediata</div>
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NCF</th>
              <th>Proveedor</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>ITBIS</th>
              <th>Vencimiento</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cuentasPagar.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{c.ncf}</td>
                <td>
                  <div className="table-company-cell">
                    <div className="company-avatar" style={{ borderRadius: 6 }}>{c.proveedor.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.proveedor}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>RNC: {c.rnc}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{c.tipo}</td>
                <td style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{fmt(c.monto)}</td>
                <td style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>{fmt(c.itbis)}</td>
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
