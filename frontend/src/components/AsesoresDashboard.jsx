// src/components/AsesoresDashboard.jsx
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <span className="sort-icon sort-icon--idle">⇅</span>
  return <span className="sort-icon sort-icon--active">{sortDir === "asc" ? "↑" : "↓"}</span>
}

export default function AsesoresDashboard({ leads = [] }) {
  const [asesores, setAsesores] = useState([])
  const [search, setSearch]     = useState("")
  const [sortField, setSortField] = useState("conversion")
  const [sortDir, setSortDir]     = useState("desc")

  useEffect(() => {
    supabase.from("asesores").select("*").eq("activo", true)
      .then(({ data }) => setAsesores(data || []))
  }, [])

  if (!leads.length) return (
    <p style={{ padding: 40 }}>No hay datos para el período seleccionado.</p>
  )

  const data = asesores.map(asesor => {
    const leadsAsesor   = leads.filter(l => l.clave_asesor_asignado === asesor.clave_asesor)
    const activos       = leadsAsesor.filter(l => l.estatus === "Activo").length
    const comprados     = leadsAsesor.filter(l => l.estatus === "Comprado").length
    const noInteresados = leadsAsesor.filter(l => l.estatus === "No interesado").length
    const conversion    = activos > 0 ? parseFloat(((comprados / activos) * 100).toFixed(1)) : 0
    return { nombre: asesor.nombre, total: leadsAsesor.length, activos, comprados, noInteresados, conversion }
  })

  // Search
  const q = search.toLowerCase()
  const filtered = data.filter(a =>
    a.nombre.toLowerCase().includes(q)       ||
    String(a.total).includes(q)              ||
    String(a.activos).includes(q)            ||
    String(a.comprados).includes(q)          ||
    String(a.noInteresados).includes(q)      ||
    String(a.conversion).includes(q)
  )

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField]
    const valB = b[sortField]
    if (typeof valA === "string") {
      return sortDir === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }
    return sortDir === "asc" ? valA - valB : valB - valA
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
    <div className="asesores-dashboard">

      <div className="dashboard-description">
        <h2 className="dashboard-description__title">Desempeño por Asesor</h2>
        <p className="dashboard-description__text">
          Compara el rendimiento individual de cada asesor comercial activo. La tabla muestra
          cuántos leads tiene asignados, cuántos siguen en proceso, cuántos cerraron con compra
          y cuántos se perdieron — junto con su <strong>tasa de conversión</strong>. Haz clic
          en cualquier columna para ordenar.
        </p>
      </div>

      <div className="table-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar por nombre, leads, conversión..."
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
              {th("Asesor",           "nombre")}
              {th("Total Leads",      "total")}
              {th("Activos",          "activos")}
              {th("Comprados",        "comprados")}
              {th("No interesados",   "noInteresados")}
              {th("Conversión %",     "conversion")}
            </tr>
          </thead>
          <tbody>
            {sorted.map((a, index) => (
              <tr key={index}>
                <td>{a.nombre}</td>
                <td>{a.total}</td>
                <td>{a.activos}</td>
                <td>{a.comprados}</td>
                <td>{a.noInteresados}</td>
                <td>{a.conversion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}