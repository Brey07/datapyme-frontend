import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { 
  BarChart3, 
  ShieldCheck, 
  ChevronRight,
  Database,
  Users
} from 'lucide-react';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;
    const count = 1500;
    const mouse = { x: 0, y: 0 };

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = (Math.random() - 0.5) * 15;

        colors[i] = 0 / 255;      // R: 0
        colors[i + 1] = 229 / 255; // G: 229
        colors[i + 2] = 255 / 255; // B: 255 (var(--color-auth-accent) ish)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Material
      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      animate();
    };

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Subtle mouse interaction
      particles.position.x += (mouse.x * 0.1 - particles.position.x) * 0.05;
      particles.position.y += (mouse.y * 0.1 - particles.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { 
      icon: <Database size={24} />, 
      title: "CMS Inteligente", 
      desc: "Carga automática de formatos 606/607 de la DGII." 
    },
    { 
      icon: <BarChart3 size={24} />, 
      title: "ERP de Liquidez", 
      desc: "Control absoluto de tu flujo de caja en tiempo real." 
    },
    { 
      icon: <Users size={24} />, 
      title: "CRM de Riesgo", 
      desc: "Scoring de proveedores y preparación crediticia." 
    },
    { 
      icon: <ShieldCheck size={24} />, 
      title: "Seguridad Zero-Bias", 
      desc: "Evaluación por IA local cumpliendo la Ley 172-13." 
    }
  ];

  return (
    <div className="landing-container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0A0F1A' }}>
      
      {/* Three.js Background Animation */}
      <ThreeBackground />

      {/* Decorative Gradients */}
      <div style={{ 
        position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)', 
        filter: 'blur(80px)', zIndex: 0 
      }} />
      <div style={{ 
        position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', 
        background: 'radial-gradient(circle, rgba(255, 107, 0, 0.1) 0%, transparent 70%)', 
        filter: 'blur(80px)', zIndex: 0 
      }} />

      {/* Content wrapper */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '40px 24px', 
        display: 'grid', 
        gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr', 
        gap: 60,
        minHeight: '100vh',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Left: Branding & Value Prop */}
        <div className="animate-in" style={{ color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ 
              width: 56, height: 56, borderRadius: 16, background: 'var(--color-primary)', 
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800
            }}>
              <img src="/logo.svg" alt="Logo" style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <span style={{ fontSize: 36, fontWeight: 300, letterSpacing: '-1px' }}>Data<span style={{fontWeight: 700}}>Pyme</span></span>
          </div>

          <h1 style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-2px' }}>
            Tu ecosistema financiero <span style={{ color: 'var(--color-auth-accent)' }}>inteligente</span>.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', marginBottom: 48, maxWidth: 540 }}>
            Simplificamos la gestión de las MIPYMES dominicanas conectando tus reportes de la DGII con inteligencia artificial local para potenciar tu crecimiento.
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-primary btn-lg"
              style={{ padding: '16px 32px', borderRadius: 16, fontSize: 16, background: 'var(--color-auth-accent)', borderColor: 'var(--color-auth-accent)', color: 'var(--color-auth-text)', fontWeight: 700 }}
            >
              Empezar ahora <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-outline btn-lg"
              style={{ padding: '16px 32px', borderRadius: 16, fontSize: 16, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontWeight: 600 }}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Right: Features Summary */}
        <div className="animate-in" style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(20px)',
          borderRadius: 40,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        }}>
          {features.map((f, i) => (
            <div key={i} style={{ color: 'white' }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: 14, background: 'rgba(0, 229, 255, 0.1)', 
                color: 'var(--color-auth-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
          
          <div style={{ 
            gridColumn: '1 / span 2', 
            marginTop: 16, 
            paddingTop: 32, 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <div style={{ display: 'flex', WebkitMaskImage: 'linear-gradient(to right, black, transparent)', maskImage: 'linear-gradient(to right, black, transparent)' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#333', border: '2px solid #555', marginLeft: i > 1 ? -12 : 0 }} />
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
              +500 MIPYMES optimizando su flujo de caja con DataPyme.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
