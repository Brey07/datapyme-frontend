import { useState } from 'react';
import { User, Building, Settings, Save, CheckCircle } from 'lucide-react';

export default function PerfilEmpresarial() {
  const [tipo, setTipo] = useState('juridica'); // 'fisica' o 'juridica'
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CONFIGURACIÓN</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">PERFIL EMPRESARIAL</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Perfil de Contribuyente</h1>
          <p className="page-subtitle">DataPyme se adapta a la realidad legal de tu negocio en República Dominicana, sin importar si estás formalizado como empresa o eres independiente.</p>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card card-pad">
          <div className="card-title" style={{ marginBottom: 16 }}>Tipo de Entidad Legal</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <button 
              onClick={() => setTipo('fisica')}
              style={{
                background: tipo === 'fisica' ? 'var(--color-primary-bg)' : 'var(--color-surface-2)',
                border: `2px solid ${tipo === 'fisica' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <User size={24} color={tipo === 'fisica' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
              <div style={{ fontSize: 13, fontWeight: 700, color: tipo === 'fisica' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>Persona Física</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Emprendedor, profesional independiente, oficios. Usa número de Cédula.</div>
            </button>
            <button 
              onClick={() => setTipo('juridica')}
              style={{
                background: tipo === 'juridica' ? 'var(--color-primary-bg)' : 'var(--color-surface-2)',
                border: `2px solid ${tipo === 'juridica' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Building size={24} color={tipo === 'juridica' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
              <div style={{ fontSize: 13, fontWeight: 700, color: tipo === 'juridica' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>Persona Jurídica</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>MIPYME formalmente constituida (S.R.L., E.I.R.L.). Usa RNC empresarial.</div>
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="card-title" style={{ marginBottom: 12, borderTop: '1px solid var(--color-border)', paddingTop: 20 }}>Datos Generales</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                  Nombres o Razón Social
                </label>
                <input required type="text" className="chat-input" style={{ width: '100%', borderRadius: 6 }} placeholder="Ej. Juan Pérez o Distribuidora JP SRL" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                  {tipo === 'fisica' ? 'Cédula de Identidad y Electoral' : 'RNC (Registro Nacional de Contribuyente)'}
                </label>
                <input required type="text" className="chat-input" style={{ width: '100%', borderRadius: 6 }} placeholder={tipo === 'fisica' ? '000-0000000-0' : '1-00-00000-0'} />
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                    Sector Económico
                  </label>
                  <select required className="chat-input" style={{ width: '100%', borderRadius: 6, height: 36 }}>
                    <option>Servicios Profesionales</option>
                    <option>Comercio al por Menor</option>
                    <option>Manufactura / Taller</option>
                    <option>Transporte y Logística</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                    Tiempo Operando
                  </label>
                  <select required className="chat-input" style={{ width: '100%', borderRadius: 6, height: 36 }}>
                    <option>&lt; 1 año (Emprendimiento)</option>
                    <option>1 a 3 años</option>
                    <option>Más de 3 años</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                  {saved ? 'Perfil Guardado' : 'Guardar Perfil'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ marginBottom: 10 }}>Impacto en la Plataforma</div>
            {tipo === 'fisica' ? (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Al seleccionar <strong>Persona Física</strong>, DataPyme habilitará módulos de entrada manual y proyecciones basadas en flujo de caja de supervivencia, ideal si aún no reportas formatos 606 y 607 a la DGII de manera recurrente.
              </div>
            ) : (
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Al seleccionar <strong>Persona Jurídica</strong>, se activa la integración nativa y validaciones estrictas para formatos 606 (compras) y 607 (ventas) con el catálogo de NCF de la DGII.
              </div>
            )}
          </div>

          <div className="card card-pad">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-info-bg)', color: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={18} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Configuración de Reportes</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              El tipo de entidad dicta cómo el "CFO Virtual" procesa los datos y cómo se formatea tu Pasaporte Financiero para presentar en los bancos dominicanos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
