import React from "react";
import "../styles/Home.css"

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-subtitle">Solución Inteligente para tu Dealership</span>
            <h1>Domina tus Ventas con Datos en Tiempo Real</h1>
            <p>
              Transforma leads en oportunidades. Análisis avanzados, seguimiento completo y 
              conversión optimizada para maximizar el rendimiento de tu equipo de ventas.
            </p>
            <div className="hero-buttons">
              <button className="hero-btn primary">Acceder al Dashboard</button>
              <button className="hero-btn secondary">Conocer más</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/Audi-Ange.avif" alt="Audi Dashboard" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="features-header">
          <h2>¿Por qué elegir nuestra plataforma?</h2>
          <p>Herramientas diseñadas específicamente para dealers de alto rendimiento</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 30V10M10 10L20 20M10 10L30 30M30 30H20M30 30V10" stroke="#bb0a1e" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Análisis de Conversión</h3>
            <p>Monitorea cada etapa del funnel de ventas con métricas precisas y accionables.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="15" stroke="#bb0a1e" strokeWidth="2"/>
                <path d="M20 12V20L28 28" stroke="#bb0a1e" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Seguimiento en Vivo</h3>
            <p>Control total sobre leads y seguimientos con actualizaciones en tiempo real.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="8" y="12" width="8" height="20" stroke="#bb0a1e" strokeWidth="2"/>
                <rect x="18" y="8" width="8" height="24" stroke="#bb0a1e" strokeWidth="2"/>
                <rect x="28" y="14" width="8" height="18" stroke="#bb0a1e" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Rendimiento por Asesor</h3>
            <p>Identifica top performers y optimiza estrategias basadas en datos reales.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30" stroke="#bb0a1e" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="8" fill="#bb0a1e" opacity="0.2"/>
              </svg>
            </div>
            <h3>Experiencia del Cliente</h3>
            <p>Mejora la satisfacción con análisis detallado de interacciones y tiempos de respuesta.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 20L18 30L32 10" stroke="#bb0a1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Validación de Datos</h3>
            <p>Información verificada y consistente para decisiones seguras y confiables.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="10" y="8" width="20" height="24" rx="2" stroke="#bb0a1e" strokeWidth="2"/>
                <line x1="10" y1="28" x2="30" y2="28" stroke="#bb0a1e" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Interface Elegante</h3>
            <p>Diseño premium y fácil de usar, inspirado en las mejores marcas globales.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Listo para transformar tu dealership</h2>
        <p>Únete a nuestros clientes que ya incrementan sus ventas</p>
        <button className="cta-btn">Solicitar Demo</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 Dashboard Inteligente. Diseñado para dealers premium.</p>
      </footer>
    </div>
  )
}
