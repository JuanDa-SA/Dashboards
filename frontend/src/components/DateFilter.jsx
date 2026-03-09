// src/components/DateFilter.jsx
import { useFilter } from "../context/FilterContext"
import "../styles/datefilter.css"

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

export default function DateFilter() {
  const {
    mode, setMode,
    year, setYear,
    month, setMonth,
    startDate, setStartDate,
    endDate, setEndDate,
    filterLabel,
    MONTH_NAMES,
  } = useFilter()

  return (
    <div className="date-filter-bar">
      <div className="date-filter-inner">

        {/* Label */}
        <span className="date-filter-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8"  y1="2" x2="8"  y2="6"/>
            <line x1="3"  y1="10" x2="21" y2="10"/>
          </svg>
          Filtrar por
        </span>

        {/* Mode toggle */}
        <div className="date-filter-toggle">
          <button
            className={`toggle-btn ${mode === "year"  ? "toggle-btn--active" : ""}`}
            onClick={() => setMode("year")}
          >
            Año
          </button>
          <button
            className={`toggle-btn ${mode === "month" ? "toggle-btn--active" : ""}`}
            onClick={() => setMode("month")}
          >
            Mes
          </button>
          <button
            className={`toggle-btn ${mode === "range" ? "toggle-btn--active" : ""}`}
            onClick={() => setMode("range")}
          >
            Rango
          </button>
        </div>

        {/* Year only */}
        {mode === "year" && (
          <select
            className="date-filter-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        )}

        {/* Month + Year */}
        {mode === "month" && (
          <div className="date-filter-range">
            <select
              className="date-filter-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {MONTH_NAMES.map((name, i) => (
                <option key={i} value={i}>{name}</option>
              ))}
            </select>
            <select
              className="date-filter-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {/* Range inputs */}
        {mode === "range" && (
          <div className="date-filter-range">
            <input
              type="date"
              className="date-filter-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="date-filter-arrow">→</span>
            <input
              type="date"
              className="date-filter-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}

        {/* Active filter badge */}
        <span className="date-filter-badge">{filterLabel()}</span>

      </div>
    </div>
  )
}
