import { kpisPrincipales } from '../../data/mockData';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

export default function KPIsDuros() {
  const k = kpisPrincipales;
  const rc = k.ratioCirculante;
  const rcOk = rc >= 1.05;

  const kpis = [
    {
      titulo: 'Capital de Trabajo Operativo',
      formula: 'Ingresos Reales − Costos Operativos',
      valor: fmt(k.capitalTrabajo),
      estado: 'saludable',
      desc: `${fmt(k.ingresosReales)} ingresos − ${fmt(k.gastosOperativos)} gastos = ${fmt(k.capitalTrabajo)}`,
    },
    {
      titulo: 'Ratio Circulante (Current Ratio)',
      formula: 'Activos Corrientes ÷ Pasivos Inminentes',
      valor: rc.toFixed(2),
      estado: rc >= 1.2 ? 'saludable' : rc >= 1.05 ? 'aceptable' : 'riesgo',
      desc: rc >= 1.2 ? `✓ RC ${rc.toFixed(2)} ≥ 1.20 — Zona de confort bancario` :
            rc >= 1.05 ? `⚠ RC ${rc.toFixed(2)} entre 1.05–1.20 — Zona de aceptación mínima` :
            `✗ RC ${rc.toFixed(2)} < 1.05 — RIESGO DE QUIEBRA`,
    },
    {
      titulo: 'Margen Bruto',
      formula: '(Ingresos − COGS) ÷ Ingresos × 100',
      valor: `${k.margenBruto}%`,
      estado: 'saludable',
      desc: `Margen de ${k.margenBruto}% — Por encima del promedio sectorial (22%)`,
    },
    {
      titulo: 'Flujo de Caja Libre',
      formula: 'Flujo Operativo − Inversiones de Capital',
      valor: fmt(k.flujoCaja),
      estado: k.flujoCaja > 0 ? 'saludable' : 'riesgo',
      desc: `Flujo positivo — La empresa genera efectivo superior a sus obligaciones`,
    },
  ];

  const colorMap = { saludable: 'var(--color-success)', aceptable: 'var(--color-warning)', riesgo: 'var(--color-danger)' };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>ERP</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">KPIs DUROS</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">KPIs Financieros Duros</h1>
          <p className="page-subtitle">Métricas innegociables para la banca dominicana. Calculadas en tiempo real desde tus datos DGII.</p>
        </div>
      </div>

      {!rcOk && (
        <div className="alert alert-danger">
          <AlertTriangle size={16} />
          <div className="alert-text">
            <strong>⚠ ALERTA CRÍTICA: Riesgo de Insolvencia</strong>
            Tu Ratio Circulante es {rc.toFixed(2)}, por debajo del umbral mínimo de 1.05. Contacta a tu asesor financiero inmediatamente.
          </div>
        </div>
      )}

      <div className="grid-2">
        {kpis.map(({ titulo, formula, valor, estado, desc }) => (
          <div className="card card-pad" key={titulo}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div className="card-title">{titulo}</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginTop: 2 }}>{formula}</div>
              </div>
              {estado === 'saludable'
                ? <CheckCircle size={18} color="var(--color-success)" />
                : <AlertTriangle size={18} color={colorMap[estado]} />
              }
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: colorMap[estado], marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              {valor}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{desc}</div>
            <div className="progress-bar-bg" style={{ marginTop: 12 }}>
              <div
                className={`progress-bar-fill ${estado === 'saludable' ? 'green' : estado === 'aceptable' ? 'yellow' : 'red'}`}
                style={{ width: estado === 'saludable' ? '85%' : estado === 'aceptable' ? '55%' : '20%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
