import { creditReadiness, kpisPrincipales } from '../../data/mockData';
import { CheckCircle, XCircle, Landmark } from 'lucide-react';

export default function PreparacionCrediticia() {
  const score = creditReadiness.score;
  const scoreColor = score >= 70 ? 'var(--color-success)' : score >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';
  const etapa = score >= 70 ? 'Listo para solicitar' : score >= 50 ? 'En preparación' : 'Requiere trabajo';

  const bancos = [
    { nombre: 'Banco Popular Dominicano', requisito: '≥ 65 score', cumple: score >= 65 },
    { nombre: 'BanReservas',             requisito: '≥ 70 score', cumple: score >= 70 },
    { nombre: 'Scotiabank RD',           requisito: '≥ 72 score', cumple: score >= 72 },
    { nombre: 'Banco BHD León',          requisito: '≥ 75 score', cumple: score >= 75 },
    { nombre: 'Asociaciones de Ahorros', requisito: '≥ 55 score', cumple: score >= 55 },
  ];

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CRM</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">PREPARACIÓN CREDITICIA</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Preparación Crediticia — Loan Readiness</h1>
          <p className="page-subtitle">Visualiza qué tan lista está tu empresa para solicitar financiamiento bancario dominicano, basado en métricas reales.</p>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card card-pad">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              border: `8px solid ${scoreColor}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
            }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: scoreColor }}>{score}</span>
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>/100</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor }}>{etapa}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Score de Preparación Crediticia</div>
          </div>

          <div className="card-title" style={{ marginBottom: 12 }}>Checklist de Requisitos</div>
          {creditReadiness.items.map(({ label, completo, peso }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              {completo
                ? <CheckCircle size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                : <XCircle    size={16} color="var(--color-danger)"  style={{ flexShrink: 0 }} />
              }
              <span style={{ fontSize: 13, flex: 1, color: completo ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                {label}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{peso}pts</span>
            </div>
          ))}
        </div>

        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 14 }}>
            <Landmark size={15} style={{ display: 'inline', marginRight: 6 }} />
            Bancos Dominicanos
          </div>
          {bancos.map(({ nombre, requisito, cumple }) => (
            <div key={nombre} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px', borderRadius: 'var(--radius-md)',
              background: cumple ? 'var(--color-success-bg)' : 'var(--color-surface-2)',
              border: `1px solid ${cumple ? 'rgba(22,163,74,0.2)' : 'var(--color-border)'}`,
              marginBottom: 10,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{nombre}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{requisito}</div>
              </div>
              {cumple
                ? <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-success)' }}>✓ ELEGIBLE</span>
                : <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)' }}>No aún</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
