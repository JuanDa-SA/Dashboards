// src/components/DashboardCards.jsx
export default function DashboardCards({ onSelect }) {

  const cards = [
    { 
      title: "Seguimiento de Leads", 
      desc: "Control de prospectos",
      key: "leads"
    },
    { 
      title: "Conversión de Ventas", 
      desc: "Análisis de cierres",
      key: "conversion"
    },
    { 
      title: "Experiencia del Cliente", 
      desc: "Calidad del servicio",
      key: "experiencia"
    },
    { 
      title: "Rendimiento de Asesores", 
      desc: "KPIs por vendedor",
      key: "asesores"
    }
  ]

  return (
    <div className="card-grid">
      {cards.map((c, i) => (
        <div 
          key={i} 
          className="card"
          onClick={() => onSelect(c.key)}
          style={{ cursor: "pointer" }}
        >
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  )
}