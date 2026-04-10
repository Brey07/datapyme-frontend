import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Eye, EyeOff, Check, 
  Wallet, Clock, Heart, ShieldCheck,
  User, Calendar, MapPin, Briefcase,
  Mail, Smartphone, Key, Copy, RefreshCw, Lock
} from 'lucide-react';

// ─── Sub-Components moved OUTSIDE to prevent focus loss ──────────────────

const Step1 = ({ formData, updateFormData, showPassword, setShowPassword, isAgreed, setIsAgreed, handleNext }) => {
  const criteria = [
    { id: 1, label: 'Un número', met: /\d/.test(formData.password) },
    { id: 2, label: 'Un carácter especial', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
    { id: 3, label: 'Un mínimo de 8 caracteres', met: formData.password.length >= 8 },
    { id: 4, label: 'Una mayúscula y una minúscula', met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) }
  ];
  const canContinue = formData.email && criteria.every(c => c.met) && isAgreed;

  return (
    <div className="animate-in">
      <h1 className="auth-title">Vamos a comprender tus finanzas juntos</h1>
      
      <div className="auth-form-group">
        <label className="auth-label">Correo electrónico</label>
        <input 
          type="email" 
          className="auth-input" 
          placeholder="correo@correo.com"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          autoFocus
        />
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Contraseña</label>
        <div style={{ position: 'relative' }}>
          <input 
            type={showPassword ? "text" : "password"} 
            className="auth-input" 
            placeholder="********"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: '#9AA0AD', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="password-criteria">
        {criteria.map(c => (
          <div key={c.id} className={`criteria-item ${c.met ? 'valid' : ''}`}>
            <div className="criteria-dot" />
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, cursor: 'pointer' }} onClick={() => setIsAgreed(!isAgreed)}>
        <div style={{ 
          width: 24, height: 24, borderRadius: 8, border: '2px solid',
          borderColor: isAgreed ? 'var(--color-auth-accent)' : '#E8EBF0',
          background: isAgreed ? 'var(--color-auth-accent)' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
          transition: 'all 0.2s'
        }}>
          {isAgreed && <Check size={16} strokeWidth={3} />}
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
          Sí, acepto los <span style={{ color: 'var(--color-auth-accent)', fontWeight: 700 }}>términos y condiciones</span> y <span style={{ color: 'var(--color-auth-accent)', fontWeight: 700 }}>política de privacidad</span> de esta relación.
        </p>
      </div>

      <button 
        className={`auth-button ${canContinue ? 'primary' : ''}`}
        disabled={!canContinue}
        onClick={handleNext}
      >
        Empecemos una relación
      </button>
    </div>
  );
};



const Step2 = ({ formData, updateFormData, handleNext }) => {
  const canContinue = formData.firstName && formData.lastName && formData.cedula && formData.birthDate;

  return (
    <div className="animate-in">
      <h1 className="auth-title">Cuéntame sobre ti</h1>
      <p className="auth-subtitle">Tu historia financiera es única, por eso quiero conocerte.</p>

      <div className="auth-form-group">
        <label className="auth-label">Nombre completo</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input 
            type="text" 
            className="auth-input" 
            placeholder="Nombre" 
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            autoFocus
          />
          <input 
            type="text" 
            className="auth-input" 
            placeholder="Apellido" 
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Cédula</label>
        <input 
          type="text" 
          className="auth-input" 
          placeholder="000-0000000-0" 
          value={formData.cedula}
          onChange={(e) => updateFormData({ cedula: e.target.value })}
        />
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Fecha de nacimiento</label>
        <input 
          type="date" 
          className="auth-input" 
          value={formData.birthDate}
          onChange={(e) => updateFormData({ birthDate: e.target.value })}
        />
      </div>

      <div className="auth-form-group">
        <label className="auth-label">Provincia</label>
        <select 
          className="auth-input" 
          value={formData.province}
          onChange={(e) => updateFormData({ province: e.target.value })}
          style={{ appearance: 'none', background: '#F9FAFB url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239AA0AD\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 16px center' }}
        >
          <option value="">Selecciona tu provincia</option>
          <option value="Azua">Azua</option>
          <option value="Bahoruco">Bahoruco</option>
          <option value="Barahona">Barahona</option>
          <option value="Dajabón">Dajabón</option>
          <option value="Distrito Nacional">Distrito Nacional</option>
          <option value="Duarte">Duarte</option>
          <option value="Elías Piña">Elías Piña</option>
          <option value="El Seibo">El Seibo</option>
          <option value="Espaillat">Espaillat</option>
          <option value="Hato Mayor">Hato Mayor</option>
          <option value="Hermanas Mirabal">Hermanas Mirabal</option>
          <option value="Independencia">Independencia</option>
          <option value="La Altagracia">La Altagracia</option>
          <option value="La Romana">La Romana</option>
          <option value="La Vega">La Vega</option>
          <option value="María Trinidad Sánchez">María Trinidad Sánchez</option>
          <option value="Monseñor Nouel">Monseñor Nouel</option>
          <option value="Monte Cristi">Monte Cristi</option>
          <option value="Monte Plata">Monte Plata</option>
          <option value="Pedernales">Pedernales</option>
          <option value="Peravia">Peravia</option>
          <option value="Puerto Plata">Puerto Plata</option>
          <option value="Samaná">Samaná</option>
          <option value="San Cristóbal">San Cristóbal</option>
          <option value="San José de Ocoa">San José de Ocoa</option>
          <option value="San Juan">San Juan</option>
          <option value="San Pedro de Macorís">San Pedro de Macorís</option>
          <option value="Sánchez Ramírez">Sánchez Ramírez</option>
          <option value="Santiago">Santiago</option>
          <option value="Santiago Rodríguez">Santiago Rodríguez</option>
          <option value="Santo Domingo">Santo Domingo</option>
          <option value="Valverde">Valverde</option>
        </select>
      </div>

      <button 
        className={`auth-button ${canContinue ? 'primary' : ''}`} 
        onClick={handleNext}
        disabled={!canContinue}
      >
        Continuemos
      </button>
    </div>
  );
};

const Step3 = ({ formData, updateFormData, handleNext }) => {
  const options = [
    { id: 'finances', icon: Wallet, label: 'Tomar el control total de mi rentabilidad.' },
    { id: 'time', icon: Clock, label: 'Automatizar procesos y ganar agilidad.' },
    { id: 'habits', icon: Heart, label: 'Optimizar la salud financiera de mi negocio.' },
  ];

  const toggleGoal = (id) => {
    updateFormData({
      goals: formData.goals.includes(id) 
        ? formData.goals.filter(g => g !== id) 
        : [...formData.goals, id]
    });
  };

  return (
    <div className="animate-in">
      <h1 className="auth-title">Cuéntame más</h1>
      <p className="auth-subtitle">Dime qué es lo más importante para ti.</p>

      {options.map(opt => (
        <div 
          key={opt.id} 
          className={`goal-option ${formData.goals.includes(opt.id) ? 'selected' : ''}`}
          onClick={() => toggleGoal(opt.id)}
        >
          <div className="goal-icon">
            <opt.icon size={22} />
          </div>
          <div className="goal-text">{opt.label}</div>
        </div>
      ))}

      <div className="auth-form-group" style={{ marginTop: 24 }}>
        <label className="auth-label">Ingresos mensuales aproximados</label>
        <select 
          className="auth-input" 
          value={formData.income}
          onChange={(e) => updateFormData({ income: e.target.value })}
          style={{ appearance: 'none', background: '#F9FAFB url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239AA0AD\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 16px center' }}
        >
          <option value="">Selecciona un rango</option>
          <option value="0-50k">RD$ 0 - RD$ 50,000</option>
          <option value="50k-100k">RD$ 50,000 - RD$ 100,000</option>
          <option value="100k-250k">RD$ 100,000 - RD$ 250,000</option>
          <option value="250k+">Más de RD$ 250,000</option>
        </select>
      </div>

      <button 
        className={`auth-button ${formData.goals.length > 0 && formData.income ? 'primary' : ''}`} 
        onClick={handleNext}
        disabled={formData.goals.length === 0 || !formData.income}
      >
        Finalizar registro
      </button>
    </div>
  );
};

const Step4_Data = ({ formData, handleNext }) => {
  const handleUpload = (e) => {
    e.preventDefault();
    localStorage.setItem(`has_data_${formData.email}`, 'true');
    handleNext();
  };

  const handleSkip = () => {
    localStorage.setItem(`has_data_${formData.email}`, 'false');
    handleNext();
  };

  return (
    <div className="animate-in" style={{ textAlign: 'center', paddingTop: 20 }}>
      <h1 className="auth-title">Carga de Datos DGII</h1>
      <p className="auth-subtitle">Sube tus reportes 606 (compras) y 607 (ventas) para generar proyecciones reales de inmediato.</p>

      <div style={{ border: '2px dashed var(--color-auth-accent)', background: '#F0FDFD', borderRadius: 16, padding: '40px 20px', marginBottom: 24, cursor: 'pointer' }}>
        <p style={{ color: 'var(--color-auth-accent)', fontSize: 14, fontWeight: 600 }}>Arrastra tus archivos CSV aquí</p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 8 }}>Formatos 606 y 607 requeridos</p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
         <button className="auth-button primary" onClick={handleUpload}>Utilizar mis datos reales</button>
         <button className="auth-button" style={{ background: 'transparent', color: 'var(--color-text-muted)', border: 'none', fontSize: 13, textDecoration: 'underline' }} onClick={handleSkip}>Omitir este paso</button>
      </div>
    </div>
  );
};

