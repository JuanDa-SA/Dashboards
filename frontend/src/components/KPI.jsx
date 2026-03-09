// src/components/KPI.jsx
export default function KPI({ title, value }) {
  return (
    <div className="kpi-card">
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  )
}