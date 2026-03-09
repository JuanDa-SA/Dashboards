// src/components/KPIPanel.jsx

import KPI from "./KPI"
import "../styles/kpi.css"

export default function KPIPanel({ leads }) {

  const total = leads.length

  const interesados = leads.filter(
    l => l.estatus === "Activo"
  ).length

  const noInteresados = leads.filter(
    l => l.estatus === "No interesado"
  ).length

  const comprados = leads.filter(
    l => l.estatus === "Comprado"
  ).length

  const conversion = total > 0
    ? ((comprados / total) * 100).toFixed(1)
    : 0

  return (
    <div className="kpi-panel">

      <KPI title="Total Leads" value={total} />

      <KPI title="Interesados" value={interesados} />

      <KPI title="Comprados" value={comprados} />

      <KPI title="No Interesados" value={noInteresados} />

      <KPI title="Conversión" value={`${conversion}%`} />

    </div>
  )
}