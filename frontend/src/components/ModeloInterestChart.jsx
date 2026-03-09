import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export default function ModeloInterestChart({ leads }) {

  const chartRef      = useRef(null)
  const chartInstance = useRef(null)

  const colors = [
    "#111",
    "#2563eb",
    "#dc2626",
    "#22c55e",
    "#f59e0b",
    "#7c3aed"
  ]

  useEffect(() => {
    // Destroy previous instance always
    if (chartInstance.current) {
      chartInstance.current.destroy()
      chartInstance.current = null
    }

    if (!leads || leads.length === 0) return

    const modeloCount = {}
    leads.forEach(lead => {
      const modelo = lead.modelo_interes || "Sin especificar"
      modeloCount[modelo] = (modeloCount[modelo] || 0) + 1
    })

    const modelosOrdenados = Object.entries(modeloCount).sort((a, b) => b[1] - a[1])
    const labels = modelosOrdenados.map(item => item[0])
    const data   = modelosOrdenados.map(item => item[1])

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Leads por Modelo",
          data,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { beginAtZero: true }
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
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}