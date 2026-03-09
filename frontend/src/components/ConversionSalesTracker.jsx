import { useMemo } from "react";

export default function ConversionSalesTracker({ leads = [] }) {

  const conversionData = useMemo(() => {
    const totalLeads         = leads.length;
    const leadsActivos       = leads.filter((l) => l.estatus === "Activo").length;
    const leadsComprados     = leads.filter((l) => l.estatus === "Comprado").length;
    const leadsNoInteresados = leads.filter((l) => l.estatus === "No interesado").length;

    const conversionActivo = totalLeads > 0 ? ((leadsActivos / totalLeads) * 100).toFixed(2) : 0;
    const conversionCompra = totalLeads > 0 ? ((leadsComprados / totalLeads) * 100).toFixed(2) : 0;
    const tasaConversion   = leadsActivos > 0 ? ((leadsComprados / leadsActivos) * 100).toFixed(2) : 0;

    const porCanal = {};
    leads.forEach((lead) => {
      const canal = lead.canal_origen || "Sin especificar";
      if (!porCanal[canal]) porCanal[canal] = { total: 0, activos: 0, comprados: 0, noInteresados: 0 };
      porCanal[canal].total++;
      if (lead.estatus === "Activo")        porCanal[canal].activos++;
      if (lead.estatus === "Comprado")      porCanal[canal].comprados++;
      if (lead.estatus === "No interesado") porCanal[canal].noInteresados++;
    });

    const datosCanal = Object.entries(porCanal).map(([canal, datos]) => ({
      canal,
      total: datos.total,
      activos: datos.activos,
      comprados: datos.comprados,
      noInteresados: datos.noInteresados,
      conversionActivo: ((datos.activos / datos.total) * 100).toFixed(2),
      conversionCompra: ((datos.comprados / datos.total) * 100).toFixed(2),
      tasaConversion: datos.activos > 0 ? ((datos.comprados / datos.activos) * 100).toFixed(2) : 0,
    }));

    return {
      resumen: { totalLeads, leadsActivos, leadsComprados, leadsNoInteresados, conversionActivo, conversionCompra, tasaConversion },
      porCanal: datosCanal,
    };
  }, [leads]);

  if (!leads.length) return <p style={{ padding: 40 }}>No hay datos para el período seleccionado.</p>;

  return (
    <div className="conversion-tracker">

      {/* ── Descripción principal ── */}
      <div className="dashboard-description">
        <h2 className="dashboard-description__title">Conversión de Ventas</h2>
        <p className="dashboard-description__text">
          Muestra el estado global del embudo de ventas: cuántos leads entraron, cuántos
          siguen activos, cuántos concretaron una compra y cuántos se perdieron. El indicador
          clave es la <strong>tasa de conversión</strong> — el porcentaje de leads activos
          que terminaron comprando — que refleja la eficiencia real del proceso comercial.
        </p>
      </div>

      {/* Resumen General */}
      <div className="conversion-summary">
        <div className="summary-card">
          <h4>Total Leads</h4>
          <p className="big-number">{conversionData.resumen.totalLeads}</p>
        </div>
        <div className="summary-card">
          <h4>Activos</h4>
          <p className="big-number">{conversionData.resumen.leadsActivos}</p>
          <small>{conversionData.resumen.conversionActivo}%</small>
        </div>
        <div className="summary-card">
          <h4>Comprados</h4>
          <p className="big-number">{conversionData.resumen.leadsComprados}</p>
          <small>{conversionData.resumen.conversionCompra}%</small>
        </div>
        <div className="summary-card">
          <h4>Tasa Conversión</h4>
          <p className="big-number">{conversionData.resumen.tasaConversion}%</p>
          <small>Activos → Comprados</small>
        </div>
        <div className="summary-card">
          <h4>No Interesados</h4>
          <p className="big-number">{conversionData.resumen.leadsNoInteresados}</p>
        </div>
      </div>

      {/* ── Tabla por Canal ── */}
      <div className="dashboard-description" style={{ marginTop: "40px" }}>
        <h3 className="dashboard-description__title">Conversión por Canal de Origen</h3>
        <p className="dashboard-description__text">
          Compara el rendimiento de cada canal por el que llegan los prospectos — redes
          sociales, sitio web, referidos, etc. Permite identificar cuáles canales traen
          leads de mayor calidad (los que más convierten) y cuáles generan volumen pero
          poca venta, para optimizar la inversión en marketing.
        </p>
      </div>
      <table className="tabla-asesores">
        <thead>
          <tr>
            <th>Canal</th>
            <th>Total Leads</th>
            <th>Activos</th>
            <th>% Activos</th>
            <th>Comprados</th>
            <th>% Compra (Total)</th>
            <th>Tasa Conversión</th>
          </tr>
        </thead>
        <tbody>
          {conversionData.porCanal.map((item, index) => (
            <tr key={index}>
              <td>{item.canal}</td>
              <td>{item.total}</td>
              <td>{item.activos}</td>
              <td>{item.conversionActivo}%</td>
              <td>{item.comprados}</td>
              <td>{item.conversionCompra}%</td>
              <td>{item.tasaConversion}%</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}