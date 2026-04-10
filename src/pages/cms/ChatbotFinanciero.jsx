import { useState } from 'react';
import { Send, ShieldCheck, Bot } from 'lucide-react';
import { chatDemoMessages } from '../../data/mockData';

const suggestedQuestions = [
  '¿Tengo liquidez para pagar la nómina la próxima semana?',
  '¿Cómo cerró mi margen de ganancias este mes?',
  '¿Cuál es mi ratio circulante actual?',
  '¿Qué proveedores representan más riesgo de liquidez?',
  '¿Estoy listo para solicitar un préstamo bancario?',
];

export default function ChatbotFinanciero() {
  const [messages, setMessages] = useState(chatDemoMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setMessages(m => [...m, {
      role: 'ai',
      content: `**Análisis financiero (Zero-Bias):**\n\nHe procesado tu consulta usando los últimos datos del 606/607 de tu empresa (datos anonimizados).\n\nBasado en tu Ratio Circulante de **1.38** y tu flujo de caja neto de **RD$124,800**, tu empresa muestra indicadores saludables.\n\n*Para una respuesta más precisa, asegúrate de haber cargado los CSV del mes actual en el Portal DGII.*`,
    }]);
    setLoading(false);
  };

  return (
    <div className="page-content animate-in">
      <div className="breadcrumb">
        <span>CMS</span><span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">CFO VIRTUAL</span>
      </div>
      <div className="page-header">
        <div>
          <h1 className="page-title">CFO Virtual — Asistente Financiero</h1>
          <p className="page-subtitle">
            Tu Director Financiero virtual impulsado por LLaMA (Ollama). Pregunta en lenguaje natural
            sobre tu liquidez, márgenes y salud financiera.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--color-success-bg)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, color: 'var(--color-success)' }}>
          <ShieldCheck size={14} />
          Anonimización Zero-Bias Activa
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>DataPyme CFO Virtual</div>
              <div style={{ fontSize: 11, color: 'var(--color-success)', fontWeight: 600 }}>● En línea — Modelo LLaMA 3 (Ollama local)</div>
            </div>
          </div>

          <div className="chat-messages" style={{ height: 380 }}>
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
                  Analizando datos financieros...
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-bar">
            <input
              className="chat-input"
              placeholder="Pregunta sobre tu liquidez, márgenes, proveedores..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn btn-primary btn-sm" onClick={() => sendMessage()}>
              <Send size={13} />
            </button>
          </div>
        </div>

        <div>
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ marginBottom: 12 }}>Preguntas Sugeridas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    textAlign: 'left', padding: '9px 12px', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)', background: 'var(--color-surface-2)',
                    fontSize: 12, color: 'var(--color-text-secondary)', cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                  onMouseOver={e => { e.target.style.borderColor = 'var(--color-primary-light)'; e.target.style.color = 'var(--color-primary)'; }}
                  onMouseOut={e => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.color = 'var(--color-text-secondary)'; }}
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-title" style={{ marginBottom: 10 }}>Privacidad y Seguridad</div>
            {[
              '🔒 Datos procesados únicamente en servidor local (Ollama)',
              '🧾 Cumplimiento con Ley 172-13 de Protección de Datos RD',
              '🚫 Nombre de empresa y socio eliminados antes del análisis',
              '🤖 Evaluación estrictamente matemática — sin sesgos',
            ].map(item => (
              <div key={item} style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
