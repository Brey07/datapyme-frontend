import { useState } from 'react';
import { Edit3, PlusCircle, CheckCircle, Calculator, Info } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP', maximumFractionDigits: 0 }).format(n);

export default function EntradaManual() {
  const [ingreso, setIngreso] = useState(120000);
  const [gastos, setGastos] = useState([{ id: 1, desc: 'Alquiler Taller', monto: 20000 }, { id: 2, desc: 'Energía Eléctrica', monto: 8000 }, { id: 3, desc: 'Servicios de Internet', monto: 2500 }]);
  const [gastosMonto, setGastosMonto] = useState('');
  const [gastosDesc, setGastosDesc] = useState('');
  const [saved, setSaved] = useState(false);

  const totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
  const flujo = ingreso - totalGastos;
  const rc = ingreso / (totalGastos || 1); // pseudo current ratio simplificado

  const handleAddGasto = (e) => {
    e.preventDefault();
    if (gastosDesc && gastosMonto) {
      setGastos([...gastos, { id: Date.now(), desc: gastosDesc, monto: parseFloat(gastosMonto) }]);
      setGastosDesc('');
      setGastosMonto('');
    }
  };

  const syncData = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CMS</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">ENTRADA MANUAL</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión Contable Manual</h1>
          <p className="page-subtitle">Si eres Persona Física o negocio informal sin exportaciones automatizadas (606/607), centraliza tu flujo de efectivo aquí.</p>
        </div>
      </div>

      <div className="alert alert-info">
        <Info size={16} style={{ flexShrink: 0 }} />
        <div className="alert-text">
          Estos datos alimentarán el ERP Contable y el CFO Virtual. Registra mensualmente para mantener tus KPIs actualizados.
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ marginBottom: 14 }}>1. Ingresos y Ventas Estimadas</div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                Ingresos Brutos del Mes Actual (RD$)
              </label>
              <input 
                type="number" 
                className="chat-input" 
                style={{ width: '100%', borderRadius: 6, fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-mono)' }} 
                value={ingreso} 
                onChange={e => setIngreso(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 14 }}>2. Gastos Fijos y Obligaciones</div>
            
            <form onSubmit={handleAddGasto} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input 
                type="text" 
                required 
                placeholder="Descripción (ej. Nómina, Préstamo)" 
                className="chat-input" 
                style={{ flex: 1, borderRadius: 6 }} 
                value={gastosDesc} 
                onChange={e => setGastosDesc(e.target.value)} 
              />
              <input 
                type="number" 
                required 
                step="0.01"
                placeholder="Monto" 
                className="chat-input" 
                style={{ width: 100, borderRadius: 6 }} 
                value={gastosMonto} 
                onChange={e => setGastosMonto(e.target.value)} 
              />
              <button type="submit" className="btn btn-outline" style={{ padding: '0 12px' }}>
                <PlusCircle size={16} />
              </button>
            </form>

            {gastos.length > 0 && (
              <div style={{ border: '1px solid var(--color-border)', borderRadius: 6, overflow: 'hidden' }}>
                {gastos.map((g, i) => (
                  <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderBottom: i < gastos.length - 1 ? '1px solid var(--color-border)' : 'none', background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-2)' }}>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{g.desc}</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmt(g.monto)}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, padding: '0 4px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Total Egresos</span>
              <span style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--color-danger)' }}>{fmt(totalGastos)}</span>
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={18} color="var(--color-primary)" />
            Proyección de este Mes
          </div>
          
          <div style={{ background: 'var(--color-surface-2)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13 }}>Ingreso Registrado</span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{fmt(ingreso)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 13 }}>Egresos Calculados</span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-danger)' }}>- {fmt(totalGastos)}</span>
            </div>
            <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Flujo de Caja Libre</span>
              <span style={{ fontSize: 18, fontFamily: 'var(--font-mono)', fontWeight: 800, color: flujo >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                {fmt(flujo)}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Salud (Ratio Pseudo-Circulante)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: rc >= 1.2 ? 'var(--color-success)' : rc >= 1.05 ? 'var(--color-warning)' : 'var(--color-danger)' }}>{rc.toFixed(2)}x</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                {rc >= 1.05 ? 'Capacidad de pago confirmada para cubrir gastos reportados.' : 'Riesgo de insolvencia detectado.'}
              </div>
            </div>
          </div>

          <button onClick={syncData} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            {saved ? <CheckCircle size={16} /> : <Edit3 size={16} />}
            {saved ? 'Sincronizado con ERP' : 'Sincronizar y Calcular KPIs'}
          </button>
        </div>
      </div>
    </div>
  );
}
