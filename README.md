# 🚗 Audi Stats — Panel de Inteligencia Comercial

Dashboard web para el seguimiento y análisis del rendimiento comercial de **Audi Angelópolis**. Permite visualizar KPIs, conversión de leads, desempeño por asesor y experiencia del cliente, todo filtrable por período de tiempo.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Funcionalidades](#funcionalidades)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue en Azure](#despliegue-en-azure)

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| React + Vite | Framework frontend |
| React Router DOM | Navegación entre páginas |
| Supabase | Base de datos y autenticación |
| Chart.js | Gráficas de conversión y modelos |
| CSS personalizado | Estilos con identidad visual Audi |

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx                  # Barra de navegación con logo Audi
│   ├── DateFilter.jsx              # Filtro global de fechas (sticky)
│   ├── KPIPanel.jsx                # Tarjetas de indicadores clave
│   ├── ConversionChart.jsx         # Gráfica donut de estatus de leads
│   ├── ModeloInterestChart.jsx     # Gráfica de barras por modelo
│   ├── AsesoresDashboard.jsx       # Tabla de desempeño por asesor
│   ├── LeadsDashboard.jsx          # Tabla completa de leads
│   ├── ConversionSalesTracker.jsx  # Embudo de conversión por canal
│   └── ClientExperienceDashboard.jsx # Métricas de experiencia del cliente
├── context/
│   └── FilterContext.jsx           # Contexto global del filtro de fechas
├── pages/
│   ├── Home.jsx                    # Página de inicio
│   └── Dashboards.jsx              # Página principal de dashboards
├── styles/
│   ├── main.css
│   ├── dashboard.css
│   ├── dashboard_main.css
│   └── datefilter.css
├── lib/
│   └── supabaseClient.js           # Configuración del cliente Supabase
└── App.jsx                         # Rutas y provider global
```

---

## 🗄 Base de Datos

El proyecto usa tres tablas en Supabase:

**`leads`**
| Campo | Tipo | Descripción |
|---|---|---|
| clave_lead | int4 | Identificador único |
| nombre_cliente | varchar | Nombre del prospecto |
| telefono | varchar | Teléfono de contacto |
| canal_origen | varchar | Canal por el que llegó (web, redes, etc.) |
| modelo_interes | varchar | Modelo Audi de interés |
| fecha_hora_registro | timestamp | Fecha de captación |
| estatus | varchar | Activo / Comprado / No interesado |
| clave_asesor_asignado | int4 | Referencia al asesor |
| comentarios | text | Notas adicionales |

**`seguimiento_lead`**
| Campo | Tipo | Descripción |
|---|---|---|
| clave_seguimiento | int4 | Identificador único |
| clave_lead | int4 | Referencia al lead |
| fecha_hora_primer_contacto | timestamp | Primer contacto registrado |
| medio_contacto | varchar | Canal usado (llamada, WhatsApp, etc.) |
| confirmado_por | varchar | Quién confirmó el contacto |
| nota_contacto | text | Notas del seguimiento |

**`asesores`**
| Campo | Tipo | Descripción |
|---|---|---|
| clave_asesor | int4 | Identificador único |
| nombre | varchar | Nombre del asesor |
| activo | bool | Si está activo actualmente |
| fecha_alta | timestamp | Fecha de registro |

---

## ✨ Funcionalidades

### Filtro Global de Fechas
Barra sticky en la parte superior que filtra todos los dashboards simultáneamente. Soporta tres modos:
- **Por año** — selecciona un año específico
- **Por mes** — selecciona mes y año
- **Rango personalizado** — fecha inicio y fecha fin

### Dashboards Detallados

**Asesores** — tabla con desempeño individual de cada asesor: leads asignados, activos, comprados, no interesados y tasa de conversión. Ordenable por cualquier columna y con buscador en tiempo real.

**Leads** — registro completo de todos los prospectos con búsqueda por nombre, teléfono, canal, modelo o estatus. Ordenable por cualquier columna.

**Conversión** — embudo de ventas global y desglose por canal de origen para identificar qué canales generan leads de mayor calidad.

**Experiencia del Cliente** — tiempo promedio de primer contacto, frecuencia de seguimiento, medios de contacto más utilizados y métricas por asesor.

### Gráficas
- **Donut** — distribución de leads por estatus (Activo / No interesado / Comprado)
- **Barras horizontales** — modelos con mayor número de prospectos interesados

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/audi-stats.git
cd audi-stats

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de Supabase

# 4. Iniciar en desarrollo
npm run dev
```

---

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

> ⚠️ **Nunca subas el archivo `.env` al repositorio.** Asegúrate de que esté en tu `.gitignore`.

---

## ☁️ Despliegue en Azure

1. Genera el build de producción:
```bash
npm run build
```

2. En el portal de Azure, ve a tu servicio (Static Web App o App Service) y configura las variables de entorno en **Configuration → Application settings**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. Sube la carpeta `/dist` generada o conecta el repositorio para despliegue automático.

---

## 👤 Autor

Desarrollado para **Audi Angelópolis** — Panel de Rendimiento Comercial.