const Step5_2FA = ({ formData, updateFormData, qrCode, setQrCode, totpSecret, setTotpSecret, totpToken, setTotpToken, totpError, setTotpError, totpLoading, setTotpLoading, handleNext }) => {
  const [copied, setCopied] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!qrCode) {
      generateTOTP();
    }
  }, []);

  const generateTOTP = async () => {
    setTotpLoading(true);
    setTotpError('');
    try {
      const securityApiUrl = import.meta.env.VITE_SECURITY_API_URL || '';
      const response = await fetch(`${securityApiUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: formData.email, app_name: "DataPyme" })
      });
      const data = await response.json();
      setQrCode(data.qr_code_base64);
      setTotpSecret(data.secret);
    } catch (err) {
      setTotpError('No se pudo conectar con el servicio de seguridad. Intenta de nuevo.');
    } finally {
      setTotpLoading(false);
    }
  };

  const handleVerify = async () => {
    setTotpLoading(true);
    setTotpError('');
    try {
      const securityApiUrl = import.meta.env.VITE_SECURITY_API_URL || '';
      const response = await fetch(`${securityApiUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: totpSecret, token: totpToken })
      });
      if (response.ok) {
        setVerified(true);
        localStorage.setItem('2fa_enabled', 'true');
        localStorage.setItem('2fa_secret', totpSecret);
        localStorage.setItem('user_email', formData.email);
        setTimeout(() => handleNext(), 800);
      } else {
        const data = await response.json();
        setTotpError(data.detail || 'Código inválido. Verifica e intenta de nuevo.');
      }
    } catch (err) {
      setTotpError('Error al validar. Verifica tu conexión.');
    } finally {
      setTotpLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(totpSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTokenChange = (index, value) => {
    if (value.length > 1) return;
    const newToken = totpToken.split('');
    while (newToken.length < 6) newToken.push('');
    newToken[index] = value;
    setTotpToken(newToken.join(''));
    if (value && index < 5) {
      const next = document.getElementById(`totp-${index + 1}`);
      if (next) next.focus();
    }
  };

  if (verified) {
    return (
      <div className="animate-in" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ 
          width: 80, height: 80, borderRadius: '50%', 
          background: 'rgba(0, 229, 255, 0.15)', border: '3px solid var(--color-auth-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--color-auth-accent)' 
        }}>
          <ShieldCheck size={40} strokeWidth={2} />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-auth-text)' }}>¡2FA Activado!</h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 8 }}>Tu authenticator ha sido vinculado correctamente.</p>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <h1 className="auth-title">Protege tu cuenta</h1>
      <p className="auth-subtitle">Configura la verificación en dos pasos para asegurar tu ecosistema financiero.</p>

      <div style={{ 
        background: '#F0FDFD', border: '1.5px solid var(--color-auth-accent)', 
        padding: '12px 16px', borderRadius: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' 
      }}>
        <Lock size={18} color="var(--color-auth-accent)" />
        <div style={{ fontSize: 12, color: 'var(--color-auth-text)', lineHeight: 1.4 }}>
          Escanea el código QR con <strong>Google Authenticator</strong>, <strong>Authy</strong> u otra app compatible.
        </div>
      </div>

      {totpLoading && !qrCode ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <RefreshCw size={32} color="var(--color-auth-accent)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 12 }}>Generando código de seguridad...</p>
        </div>
      ) : (
        <>
          {/* QR Code */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ 
              background: 'white', padding: 12, borderRadius: 16, 
              border: '2px solid #E8EBF0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              {qrCode ? (
                <img src={qrCode} alt="2FA QR Code" style={{ width: 180, height: 180, borderRadius: 8 }} />
              ) : (
                <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                  <Smartphone size={40} />
                </div>
              )}
            </div>
          </div>

          {/* Secret Key */}
          {totpSecret && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>O ingresa esta clave manualmente</div>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 14px', background: '#F9FAFB', borderRadius: 12, 
                border: '1.5px solid #E8EBF0', fontSize: 13, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 1.5
              }}>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{totpSecret}</span>
                <button 
                  onClick={handleCopy}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? 'var(--color-auth-accent)' : '#9AA0AD', padding: 4, display: 'flex' }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* TOTP Input */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Ingresa el código de tu authenticator</div>
            <div className="otp-grid">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <input 
                  key={i}
                  id={`totp-${i}`}
                  type="text" 
                  className="otp-input"
                  maxLength={1}
                  value={totpToken[i] || ''}
                  onChange={(e) => handleTokenChange(i, e.target.value.replace(/\D/g, ''))}
                  autoFocus={i === 0}
                  style={{ textAlign: 'center' }}
                />
              ))}
            </div>
          </div>

          {totpError && (
            <div style={{ 
              color: '#e53e3e', fontSize: 12, fontWeight: 600, marginBottom: 16,
              padding: '10px 14px', background: '#FFF5F5', borderRadius: 12, border: '1px solid #FED7D7'
            }}>
              {totpError}
            </div>
          )}

          <button 
            className={`auth-button ${totpToken.replace(/\s/g, '').length === 6 ? 'primary' : ''}`}
            disabled={totpToken.replace(/\s/g, '').length !== 6 || totpLoading}
            onClick={handleVerify}
          >
            {totpLoading ? (
              <><RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> Verificando...</>
            ) : (
              <><ShieldCheck size={18} /> Activar protección 2FA</>
            )}
          </button>

          {totpError && (
            <button 
              onClick={generateTOTP}
              style={{ 
                display: 'block', margin: '12px auto 0', background: 'none', border: 'none',
                color: 'var(--color-auth-accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer'
              }}
            >
              Generar nuevo código QR
            </button>
          )}
        </>
      )}
    </div>
  );
};

