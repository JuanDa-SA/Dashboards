import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ClientExperienceDashboard({ leads = [], seguimientos = [] }) {
  const [asesores, setAsesores] = useState([]);

  useEffect(() => {
    supabase.from("asesores").select("*").then(({ data }) => setAsesores(data || []));
  }, []);

  const experienceData = useMemo(() => {
    const totalLeads = leads.length;

    // 1. Tiempo promedio a primer contacto
    let totalTimeToContact = 0;
    let leadsWithContact = 0;

    leads.forEach((lead) => {
      const seg = seguimientos.find((s) => s.clave_lead === lead.clave_lead);
      if (seg && seg.fecha_hora_primer_contacto) {
        const diff = (new Date(seg.fecha_hora_primer_contacto) - new Date(lead.fecha_hora_registro)) / (1000 * 60 * 60);
        if (diff >= 0) { totalTimeToContact += diff; leadsWithContact++; }
      }
    });

    const avgTimeToContact = leadsWithContact > 0
      ? (totalTimeToContact / leadsWithContact).toFixed(1) : 0;

    // 2. Frecuencia de seguimiento por lead
    let totalSeguimientos = 0;
    let leadsWithSeguimiento = 0;
    const conteoSeguimientos = {};

    seguimientos.forEach((seg) => {
      if (!conteoSeguimientos[seg.clave_lead]) { conteoSeguimientos[seg.clave_lead] = 0; leadsWithSeguimiento++; }
      conteoSeguimientos[seg.clave_lead]++;
      totalSeguimientos++;
    });

    const avgFollowUpsPerLead = leadsWithSeguimiento > 0
      ? (totalSeguimientos / leadsWithSeguimiento).toFixed(1) : 0;

    // 3. Medios de contacto
    const mediosContacto = {};
    seguimientos.forEach((seg) => {
      const medio = seg.medio_contacto || "No especificado";
      mediosContacto[medio] = (mediosContacto[medio] || 0) + 1;
    });

    const datosMedios = Object.entries(mediosContacto)
      .map(([medio, count]) => ({
        medio, count,
        percentage: totalSeguimientos > 0 ? ((count / totalSeguimientos) * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // 4. Experiencia por Asesor
    const experienciaPorAsesor = asesores
      .filter((a) => a.activo)
      .map((asesor) => {
        const leadsAsesor = leads.filter((l) => l.clave_asesor_asignado === asesor.clave_asesor);
        let tiempoPromedio = 0, conteoTiempos = 0;

        leadsAsesor.forEach((lead) => {
          const seg = seguimientos.find((s) => s.clave_lead === lead.clave_lead);
          if (seg && seg.fecha_hora_primer_contacto) {
            const diff = (new Date(seg.fecha_hora_primer_contacto) - new Date(lead.fecha_hora_registro)) / (1000 * 60 * 60);
            if (diff >= 0) { tiempoPromedio += diff; conteoTiempos++; }
          }
        });

        const seguimientosAsesor = seguimientos.filter((s) => {
          const lead = leads.find((l) => l.clave_lead === s.clave_lead);
          return lead && lead.clave_asesor_asignado === asesor.clave_asesor;
        });

        const comprados = leadsAsesor.filter((l) => l.estatus === "Comprado").length;

        return {
          nombre: asesor.nombre,
          leadsAsignados: leadsAsesor.length,
          totalSeguimientos: seguimientosAsesor.length,
          avgFollowUps: leadsAsesor.length > 0 ? (seguimientosAsesor.length / leadsAsesor.length).toFixed(1) : 0,
          avgTimeToContact: conteoTiempos > 0 ? (tiempoPromedio / conteoTiempos).toFixed(1) : "N/A",
          leadsComprados: comprados,
          conversionRate: leadsAsesor.length > 0 ? ((comprados / leadsAsesor.length) * 100).toFixed(1) : 0,
        };
      })
      .sort((a, b) => b.conversionRate - a.conversionRate);

    // 5. Leads sin seguimiento
    const leadsWithSeguimientoSet = new Set(seguimientos.map((s) => s.clave_lead));
    const leadsWithoutFollowUp = leads.filter((l) => !leadsWithSeguimientoSet.has(l.clave_lead)).length;

    return {
      resumen: { totalLeads, leadsWithFollowUp: leadsWithSeguimiento, leadsWithoutFollowUp, avgTimeToContact, avgFollowUpsPerLead, totalFollowUps: totalSeguimientos },
      medios: datosMedios,
      asesores: experienciaPorAsesor,
    };
  }, [leads, seguimientos, asesores]);

  if (!leads.length) return <p style={{ padding: 40 }}>No hay datos para el período seleccionado.</p>;

  return (
    <div className="experience-dashboard">

      {/* ── Descripción principal ── */}
      <div className="dashboard-description">
        <h2 className="dashboard-description__title">Experiencia del Cliente</h2>
        <p className="dashboard-description__text">
          Mide la calidad del servicio que recibe cada prospecto desde que entra al sistema.
          Analiza qué tan rápido son contactados, con qué frecuencia se les da seguimiento
          y a través de qué canales — todo para detectar brechas en la atención y mejorar
          la experiencia de compra.
        </p>
      </div>

      {/* Resumen General */}
      <div className="conversion-summary">
        <div className="summary-card">
          <h4>Total Leads</h4>
          <p className="big-number">{experienceData.resumen.totalLeads}</p>
        </div>
        <div className="summary-card">
          <h4>Con Seguimiento</h4>
          <p className="big-number">{experienceData.resumen.leadsWithFollowUp}</p>
          <small>
            {experienceData.resumen.totalLeads > 0
              ? ((experienceData.resumen.leadsWithFollowUp / experienceData.resumen.totalLeads) * 100).toFixed(1)
              : 0}%
          </small>
        </div>
        <div className="summary-card">
          <h4>Sin Seguimiento ⚠️</h4>
          <p className="big-number">{experienceData.resumen.leadsWithoutFollowUp}</p>
          <small>Requiere atención</small>
        </div>
        <div className="summary-card">
          <h4>Tiempo Promedio a Contacto</h4>
          <p className="big-number">{experienceData.resumen.avgTimeToContact}h</p>
          <small>Horas</small>
        </div>
        <div className="summary-card">
          <h4>Seguimientos por Lead</h4>
          <p className="big-number">{experienceData.resumen.avgFollowUpsPerLead}</p>
          <small>Promedio</small>
        </div>
        <div className="summary-card">
          <h4>Total Seguimientos</h4>
          <p className="big-number">{experienceData.resumen.totalFollowUps}</p>
        </div>
      </div>

      {/* ── Medios de Contacto ── */}
      <div className="dashboard-description" style={{ marginTop: "40px" }}>
        <h3 className="dashboard-description__title">Medios de Contacto Utilizados</h3>
        <p className="dashboard-description__text">
          Muestra qué canales usa el equipo para comunicarse con los prospectos — llamada,
          WhatsApp, correo, etc. Identifica cuál es el más frecuente y si el equipo está
          diversificando o concentrando sus esfuerzos en un solo medio.
        </p>
      </div>
      <table className="tabla-asesores">
        <thead>
          <tr>
            <th>Medio</th>
            <th>Cantidad</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {experienceData.medios.map((item, index) => (
            <tr key={index}>
              <td>{item.medio}</td>
              <td>{item.count}</td>
              <td>{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Experiencia por Asesor ── */}
      <div className="dashboard-description" style={{ marginTop: "40px" }}>
        <h3 className="dashboard-description__title">Experiencia del Cliente por Asesor</h3>
        <p className="dashboard-description__text">
          Desglosa el nivel de atención que brinda cada asesor: cuántos seguimientos hace,
          qué tan rápido contacta a sus leads y cuál es su tasa de conversión. Permite
          comparar quién está ofreciendo una mejor experiencia y cuáles asesores necesitan
          refuerzo en su proceso de atención.
        </p>
      </div>
      <table className="tabla-asesores">
        <thead>
          <tr>
            <th>Asesor</th>
            <th>Leads Asignados</th>
            <th>Total Seguimientos</th>
            <th>Seguimientos/Lead</th>
            <th>Tiempo a Contacto (h)</th>
            <th>Comprados</th>
            <th>Tasa Conversión</th>
          </tr>
        </thead>
        <tbody>
          {experienceData.asesores.map((asesor, index) => (
            <tr key={index}>
              <td>{asesor.nombre}</td>
              <td>{asesor.leadsAsignados}</td>
              <td>{asesor.totalSeguimientos}</td>
              <td>{asesor.avgFollowUps}</td>
              <td>{asesor.avgTimeToContact !== "N/A" ? `${asesor.avgTimeToContact}h` : asesor.avgTimeToContact}</td>
              <td>{asesor.leadsComprados}</td>
              <td>{asesor.conversionRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}