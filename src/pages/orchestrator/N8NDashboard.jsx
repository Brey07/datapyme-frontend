import { n8nWorkflows } from '../../data/mockData';
import { Play, Pause, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

export default function N8NDashboard() {
  const activos = n8nWorkflows.filter(w => w.estado === 'activo').length;
  const errores = n8nWorkflows.filter(w => w.estado === 'error').length;

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>SISTEMA</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">ORQUESTADOR N8N</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Orquestador n8n</h1>
          <p className="page-subtitle">Capa de automatización que conecta DGII, ERP, CRM y la IA. Procesa datos sin intervención humana, reduciendo la fatiga operativa.</p>
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'right' }}>
           Administrado por Pymepass Security Service ✓
        </div>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-label">Workflows Activos</div>
          <div className="kpi-value" style={{ fontSize: 28, color: 'var(--color-success)' }}>{activos}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Con Errores</div>
          <div className="kpi-value" style={{ fontSize: 28, color: errores > 0 ? 'var(--color-danger)' : 'var(--color-success)' }}>{errores}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Ejecuciones</div>
          <div className="kpi-value" style={{ fontSize: 28 }}>{n8nWorkflows.reduce((s,w) => s + w.ejecuciones, 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Estado</th>
              <th>Última Ejecución</th>
              <th>Ejecuciones</th>
              <th>Resultado</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {n8nWorkflows.map((w) => (
              <tr key={w.id}>
                <td style={{ fontWeight: 600 }}>{w.nombre}</td>
                <td>
                  <span className={`status-badge ${w.estado === 'activo' ? 'status-aprobado' : w.estado === 'error' ? 'status-riesgo' : 'status-pendiente'}`}>
                    {w.estado.toUpperCase()}
                  </span>
                </td>
                <td style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>{w.ultimaEjecucion}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{w.ejecuciones.toLocaleString()}</td>
                <td>
                  {w.exitoso
                    ? <CheckCircle size={15} color="var(--color-success)" />
                    : <AlertTriangle size={15} color="var(--color-danger)" />
                  }
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {w.estado !== 'activo'
                      ? <button className="btn btn-outline btn-sm"><Play size={12} /></button>
                      : <button className="btn btn-outline btn-sm"><Pause size={12} /></button>
                    }
                    <button className="btn btn-ghost btn-sm"><RefreshCw size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card card-pad mt-16">
        <div className="card-title" style={{ marginBottom: 12 }}>Arquitectura del Pipeline ETL</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', padding: '8px 0' }}>
          {[
            { label: 'CSV DGII', sub: 'Portal CMS',      color: 'var(--color-info)' },
            { label: '→' },
            { label: 'n8n ETL', sub: 'Extracción',       color: 'var(--color-primary)' },
            { label: '→' },
            { label: 'Anonimizar', sub: 'Zero-Bias',     color: 'var(--color-warning)' },
            { label: '→' },
            { label: 'JSON', sub: 'Transformación',      color: 'var(--color-success)' },
            { label: '→' },
            { label: 'ERP + CRM', sub: 'Ingesta datos',  color: 'var(--color-primary)' },
            { label: '→' },
            { label: 'Ollama IA', sub: 'Análisis',       color: 'var(--color-text-primary)' },
          ].map((step, i) =>
            step.label === '→'
              ? <div key={i} style={{ fontSize: 20, color: 'var(--color-text-muted)', padding: '0 8px' }}>→</div>
              : (
                <div key={i} style={{
                  background: `${step.color}18`, border: `1px solid ${step.color}40`,
                  borderRadius: 'var(--radius-md)', padding: '10px 16px', textAlign: 'center', whiteSpace: 'nowrap',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: step.color }}>{step.label}</div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{step.sub}</div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
