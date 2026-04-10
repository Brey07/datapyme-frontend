import { pipelineCobranza } from '../../data/mockData';
import { DollarSign, Clock } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

const columns = [
  { key: 'facturado', label: 'Facturado',  color: 'var(--color-info)' },
  { key: 'vencido',   label: 'Vencido',    color: 'var(--color-danger)' },
  { key: 'cobrado',   label: 'Cobrado',    color: 'var(--color-success)' },
];

export default function PipelineCobranza() {
  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CRM</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">PIPELINE DE COBRANZA</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pipeline de Cobranza</h1>
          <p className="page-subtitle">Rastrea qué clientes deben dinero y automatiza recordatorios via n8n para evitar estrangulamientos de caja.</p>
        </div>
        <button className="btn btn-primary"><Clock size={14} /> Enviar Recordatorios</button>
      </div>

      <div className="pipeline">
        {columns.map(({ key, label, color }) => (
          <div className="pipeline-col" key={key}>
            <div className="pipeline-col-header">
              <div className="pipeline-col-title" style={{ color }}>{label}</div>
              <span className="pipeline-count">{pipelineCobranza[key].length}</span>
            </div>
            {pipelineCobranza[key].map((item) => (
              <div className="pipeline-card" key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div className="company-avatar" style={{ width: 26, height: 26, fontSize: 11, borderRadius: 6, flexShrink: 0 }}>
                    {item.cliente.charAt(0)}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.cliente}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{fmt(item.monto)}</div>
                  {item.dias > 0 && (
                    <span style={{ fontSize: 10, background: `${color}18`, color, padding: '2px 7px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                      {item.dias}d
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{item.ncf}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
