import { proveedores } from '../../data/mockData';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

const riesgoColor = { bajo: 'var(--color-success)', medio: 'var(--color-warning)', alto: 'var(--color-danger)' };
const riesgoClass = { bajo: 'status-aprobado', medio: 'status-pendiente', alto: 'status-riesgo' };
const riesgoLabel = { bajo: 'BAJO', medio: 'MEDIO', alto: 'ALTO' };

export default function ScoringProveedores() {
  const alertas = proveedores.filter(p => p.alerta);

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CRM</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">SCORING PROVEEDORES</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Scoring de Proveedores</h1>
          <p className="page-subtitle">Evalúa el impacto de cada suplidor en tu liquidez. Si un proveedor exige pagos que desangran la caja, el CRM te alerta para renegociar.</p>
        </div>
      </div>

      {alertas.length > 0 && (
        <div className="alert alert-warning">
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          <div className="alert-text">
            <strong>{alertas.length} proveedor(es) requieren renegociación de términos</strong>
            {alertas.map(a => a.nombre).join(' y ')} presentan condiciones que presionan tu liquidez operativa.
          </div>
        </div>
      )}

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Score</th>
              <th>Riesgo</th>
              <th>Plazo de Pago</th>
              <th>Total Compras</th>
              <th>Frecuencia</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.sort((a, b) => a.score - b.score).map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="table-company-cell">
                    <div className="company-avatar" style={{ borderRadius: 6 }}>{p.nombre.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{p.nombre}</div>
                      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{p.rnc}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60 }}>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${p.score}%`,
                            background: riesgoColor[p.riesgo],
                          }}
                        />
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: riesgoColor[p.riesgo], fontFamily: 'var(--font-mono)' }}>{p.score}</span>
                  </div>
                </td>
                <td><span className={`status-badge ${riesgoClass[p.riesgo]}`}>{riesgoLabel[p.riesgo]}</span></td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{p.plazo}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmt(p.totalCompras)}</td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{p.frecuencia}</td>
                <td>
                  {p.alerta
                    ? <button className="btn btn-outline btn-sm" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>Renegociar</button>
                    : <CheckCircle size={16} color="var(--color-success)" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
