import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  kpisPrincipales, seriesMensual, evaluacionesRecientes, empresaActual
} from '../data/mockData';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

const statusClass = {
  aprobado: 'status-aprobado',
  pendiente: 'status-pendiente',
  revision:  'status-revision',
  riesgo:    'status-riesgo',
};

const statusLabel = {
  aprobado: 'APROBADO',
  pendiente: 'PENDIENTE',
  revision:  'EN REVISIÓN',
  riesgo:    'RIESGO',
};

export default function Overview() {
  const k = kpisPrincipales;
  return (
    <div className="page-content animate-in">
      {/* Breadcrumb & Header */}
      <div className="breadcrumb">
        <span>PLATAFORMA</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">DASHBOARD OPERACIONAL</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Financiero</h1>
          <p className="page-subtitle">
            Monitoreo de salud financiera de <strong>{empresaActual.nombre}</strong> — Métricas DGII y liquidez en tiempo real.
          </p>
        </div>
        <button className="btn btn-outline">
          <Download size={14} />
          Exportar Reporte
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-card-badge badge-success">+12.5%</span>
          <div className="kpi-icon kpi-icon-orange">
            <TrendingUp size={18} />
          </div>
          <div className="kpi-label">Capital de Trabajo</div>
          <div className="kpi-value">{fmt(k.capitalTrabajo)}</div>
          <div className="kpi-meta">Actualizado hace 12 mins</div>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-badge badge-success">1.38x</span>
          <div className="kpi-icon kpi-icon-blue">
            <TrendingUp size={18} />
          </div>
          <div className="kpi-label">Ratio Circulante</div>
          <div className="kpi-value">{k.ratioCirculante.toFixed(2)}</div>
          <div className="kpi-meta">≥ 1.05 zona segura ✓</div>
        </div>

        <div className="kpi-card">
          <span className="kpi-card-badge badge-orange">+28% YoY</span>
          <div className="kpi-icon kpi-icon-green">
            <TrendingUp size={18} />
          </div>
          <div className="kpi-label">Margen Bruto</div>
          <div className="kpi-value">{k.margenBruto}%</div>
          <div className="kpi-meta">Impacto en {k.totalTransacciones607} facturas emitidas</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Volume Chart */}
        <div className="card card-pad">
          <div className="card-header">
            <div>
              <div className="card-title">Volumen de Ingresos</div>
              <div className="card-subtitle">Últimos 11 meses</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800 }}>{k.totalTransacciones607}</span>
              <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 600 }}>↑ 5% este mes</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={seriesMensual.slice(0, 11)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="ingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#E85D04" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E85D04" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [fmt(v), 'Ingresos']}
              />
              <Area type="monotone" dataKey="ingresos" stroke="#E85D04" strokeWidth={2} fill="url(#ingGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Flujo Chart */}
        <div className="card card-pad">
          <div className="card-header">
            <div>
              <div className="card-title">Flujo de Caja Neto</div>
              <div className="card-subtitle">Ingresos vs Gastos operativos</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800 }}>1.8h</span>
              <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 600 }}>~-0.2h avg</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={seriesMensual.slice(0, 11)} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                formatter={(v) => [fmt(v)]}
              />
              <Line type="monotone" dataKey="flujo"   stroke="#E85D04" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="gastos"  stroke="#E8E5E0" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Evaluations Table */}
      <div className="card">
        <div className="card-pad" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="card-header" style={{ marginBottom: 0 }}>
            <div className="card-title">Evaluaciones MIPYMES Recientes</div>
            <button className="btn-ghost" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer' }}>
              Ver Todos los Registros →
            </button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre de Empresa</th>
              <th>Tipo de Evaluación</th>
              <th>Estado</th>
              <th>Tiempo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {evaluacionesRecientes.map((e) => (
              <tr key={e.id}>
                <td>
                  <div className="table-company-cell">
                    <div className="company-avatar">{e.initial}</div>
                    <span style={{ fontWeight: 500 }}>{e.empresa}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--color-text-secondary)' }}>{e.tipo}</td>
                <td>
                  <span className={`status-badge status-${e.estado}`}>
                    {statusLabel[e.estado]}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{e.tiempo}</td>
                <td>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-text-muted)', padding: '4px 6px' }}>
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
