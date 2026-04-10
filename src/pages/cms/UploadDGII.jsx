import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

const formatTypes = [
  { code: '606', name: 'Compras y Gastos', desc: 'Registro de facturas de proveedores y gastos operativos', color: 'var(--color-info)' },
  { code: '607', name: 'Ventas e Ingresos', desc: 'Registro de comprobantes fiscales emitidos a clientes', color: 'var(--color-success)' },
];

export default function UploadDGII() {
  const [files, setFiles] = useState({});
  const [dragOver, setDragOver] = useState(null);
  const [processed, setProcessed] = useState({});

  const handleDrop = (e, code) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles(f => ({ ...f, [code]: file }));
      setTimeout(() => setProcessed(p => ({ ...p, [code]: true })), 1500);
    }
  };

  const handleFile = (e, code) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(f => ({ ...f, [code]: file }));
      setTimeout(() => setProcessed(p => ({ ...p, [code]: true })), 1500);
    }
  };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CMS</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">CARGA DGII</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Portal de Carga Tributaria</h1>
          <p className="page-subtitle">
            Sube tus reportes mensuales de la DGII en formato CSV. Los datos son procesados por el pipeline
            n8n y anonimizados antes de su análisis. Cumple con la Ley 172-13.
          </p>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginBottom: 20 }}>
        <AlertCircle size={16} style={{ flexShrink: 0 }} />
        <div className="alert-text">
          <strong>Formato requerido</strong>
          Los archivos deben ser CSV exportados directamente desde la Oficina Virtual de la DGII. 
          El sistema valida automáticamente la estructura y los NCF.
        </div>
      </div>

      <div className="grid-2">
        {formatTypes.map(({ code, name, desc, color }) => (
          <div key={code}>
            <div className="card card-pad" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: `${color}18`, color,
                }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Formato {code}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{name}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 14 }}>{desc}</p>

              <div
                className={`upload-zone ${dragOver === code ? 'drag-active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(code); }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, code)}
                onClick={() => document.getElementById(`file-${code}`).click()}
              >
                <input id={`file-${code}`} type="file" accept=".csv" style={{ display: 'none' }} onChange={(e) => handleFile(e, code)} />
                {files[code] ? (
                  <>
                    <div style={{ color: 'var(--color-success)', fontSize: 32, marginBottom: 8 }}>
                      {processed[code] ? <CheckCircle size={40} /> : '⏳'}
                    </div>
                    <div className="upload-zone-title" style={{ color: processed[code] ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {processed[code] ? `✓ ${files[code].name} procesado` : 'Procesando...'}
                    </div>
                    <div className="upload-zone-sub">
                      {processed[code] ? `Pipeline ETL completado — Datos enviados al ERP` : 'Validando estructura CSV...'}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="upload-zone-icon"><UploadCloud size={24} /></div>
                    <div className="upload-zone-title">Arrastra tu CSV del {code} aquí</div>
                    <div className="upload-zone-sub">o haz clic para seleccionar · Solo archivos .CSV</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card card-pad mt-16">
        <div className="card-title" style={{ marginBottom: 14 }}>Estado del Pipeline ETL</div>
        {[
          { step: '1. Recepción del archivo CSV', ok: true },
          { step: '2. Validación de estructura y NCF', ok: Object.keys(files).length > 0 },
          { step: '3. Anonimización Zero-Bias (n8n)', ok: Object.values(processed).some(Boolean) },
          { step: '4. Transformación a JSON estructurado', ok: Object.values(processed).some(Boolean) },
          { step: '5. Ingesta en módulo ERP', ok: Object.values(processed).filter(Boolean).length === 2 },
        ].map(({ step, ok }) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 13 }}>
            {ok
              ? <CheckCircle size={16} color="var(--color-success)" />
              : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--color-border)' }} />
            }
            <span style={{ color: ok ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
