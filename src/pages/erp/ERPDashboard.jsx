import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { seriesMensual, kpisPrincipales } from '../../data/mockData';
import { TrendingUp, TrendingDown, Download, BarChart3 } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

export default function ERPDashboard() {
  const k = kpisPrincipales;
  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>ERP</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">MOTOR CONTABLE</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Motor Contable y de Liquidez</h1>
          <p className="page-subtitle">Datos fiscales convertidos en inteligencia de supervivencia. Sin ilusiones contables — solo efectivo real.</p>
        </div>
        <button className="btn btn-outline"><Download size={14} /> Exportar</button>
      </div>

      <div className="kpi-grid">
        {[
          { icon: TrendingUp, cls: 'kpi-icon-orange', label: 'Ingresos Reales',      value: fmt(k.ingresosReales),   badge: '+14.2%', badgeCls: 'badge-success' },
          { icon: TrendingDown,cls: 'kpi-icon-red',  label: 'Gastos Operativos',   value: fmt(k.gastosOperativos), badge: '-5.1%',  badgeCls: 'badge-success' },
          { icon: BarChart3,  cls: 'kpi-icon-blue',  label: 'Flujo Neto',           value: fmt(k.flujoCaja),        badge: '+28%',   badgeCls: 'badge-success' },
          { icon: TrendingUp, cls: 'kpi-icon-green', label: 'Margen Bruto',         value: `${k.margenBruto}%`,     badge: 'Saludable', badgeCls: 'badge-success' },
        ].map(({ icon: Icon, cls, label, value, badge, badgeCls }) => (
          <div className="kpi-card" key={label}>
            <span className={`kpi-card-badge ${badgeCls}`}>{badge}</span>
            <div className={`kpi-icon ${cls}`}><Icon size={18} /></div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value" style={{ fontSize: 22 }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="card card-pad">
          <div className="card-header">
            <div><div className="card-title">Ingresos vs Gastos</div><div className="card-subtitle">Últimos 11 meses</div></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={seriesMensual.slice(0,11)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [fmt(v)]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="ingresos" name="Ingresos" fill="#E85D04" radius={[4,4,0,0]} />
              <Bar dataKey="gastos"   name="Gastos"   fill="#E8EBF0" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card card-pad">
          <div className="card-header">
            <div><div className="card-title">Flujo de Caja Acumulado</div><div className="card-subtitle">Tendencia de liquidez real</div></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={seriesMensual.slice(0,11)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="flujoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }} formatter={(v) => [fmt(v), 'Flujo']} />
              <Area type="monotone" dataKey="flujo" stroke="#16A34A" strokeWidth={2} fill="url(#flujoGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
