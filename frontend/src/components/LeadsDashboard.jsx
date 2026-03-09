import { useState } from "react"

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <span className="sort-icon sort-icon--idle">⇅</span>
  return <span className="sort-icon sort-icon--active">{sortDir === "asc" ? "↑" : "↓"}</span>
}

export default function LeadsDashboard({ leads = [] }) {
  const [search, setSearch]       = useState("")
  const [sortField, setSortField] = useState("fecha_hora_registro")
  const [sortDir, setSortDir]     = useState("desc")

  if (!leads.length) return (
    <p style={{ padding: 40 }}>No hay datos para el período seleccionado.</p>
  )

  // Search
  const q = search.toLowerCase()
  const filtered = leads.filter(lead =>
    (lead.clave_lead             && String(lead.clave_lead).includes(q))              ||
    (lead.nombre_cliente         && lead.nombre_cliente.toLowerCase().includes(q))    ||
    (lead.telefono               && String(lead.telefono).includes(q))                ||
    (lead.canal_origen           && lead.canal_origen.toLowerCase().includes(q))      ||
    (lead.modelo_interes         && lead.modelo_interes.toLowerCase().includes(q))    ||
    (lead.estatus                && lead.estatus.toLowerCase().includes(q))           ||
    (lead.clave_asesor_asignado  && String(lead.clave_asesor_asignado).includes(q))
  )

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField] ?? ""
    const valB = b[sortField] ?? ""

    // Date fields
    if (sortField === "fecha_hora_registro") {
      return sortDir === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA)
    }
    // Numeric fields
    if (sortField === "clave_lead" || sortField === "clave_asesor_asignado") {
      return sortDir === "asc" ? valA - valB : valB - valA
    }
    // String fields
    return sortDir === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA))
  })

  function toggleSort(field) {
    if (sortField === field) {
      setSortDir(d => d === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const th = (label, field) => (
    <th className="sortable-th" onClick={() => toggleSort(field)}>
      {label} <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
    </th>
  )

  return (
    <div className="leads-dashboard">

      <div className="dashboard-description">
        <h2 className="dashboard-description__title">Seguimiento de Leads</h2>
        <p className="dashboard-description__text">
          Registro completo de todos los prospectos captados. Haz clic en cualquier columna
          para ordenar. Usa el buscador para localizar un cliente por nombre, teléfono,
          modelo, estatus o canal de origen.
        </p>
      </div>

      <div className="table-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono, modelo, estatus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="table-search-input"
        />
        {search && (
          <button className="table-search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {sorted.length === 0 ? (
        <p style={{ padding: "20px 0", color: "#9ca3af" }}>No se encontraron resultados para "{search}".</p>
      ) : (
        <table className="tabla-asesores">
          <thead>
            <tr>
              {th("Clave Lead",       "clave_lead")}
              {th("Nombre Cliente",   "nombre_cliente")}
              {th("Teléfono",         "telefono")}
              {th("Canal Origen",     "canal_origen")}
              {th("Modelo Interés",   "modelo_interes")}
              {th("Fecha Registro",   "fecha_hora_registro")}
              {th("Estatus",          "estatus")}
              {th("Asesor Asignado",  "clave_asesor_asignado")}
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((lead) => (
              <tr key={lead.clave_lead}>
                <td>{lead.clave_lead}</td>
                <td>{lead.nombre_cliente}</td>
                <td>{lead.telefono}</td>
                <td>{lead.canal_origen}</td>
                <td>{lead.modelo_interes}</td>
                <td>{new Date(lead.fecha_hora_registro).toLocaleDateString()}</td>
                <td>{lead.estatus}</td>
                <td>{lead.clave_asesor_asignado}</td>
                <td>{lead.comentarios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}