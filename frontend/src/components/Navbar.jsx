import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/navbar.css"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      
      <div className="navbar-container">

        {/* Logo / Marca */}
        <div className="navbar-brand">
          <svg className="audi-rings" viewBox="0 0 136 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20"  cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="52"  cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="84"  cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="116" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
          </svg>
          <span>AUDI ANGELOPOLIS</span>
        </div>

        {/* Links Desktop */}
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/dashboards">Dashboards</Link>
        </div>

        {/* Usuario */}
        <div className="navbar-user">
          Gerente Comercial
        </div>

        {/* Botón móvil */}
        <div 
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/">Inicio</Link>
          <Link to="/dashboards">Dashboards</Link>
        </div>
      )}

    </nav>
  )
}