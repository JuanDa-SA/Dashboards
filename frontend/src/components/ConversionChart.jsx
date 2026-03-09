// src/components/ConversionChart.jsx
import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function ConversionChart({ leads }) {

  const chartRef      = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // Destroy previous instance always
    if (chartInstance.current) {
      chartInstance.current.destroy()
      chartInstance.current = null
    }

    if (!leads || leads.length === 0) return

    const interesados   = leads.filter(l => l.estatus === "Activo").length
    const noInteresados = leads.filter(l => l.estatus === "No interesado").length
    const comprados     = leads.filter(l => l.estatus === "Comprado").length

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Interesado", "No interesado", "Comprado"],
        datasets: [{
          data: [interesados, noInteresados, comprados],
          backgroundColor: [
            "#3b82f6",
            "#ef4444",
            "#22c55e"
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    })
  }, [leads])

  if (!leads || leads.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
        No hay datos para el período seleccionado.
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "450px", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}