const Step6 = ({ firstName, handleNext }) => (
  <div className="animate-in" style={{ textAlign: 'center', paddingTop: 40 }}>
    <div style={{ 
      width: 100, height: 100, borderRadius: '50%', 
      background: 'rgba(0, 229, 255, 0.1)', border: '4px solid var(--color-auth-accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', color: 'var(--color-auth-accent)' 
    }}>
      <Check size={50} strokeWidth={3} />
    </div>
    <h1 className="auth-title">¡Bienvenido a bordo, {firstName}!</h1>
    <p className="auth-subtitle">Tu cuenta ha sido creada y protegida con verificación en dos pasos. Estamos listos para potenciar tus finanzas.</p>
    <div style={{ 
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px',
      background: '#F0FDFD', borderRadius: 12, border: '1px solid var(--color-auth-accent)',
      fontSize: 13, fontWeight: 600, color: 'var(--color-auth-accent)', marginBottom: 32
    }}>
      <ShieldCheck size={16} /> 2FA Activo
    </div>
    <button className="auth-button primary" onClick={handleNext}>Entrar a la plataforma</button>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────

export default function Register({ onRegisterSuccess }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ['', '', '', '', '', ''],
    firstName: '',
    lastName: '',
    nickname: '',
    cedula: '',
    birthDate: '',
    gender: '',
    province: '',
    income: '',
    goals: []
  });

  // 2FA state
  const [qrCode, setQrCode] = useState(null);
  const [totpSecret, setTotpSecret] = useState('');
  const [totpToken, setTotpToken] = useState('');
  const [totpError, setTotpError] = useState('');
  const [totpLoading, setTotpLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isAgreed, setIsAgreed] = useState(false);

  // Timer logic - Not needed anymore for Mock OTP
  useEffect(() => {
    // Left empty since Step 2 OTP simulation was removed
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else {
      localStorage.setItem('current_user', formData.email);
      onRegisterSuccess();
      window.location.href = '/';
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const updateFormData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  return (
    <div className="auth-container">
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-auth-text)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={20} />
          {step > 1 ? `Paso ${step}` : 'Volver'}
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="auth-logo-icon">
            <img src="/logo.svg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="auth-logo-text" style={{ fontSize: 24 }}>datapyme</div>
        </div>
      </div>

      {/* Progress Bar */}
      {step < 6 && (
        <div className="step-indicator">
          {[1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              className={`step-dot ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`}
            >
              {step > i ? <Check size={16} strokeWidth={3} /> : i}
            </div>
          ))}
        </div>
      )}

      {/* Steps Rendering */}
      <div className="auth-content">
        {step === 1 && (
          <Step1 
            formData={formData} 
            updateFormData={updateFormData} 
            showPassword={showPassword} 
            setShowPassword={setShowPassword}
            isAgreed={isAgreed}
            setIsAgreed={setIsAgreed}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2 
            formData={formData} 
            updateFormData={updateFormData} 
            handleNext={handleNext}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData} 
            updateFormData={updateFormData} 
            handleNext={handleNext}
          />
        )}
        {step === 4 && (
          <Step4_Data 
            formData={formData}
            handleNext={handleNext}
          />
        )}
        {step === 5 && (
          <Step5_2FA 
            formData={formData}
            updateFormData={updateFormData}
            qrCode={qrCode}
            setQrCode={setQrCode}
            totpSecret={totpSecret}
            setTotpSecret={setTotpSecret}
            totpToken={totpToken}
            setTotpToken={setTotpToken}
            totpError={totpError}
            setTotpError={setTotpError}
            totpLoading={totpLoading}
            setTotpLoading={setTotpLoading}
            handleNext={handleNext}
          />
        )}
        {step === 6 && (
          <Step6 
            firstName={formData.firstName} 
            handleNext={handleNext}
          />
        )}
      </div>

      {step < 6 && (
        <div className="auth-footer-link">
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Inicia sesión</span>
        </div>
      )}
    </div>
  );
}
