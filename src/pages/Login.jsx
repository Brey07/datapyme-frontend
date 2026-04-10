import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, ShieldCheck } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [totpToken, setTotpToken] = useState('');
  const [totpError, setTotpError] = useState('');
  const [formData, setFormData] = useState({
    identifier: '', // RNC or Cédula
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate initial login verification
    setTimeout(() => {
      setIsLoading(false);
      
      // If 2FA is enabled (based on our mock localStorage DB), require it
      if (localStorage.getItem('2fa_enabled') === 'true') {
        setShowTwoFactor(true);
      } else {
        // No 2FA enabled, login immediately
        localStorage.setItem('current_user', formData.email);
        onLogin();
        navigate('/');
      }
    }, 800);
  };

  const handleVerifyTotp = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTotpError('');
    
    try {
      const secret = localStorage.getItem('2fa_secret');
      if (!secret) {
        setTotpError('Datos de 2FA no encontrados. Por favor, regístrate de nuevo.');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`${import.meta.env.VITE_SECURITY_API_URL}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, token: totpToken })
      });
      
      if (response.ok) {
        // Validation successful!
        localStorage.setItem('current_user', formData.email);
        onLogin();
        navigate('/');
      } else {
        const data = await response.json();
        setTotpError(data.detail || 'Código inválido. Intenta de nuevo.');
        setIsLoading(false);
      }
    } catch (err) {
      setTotpError('Error de conexión. Verifica tu red.');
      setIsLoading(false);
    }
  };

  const updateFormData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  return (
    <div className="auth-container" style={{ justifyContent: 'center', minHeight: '100vh' }}>
      {/* Header with Back Button */}
      <div style={{ position: 'absolute', top: 40, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-auth-text)', fontWeight: 600 }}>
          <ArrowLeft size={20} />
          Volver
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="auth-logo-icon">
            <img src="/logo.svg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="auth-logo-text" style={{ fontSize: 24 }}>datapyme</div>
        </div>
      </div>

      <div className="animate-in" style={{ width: '100%' }}>
        {!showTwoFactor ? (
          <>
            <h1 className="auth-title">Bienvenido de nuevo</h1>
            <p className="auth-subtitle">Ingresa tus credenciales para acceder a tu ecosistema financiero.</p>

            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label className="auth-label">RNC o Cédula</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="auth-input" 
                    placeholder="000-00000-0"
                    required
                    value={formData.identifier}
                    onChange={(e) => updateFormData({ identifier: e.target.value })}
                    style={{ paddingLeft: 48 }}
                  />
                  <User size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9AA0AD' }} />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Correo electrónico</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    className="auth-input" 
                    placeholder="correo@empresa.com"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    style={{ paddingLeft: 48 }}
                  />
                  <Mail size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9AA0AD' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, marginBottom: 24 }}>
                <ShieldCheck size={18} color="var(--color-auth-accent)" />
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Conexión segura y cifrada</span>
              </div>

              <button 
                type="submit" 
                className={`auth-button ${formData.identifier && formData.email ? 'primary' : ''}`}
                disabled={isLoading || !formData.identifier || !formData.email}
              >
                {isLoading ? 'Accediendo...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="auth-footer-link" style={{ marginTop: 32 }}>
              ¿Aún no eres parte? <span onClick={() => navigate('/register')}>Crea una cuenta</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: 64, height: 64, borderRadius: '50%', 
              background: 'rgba(0, 229, 255, 0.1)', border: '2px solid var(--color-auth-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--color-auth-accent)' 
            }}>
              <ShieldCheck size={32} />
            </div>
            
            <h1 className="auth-title">Verificación en dos pasos</h1>
            <p className="auth-subtitle">Ingresa el código de 6 dígitos generado por tu aplicación Authenticator para verificar tu identidad.</p>
            
            <form onSubmit={handleVerifyTotp} style={{ marginTop: 32 }}>
              <div className="auth-form-group">
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="000000"
                  maxLength={6}
                  required
                  value={totpToken}
                  onChange={(e) => setTotpToken(e.target.value.replace(/\D/g, ''))}
                  style={{ textAlign: 'center', fontSize: 24, letterSpacing: 8, fontWeight: 700, padding: '16px 0' }}
                  autoFocus
                />
              </div>

              {totpError && (
                <div style={{ color: '#e53e3e', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                  {totpError}
                </div>
              )}

              <button 
                type="submit" 
                className={`auth-button ${totpToken.length === 6 ? 'primary' : ''}`}
                disabled={isLoading || totpToken.length !== 6}
                style={{ width: '100%', marginTop: 24 }}
              >
                {isLoading ? 'Verificando...' : 'Verificar y Entrar'}
              </button>

              <button 
                type="button"
                onClick={() => {
                  setShowTwoFactor(false);
                  setTotpToken('');
                  setTotpError('');
                }}
                style={{ 
                  display: 'block', margin: '16px auto 0', background: 'none', border: 'none',
                  color: 'var(--color-text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}
              >
                Volver
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
