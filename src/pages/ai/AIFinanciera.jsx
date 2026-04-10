import { useState, useEffect } from 'react';
import { Send, Bot, ShieldCheck, Brain, Eye, LineChart } from 'lucide-react';
import { kpisPrincipales, empresaActual, cuentasPagar, cuentasCobrar } from '../../data/mockData';

const getSystemPrompt = (hasData) => {
  if (!hasData) {
    return `Eres el Evaluador Financiero de DataPyme. 
    REGLA CRÍTICA: NO TIENES DATOS. Informa al usuario que DEBE cargar sus archivos CSV (606/607) en el paso de registro o el portal de datos para que puedas realizar un análisis.
    Sé amable pero firme: sin datos, no hay recomendaciones seguras.`;
  }

  return `Eres un evaluador financiero insobornable y humano (Zero-Bias). 
  ANALIZA LA EMPRESA: ${empresaActual.nombre} (Sector: ${empresaActual.sector}).
  MÉTRICAS CLAVE ACTUALES:
  - Ratio Circulante: ${kpisPrincipales.ratioCirculante} (Umbral de alerta: 1.05)
  - Capital de Trabajo: RD$${kpisPrincipales.capitalTrabajo.toLocaleString()}
  - Flujo de Caja Neto: RD$${kpisPrincipales.flujoCaja.toLocaleString()}
  - Ingresos Reales: RD$${kpisPrincipales.ingresosReales.toLocaleString()}
  - Score Crediticio: ${kpisPrincipales.scoreCrediticio}/100
  
  DETALLE DE DEUDAS (606): ${cuentasPagar.length} facturas pendientes.
  DETALLE DE COBROS (607): ${cuentasCobrar.length} facturas por cobrar.

  REGLAS:
  1. Si Ratio Circulante < 1.05, ALERTA RIESGO DE INSOLVENCIA.
  2. Sé conversacional y humano. Responde dudas sobre proveedores, clientes y montos específicos.
  3. XAI: Explica tus razonamientos matemáticos siempre.
  4. PRIVACIDAD: No menciones RNCs completos si no es necesario.`;
};

