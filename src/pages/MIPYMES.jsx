import React from 'react';
import { Building2, Plus, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function MIPYMES() {
  const empresas = [
    { id: 1, nombre: 'Distribuidora El Caribe S.R.L.', rnc: '101-84582-9', status: 'Activa', data: 'Formatos 606/607 cargados' },
    { id: 2, nombre: 'Tecnología Avanzada RD', rnc: '131-45678-2', status: 'Pendiente', data: 'Esperando datos de la DGII' },
  ];

  return (
    <div className="page-container animate-in">
      <div className="page-header" style={{ marginBottom: 40 }}>
        <div>
          <h1 className="page-title">Gestión de MIPYMES</h1>
          <p className="page-subtitle">Administra tus perfiles empresariales y cambia entre contextos operativos.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} />
          Nueva Empresa
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
        {empresas.map(empresa => (
          <div key={empresa.id} className="card h-full" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: 12, background: 'rgba(0, 229, 255, 0.1)', 
                color: 'var(--color-auth-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <Building2 size={24} />
              </div>
              <span style={{ 
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                background: empresa.status === 'Activa' ? '#EBFDF5' : '#FEF3C7',
                color: empresa.status === 'Activa' ? '#059669' : '#D97706'
              }}>
                {empresa.status}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{empresa.nombre}</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontWeight: 500 }}>RNC: {empresa.rnc}</p>
            </div>

            <div style={{ 
              background: 'var(--color-bg-light)', padding: 12, borderRadius: 12, 
              display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' 
            }}>
              {empresa.status === 'Activa' ? <ShieldCheck size={16} color="#059669" /> : <Clock size={16} color="#333" />}
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{empresa.data}</span>
            </div>

            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', marginTop: 8 }}>
              Gestionar Contexto
              <ArrowRight size={16} />
            </button>
          </div>
        ))}

        {/* Add Company Card */}
        <div className="card h-full" style={{ 
          padding: 24, borderStyle: 'dashed', background: 'transparent',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, cursor: 'pointer', transition: 'all 0.2s'
        }}>
          <div style={{ 
            width: 48, height: 48, borderRadius: '50%', border: '2px dashed var(--color-border)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' 
          }}>
            <Plus size={24} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)' }}>Registrar otra MIPYME</h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Expande tu portafolio financiero.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
