import { Download, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { kpisPrincipales, empresaActual, creditReadiness } from '../../data/mockData';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

export default function PasaporteFinanciero() {
  const [isPublic, setIsPublic] = useState(false);
  const k = kpisPrincipales;
  const score = creditReadiness.score;
  const scoreColor = score >= 70 ? 'var(--color-success)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CMS</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">PASAPORTE FINANCIERO</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pasaporte Financiero</h1>
          <p className="page-subtitle">
            Tu perfil de solvencia validado. Compártelo con bancos o proveedores para generar confianza,
            sin revelar información comercial sensible.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-outline"
            onClick={() => setIsPublic(p => !p)}
          >
            {isPublic ? <EyeOff size={14} /> : <Eye size={14} />}
            {isPublic ? 'Hacer Privado' : 'Hacer Público'}
          </button>
          <button className="btn btn-primary">
            <Download size={14} />
            Descargar PDF
          </button>
        </div>
      </div>

      {isPublic && (
        <div className="alert alert-success">
          <ShieldCheck size={16} style={{ flexShrink: 0 }} />
          <div className="alert-text">
            <strong>Pasaporte Público Activado</strong>
            Tu perfil de solvencia es ahora visible. Comparte el enlace con bancos o socios comerciales.
          </div>
        </div>
      )}

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Passport Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #1A1D23 0%, #2D3142 100%)', border: 'none', color: 'white' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                  PASAPORTE FINANCIERO
                </div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{empresaActual.nombre}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                  RNC: {empresaActual.rnc} · {empresaActual.sector}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%',
                  border: `4px solid ${scoreColor}`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: scoreColor }}>{score}</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>SCORE</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Capital de Trabajo', value: fmt(k.capitalTrabajo)        },
                { label: 'Ratio Circulante',   value: k.ratioCirculante.toFixed(2) },
                { label: 'Margen Bruto',        value: `${k.margenBruto}%`         },
                { label: 'Flujo de Caja Neto',  value: fmt(k.flujoCaja)            },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              <span>Generado por DataPyme</span>
              <span>Dic 2024 · Ley 172-13 Compliant</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 14 }}>Preparación Crediticia</div>
          {creditReadiness.items.map(({ label, completo, peso }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 4,
                background: completo ? 'var(--color-success-bg)' : 'var(--color-surface-2)',
                border: `2px solid ${completo ? 'var(--color-success)' : 'var(--color-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {completo && <span style={{ fontSize: 11, color: 'var(--color-success)' }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: completo ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                  {label}
                </div>
                <div className="progress-bar-bg" style={{ marginTop: 4 }}>
                  <div className={`progress-bar-fill ${completo ? 'green' : 'red'}`} style={{ width: completo ? `${peso * 5}%` : '20%' }} />
                </div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{peso}%</span>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: '12px', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: scoreColor }}>{score}/100</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Score Crediticio Estimado</div>
          </div>
        </div>
      </div>
    </div>
  );
}