export default function AIFinanciera() {
  const userEmail = localStorage.getItem('current_user');
  const hasData = localStorage.getItem(`has_data_${userEmail}`) === 'true';
  const dynamicPrompt = getSystemPrompt(hasData);

  const initialMessages = [
    {
      role: 'ai',
      content: hasData 
        ? `¡Hola! Soy tu asistente financiero. He analizado los datos de **${empresaActual.nombre}**. 
           Actualmente tienes un Ratio Circulante de **${kpisPrincipales.ratioCirculante}**. ¿En qué puedo ayudarte hoy?`
        : `¡Hola! Soy tu asistente financiero. Veo que aún no has cargado tus datos (606/607). 
           Para darte un análisis real y recomendaciones de crédito, por favor carga tus archivos CSV primero.`
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState('evaluator');

  // Forecast state
  const [forecastImage, setForecastImage] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState('');

  // Fetch forecast when opening tab
  useEffect(() => {
    if (activeTab === 'forecast' && !forecastImage && !forecastLoading) {
      fetchForecast();
    }
  }, [activeTab]);

  const fetchForecast = async () => {
    setForecastLoading(true);
    setForecastError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_SECURITY_API_URL}/forecast`);
      if (!response.ok) throw new Error('Error al generar pronóstico');
      const data = await response.json();
      setForecastImage(data.plot_base64);
      setForecastData(data.numeric_data);
    } catch (err) {
      setForecastError('No se pudo conectar con el modelo matemático. ' + err.message);
    } finally {
      setForecastLoading(false);
    }
  };

  const send = async () => {
    if (!input.trim()) return;
    const q = input;
    setInput('');
    const userMsg = { role: 'user', content: q };
    setMessages(m => [...m, userMsg]);
    setLoading(true);
    
    try {
      // Base URL relativa para despliegue unificado
      const securityApiUrl = import.meta.env.VITE_SECURITY_API_URL || '';
      
      const response = await fetch(`${securityApiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          user_email: userEmail
        })
      });
      
      if (!response.ok) throw new Error(`Backend error: ${response.status}`);
      
      const data = await response.json();
      if (data.answer) {
        setMessages(m => [...m, { role: 'ai', content: data.answer }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(m => [...m, {
        role: 'ai',
        content: `**Error de conexión:** No se pudo contactar con el servicio de IA en el backend. Detalle: ${e.message}`
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>SISTEMA</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">IA FINANCIERA</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inteligencia Artificial Financiera</h1>
          <p className="page-subtitle">Análisis predictivo multivariado y evaluación de riesgo insobornable.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => setShowPrompt(p => !p)}>
            <Eye size={14} /> {showPrompt ? 'Ocultar' : 'Ver'} System Prompt
          </button>
        </div>
      </div>

      {showPrompt && activeTab === 'evaluator' && (
        <div className="card card-pad" style={{ marginBottom: 16 }}>
          <pre style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8,
            color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap',
            background: 'var(--color-surface-2)', padding: 14, borderRadius: 8,
            border: '1px solid var(--color-border)',
          }}>
            {systemPrompt}
          </pre>
        </div>
      )}

      {/* TABS */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, borderBottom: '1px solid var(--color-border)' }}>
        <button 
          onClick={() => setActiveTab('evaluator')}
          className={`tab-btn ${activeTab === 'evaluator' ? 'active' : ''}`}
          style={{
            padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: activeTab === 'evaluator' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'evaluator' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6
          }}
        >
          <Bot size={16} /> Evaluación LLaMA
        </button>
        <button 
          onClick={() => setActiveTab('forecast')}
          className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
          style={{
            padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: activeTab === 'forecast' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: activeTab === 'forecast' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6
          }}
        >
          <LineChart size={16} /> Proyecciones (Modelo VAR)
        </button>
      </div>

      {activeTab === 'evaluator' ? (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Evaluador Zero-Bias · LLaMA 3</div>
                <div style={{ fontSize: 11, color: 'var(--color-success)', fontWeight: 600 }}>● Ollama Local · Datos Anonimizados ✓</div>
              </div>
            </div>

            <div className="chat-messages" style={{ height: 420 }}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role === 'user' ? 'user' : ''}`}>
                  <div className={`chat-avatar ${m.role === 'ai' ? 'ai-avatar' : ''}`}>
                    {m.role === 'ai' ? <Bot size={13} /> : '👤'}
                  </div>
                  <div className="chat-bubble" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="chat-msg">
                  <div className="chat-avatar ai-avatar"><Bot size={13} /></div>
                  <div className="chat-bubble" style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    Procesando análisis XAI...
                  </div>
                </div>
              )}
            </div>

            <div className="chat-input-bar">
              <input
                className="chat-input"
                placeholder="Solicita una evaluación financiera..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
              />
              <button className="btn btn-primary btn-sm" onClick={send}><Send size={13} /></button>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 14 }}><ShieldCheck size={15} style={{ marginRight: 6 }} /> Principios Zero-Bias</div>
            {[
              { icon: '🔢', title: 'Solo Matemáticas', desc: 'Evaluación única de ratios y flujos.' },
              { icon: '🔒', title: 'Datos Anonimizados', desc: 'n8n elimina PII antes del análisis.' },
              { icon: '📖', title: 'Explicabilidad (XAI)', desc: 'Cálculos visibles paso a paso.' },
              { icon: '🏠', title: 'IA Local', desc: 'Ollama corre en tu servidor privado.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FORECAST TAB */
        <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 16 }}>Visualización de Tendencias Multivariadas</div>
            {forecastLoading ? (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400 }}>
                 <Brain size={40} style={{ animation: 'spin 3s linear infinite', color: 'var(--color-primary)', marginBottom: 20 }} />
                 <p style={{ fontWeight: 600 }}>Calculando Modelo VAR...</p>
                 <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Procesando desfases y correlaciones trimestrales</p>
               </div>
            ) : forecastError ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#e53e3e', background: '#FFF5F5', borderRadius: 16 }}>
                <strong>Error:</strong> {forecastError}
                <br /><button className="btn btn-outline" style={{ marginTop: 15 }} onClick={fetchForecast}>Reintentar</button>
              </div>
            ) : forecastImage && (
              <div style={{ background: 'white', borderRadius: 12, padding: 10, border: '1px solid var(--color-border)' }}>
                <img src={forecastImage} alt="VAR Projections" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
              </div>
            )}
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
              <div className="card-title">Proyecciones Numéricas (Millones RD$)</div>
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>Próximos 8 trimestres calculados</p>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: 500 }}>
              <table className="data-table small" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Periodo</th>
                    <th style={{ textAlign: 'right' }}>Ventas</th>
                    <th style={{ textAlign: 'right' }}>Gastos</th>
                    <th style={{ textAlign: 'right' }}>Efecto</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData?.forecast.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'var(--color-surface-2)' : 'white' }}>
                      <td style={{ fontWeight: 700, fontSize: 12 }}>{row.periodo}</td>
                      <td style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: 600 }}>{row.ventas.toFixed(1)}</td>
                      <td style={{ textAlign: 'right', color: 'var(--color-error)' }}>{row.gastos.toFixed(1)}</td>
                      <td style={{ textAlign: 'right', fontWeight: 800 }}>{(row.ventas - row.gastos).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: 20, background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 12, textTransform: 'uppercase' }}>Resumen del Algoritmo</div>
              <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                El modelo de **Vectores Autorregresivos (VAR)** analiza las interdependencias entre ventas y gastos pasados para predecir salud financiera futura.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
