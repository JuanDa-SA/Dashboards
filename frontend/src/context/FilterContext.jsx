// src/context/FilterContext.jsx
import { createContext, useContext, useState } from "react"

const FilterContext = createContext(null)

const MONTH_NAMES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
]

export function FilterProvider({ children }) {
  const now          = new Date()
  const currentYear  = now.getFullYear()
  const currentMonth = now.getMonth() // 0-11

  // mode: "year" | "month" | "range"
  const [mode, setMode]           = useState("year")
  const [year, setYear]           = useState(currentYear)
  const [month, setMonth]         = useState(currentMonth)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate]     = useState("")

  function filterByDate(records, dateField = "fecha_hora_registro") {
    if (!records) return []

    return records.filter((r) => {
      const val = r[dateField]
      if (!val) return false
      const date = new Date(val)

      if (mode === "year") {
        return date.getFullYear() === year
      }

      if (mode === "month") {
        return date.getFullYear() === year && date.getMonth() === month
      }

      if (mode === "range") {
        const start = startDate ? new Date(startDate)               : null
        const end   = endDate   ? new Date(endDate + "T23:59:59")   : null
        if (start && date < start) return false
        if (end   && date > end)   return false
        return true
      }

      return true
    })
  }

  function filterLabel() {
    if (mode === "year")  return `Año ${year}`
    if (mode === "month") return `${MONTH_NAMES[month]} ${year}`
    if (mode === "range") {
      if (startDate && endDate) return `${startDate} → ${endDate}`
      if (startDate)            return `Desde ${startDate}`
      if (endDate)              return `Hasta ${endDate}`
    }
    return "Sin filtro"
  }

  return (
    <FilterContext.Provider value={{
      mode, setMode,
      year, setYear,
      month, setMonth,
      startDate, setStartDate,
      endDate, setEndDate,
      filterByDate,
      filterLabel,
      MONTH_NAMES,
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}