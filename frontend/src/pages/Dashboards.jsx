// src/pages/Dashboards.jsx
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useFilter } from "../context/FilterContext"

import DateFilter from "../components/DateFilter"
import KPIPanel from "../components/KPIPanel"
import ConversionChart from "../components/ConversionChart"
import AsesoresDashboard from "../components/AsesoresDashboard"
import ModeloInterestChart from "../components/ModeloInterestChart"
import LeadsDashboard from "../components/LeadsDashboard"
import ConversionSalesTracker from "../components/ConversionSalesTracker"
import ClientExperienceDashboard from "../components/ClientExperienceDashboard"

import "../styles/main.css"
import "../styles/dashboard.css"
import "../styles/dashboard_main.css"
import "../styles/Datefilter.css"

const DASHBOARD_OPTIONS = [
  { key: "asesores",    label: "Asesores" },
  { key: "leads",       label: "Leads" },
  { key: "conversion",  label: "Conversión" },
  { key: "experiencia", label: "Experiencia" },
]

export default function Dashboards() {
  const [leads, setLeads]               = useState([])
  const [seguimientos, setSeguimientos] = useState([])
  const [loading, setLoading]           = useState(true)
  const [selectedDashboard, setSelectedDashboard] = useState("asesores")

  const { filterByDate } = useFilter()

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const { data: leadsData }       = await supabase.from("leads").select("*")
    const { data: seguimientoData } = await supabase.from("seguimiento_lead").select("*")

    setLeads(leadsData || [])
    setSeguimientos(seguimientoData || [])
    setLoading(false)
  }

  if (loading) return (
    <div className="page-loader">
      <div className="loader-ring" />
      <span>Cargando dashboard…</span>
    </div>
  )

  // ── Apply global filter ──
  const filteredLeads        = filterByDate(leads)
  const filteredSeguimientos = filterByDate(seguimientos, "fecha_hora_contacto")

  return (
    <div className="page-root">

      {/* Sticky filter bar */}
      <DateFilter />

      <main className="page-content">

        {/* ── KPIs ── */}
        <section className="section">
          <KPIPanel leads={filteredLeads} seguimientos={filteredSeguimientos} />
        </section>

        {/* ── Charts row ── */}
        <section className="section charts-row">
          <div className="chart-block">
            <div className="section-label">Conversión de Leads</div>
            <ConversionChart leads={filteredLeads} />
          </div>
          <div className="chart-block">
            <div className="section-label">Modelos con Mayor Interés</div>
            <ModeloInterestChart leads={filteredLeads} />
          </div>
        </section>

        {/* ── Dashboards con tabs ── */}
        <section className="section">
          <div className="section-header">
            <div className="section-label">Dashboards Detallados</div>
          </div>

          <div className="tab-strip">
            {DASHBOARD_OPTIONS.map(opt => (
              <button
                key={opt.key}
                className={`tab-btn ${selectedDashboard === opt.key ? "tab-btn--active" : ""}`}
                onClick={() => setSelectedDashboard(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="dashboard-panel">
            {selectedDashboard === "asesores"    && <AsesoresDashboard         leads={filteredLeads} seguimientos={filteredSeguimientos} />}
            {selectedDashboard === "leads"       && <LeadsDashboard            leads={filteredLeads} />}
            {selectedDashboard === "conversion"  && <ConversionSalesTracker    leads={filteredLeads} seguimientos={filteredSeguimientos} />}
            {selectedDashboard === "experiencia" && <ClientExperienceDashboard leads={filteredLeads} seguimientos={filteredSeguimientos} />}
          </div>
        </section>

      </main>

      <footer className="page-footer">
        <span>© {new Date().getFullYear()} Audi · Datos actualizados en tiempo real</span>
      </footer>
    </div>
  )
}