// Mock Financial Data for DataPyme Demo
// Simulates DGII 606/607 processed data for a Dominican SME

const userEmail = localStorage.getItem('current_user');
const hasData = localStorage.getItem(`has_data_${userEmail}`) === 'true';
export const empresaActual = {
  nombre: 'Distribuidora El Caribe S.R.L.',
  rnc: '1-31-12345-8',
  sector: 'Comercio al por mayor',
  municipio: 'Santo Domingo Este',
  desde: 'Enero 2023',
};

// KPIs principales
export const kpisPrincipales = hasData ? {
  capitalTrabajo: 485250,
  ratioCirculante: 1.38,
  flujoCaja: 124800,
  ingresosReales: 892000,
  gastosOperativos: 407200,
  margenBruto: 28.4,
  scoreCrediticio: 72,
  totalTransacciones606: 148,
  totalTransacciones607: 203,
} : {
  capitalTrabajo: 0,
  ratioCirculante: 0,
  flujoCaja: 0,
  ingresosReales: 0,
  gastosOperativos: 0,
  margenBruto: 0,
  scoreCrediticio: 0,
  totalTransacciones606: 0,
  totalTransacciones607: 0,
};

// Serie mensual (12 meses) para gráficas
export const seriesMensual = hasData ? [
  { mes: 'Ene', ingresos: 68000, gastos: 52000, flujo: 16000 },
  { mes: 'Feb', ingresos: 72000, gastos: 55000, flujo: 17000 },
  { mes: 'Mar', ingresos: 65000, gastos: 58000, flujo: 7000  },
  { mes: 'Abr', ingresos: 80000, gastos: 49000, flujo: 31000 },
  { mes: 'May', ingresos: 85000, gastos: 61000, flujo: 24000 },
  { mes: 'Jun', ingresos: 91000, gastos: 63000, flujo: 28000 },
  { mes: 'Jul', ingresos: 78000, gastos: 72000, flujo: 6000  },
  { mes: 'Ago', ingresos: 88000, gastos: 60000, flujo: 28000 },
  { mes: 'Sep', ingresos: 95000, gastos: 65000, flujo: 30000 },
  { mes: 'Oct', ingresos: 102000,gastos: 68000, flujo: 34000 },
  { mes: 'Nov', ingresos: 84000, gastos: 71000, flujo: 13000 },
  { mes: 'Dic', ingresos: 892000,gastos: 407200,flujo: 124800},
] : [
  { mes: 'Ene', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Feb', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Mar', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Abr', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'May', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Jun', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Jul', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Ago', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Sep', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Oct', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Nov', ingresos: 0, gastos: 0, flujo: 0 },
  { mes: 'Dic', ingresos: 0, gastos: 0, flujo: 0 },
];

// Cuentas por pagar (606)
export const cuentasPagar = hasData ? [
  { id: 1, ncf: 'B0100000123', proveedor: 'Importadora RD S.A.',      rnc: '1-01-23456-1', monto: 48500,  itbis: 8730,  fecha: '2024-11-15', vencimiento: '2024-12-15', estado: 'pendiente', tipo: 'Mercancía' },
  { id: 2, ncf: 'B0100000456', proveedor: 'Distribuidora Norte',       rnc: '1-31-44321-5', monto: 12000,  itbis: 2160,  fecha: '2024-11-20', vencimiento: '2024-12-20', estado: 'pendiente', tipo: 'Suministros' },
  { id: 3, ncf: 'B0100000789', proveedor: 'EDE Este',                  rnc: '1-01-00001-8', monto: 8500,   itbis: 0,     fecha: '2024-11-01', vencimiento: '2024-11-30', estado: 'vencido',   tipo: 'Servicios' },
  { id: 4, ncf: 'B0100001011', proveedor: 'Grupo Corripio',            rnc: '1-01-22345-2', monto: 35000,  itbis: 6300,  fecha: '2024-11-25', vencimiento: '2024-12-25', estado: 'pagado',    tipo: 'Mercancía' },
  { id: 5, ncf: 'B0100001234', proveedor: 'Transporte Expreso RD',     rnc: '1-22-88901-0', monto: 6200,   itbis: 1116,  fecha: '2024-11-28', vencimiento: '2024-12-28', estado: 'pendiente', tipo: 'Logística'  },
  { id: 6, ncf: 'B0100001567', proveedor: 'Claro RD',                  rnc: '1-01-00012-3', monto: 4500,   itbis: 810,   fecha: '2024-11-05', vencimiento: '2024-12-05', estado: 'pagado',    tipo: 'Comunicaciones' },
] : [];

// Cuentas por cobrar (607)
export const cuentasCobrar = hasData ? [
  { id: 1, ncf: 'B0100002001', cliente: 'Supermercado La Fe',     rnc: '1-01-55432-9', monto: 95000,  itbis: 17100, fecha: '2024-11-10', vencimiento: '2025-01-10', estado: 'credito',  tipo: 'Venta mayorista' },
  { id: 2, ncf: 'B0100002002', cliente: 'Colmado El Buen Precio', rnc: '1-31-77654-2', monto: 18500,  itbis: 3330,  fecha: '2024-11-18', vencimiento: '2024-12-18', estado: 'cobrado',  tipo: 'Venta mayorista' },
  { id: 3, ncf: 'B0100002003', cliente: 'Mini Market Hermanos',   rnc: '1-22-33210-4', monto: 22000,  itbis: 3960,  fecha: '2024-11-22', vencimiento: '2024-12-22', estado: 'pendiente',tipo: 'Venta minorista' },
  { id: 4, ncf: 'B0100002004', cliente: 'Hotel Catalonia',        rnc: '1-01-88765-1', monto: 145000, itbis: 0,     fecha: '2024-11-01', vencimiento: '2025-02-01', estado: 'credito',  tipo: 'Hospitalidad' },
  { id: 5, ncf: 'B0100002005', cliente: 'Tienda La Moderna',      rnc: '1-31-44109-7', monto: 31000,  itbis: 5580,  fecha: '2024-11-28', vencimiento: '2024-12-28', estado: 'pendiente',tipo: 'Venta minorista' },
] : [];

// Proveedores con scoring
export const proveedores = hasData ? [
  { id: 1, nombre: 'Importadora RD S.A.',    rnc: '1-01-23456-1', score: 82, riesgo: 'bajo',  plazo: '30 días',  totalCompras: 485000, frecuencia: 'Mensual',   alerta: false },
  { id: 2, nombre: 'Distribuidora Norte',    rnc: '1-31-44321-5', score: 71, riesgo: 'medio', plazo: '30 días',  totalCompras: 180000, frecuencia: 'Quincenal', alerta: false },
  { id: 3, nombre: 'EDE Este',               rnc: '1-01-00001-8', score: 45, riesgo: 'alto',  plazo: 'Contado',  totalCompras: 102000, frecuencia: 'Mensual',   alerta: true  },
  { id: 4, nombre: 'Grupo Corripio',         rnc: '1-01-22345-2', score: 90, riesgo: 'bajo',  plazo: '45 días',  totalCompras: 660000, frecuencia: 'Semanal',   alerta: false },
  { id: 5, nombre: 'Transporte Expreso RD',  rnc: '1-22-88901-0', score: 58, riesgo: 'medio', plazo: '15 días',  totalCompras: 74400,  frecuencia: 'Mensual',   alerta: true  },
] : [];

// Pipeline de cobranza
export const pipelineCobranza = hasData ? {
  facturado: [
    { id: 1, cliente: 'Supermercado La Fe', monto: 95000, dias: 20, ncf: 'B0100002001' },
    { id: 2, cliente: 'Hotel Catalonia',    monto: 145000,dias: 30, ncf: 'B0100002004' },
  ],
  vencido: [
    { id: 3, cliente: 'Mini Market Hermanos', monto: 22000, dias: 5,  ncf: 'B0100002003' },
    { id: 4, cliente: 'Tienda La Moderna',    monto: 31000, dias: 2,  ncf: 'B0100002005' },
  ],
  cobrado: [
    { id: 5, cliente: 'Colmado El Buen Precio', monto: 18500, dias: 0, ncf: 'B0100002002' },
  ],
} : {
  facturado: [],
  vencido: [],
  cobrado: []
};

// Preparación crediticia (loan readiness)
export const creditReadiness = hasData ? {
  score: 72,
  items: [
    { label: 'Estados financieros actualizados',   completo: true,  peso: 20 },
    { label: 'RNC activo y al día con DGII',       completo: true,  peso: 15 },
    { label: 'Ratio Circulante ≥ 1.2',             completo: true,  peso: 20 },
    { label: 'Historial de flujo de caja (6 meses)',completo: true, peso: 15 },
    { label: 'Referencias comerciales registradas', completo: false, peso: 10 },
    { label: 'Capital social declarado ≥ RD$100k', completo: false, peso: 10 },
    { label: 'Sin embargos o litigios activos',    completo: true,  peso: 10 },
  ],
} : {
  score: 0,
  items: [
    { label: 'Estados financieros actualizados',   completo: false, peso: 20 },
    { label: 'RNC activo y al día con DGII',       completo: false, peso: 15 },
    { label: 'Ratio Circulante ≥ 1.2',             completo: false, peso: 20 },
    { label: 'Historial de flujo de caja (6 meses)',completo: false, peso: 15 },
    { label: 'Referencias comerciales registradas', completo: false, peso: 10 },
    { label: 'Capital social declarado ≥ RD$100k', completo: false, peso: 10 },
    { label: 'Sin embargos o litigios activos',    completo: false, peso: 10 },
  ],
};

// Evaluaciones recientes
export const evaluacionesRecientes = hasData ? [
  { id: 1, empresa: 'Distribuidora El Caribe',  tipo: 'Análisis de Liquidez',      estado: 'aprobado',  tiempo: '1.4h', initial: 'D' },
  { id: 2, empresa: 'Colmado Los Hermanos',     tipo: 'Revisión Flujo de Caja',    estado: 'pendiente', tiempo: '0.8h', initial: 'C' },
  { id: 3, empresa: 'Moda Criolla S.R.L.',      tipo: 'Preparación Crediticia',    estado: 'revision',  tiempo: '2.1h', initial: 'M' },
  { id: 4, empresa: 'Tech RD Solutions',        tipo: 'Análisis DGII 606/607',     estado: 'aprobado',  tiempo: '1.2h', initial: 'T' },
  { id: 5, empresa: 'Ferretería El Constructor',tipo: 'Scoring de Proveedores',    estado: 'pendiente', tiempo: '0.5h', initial: 'F' },
] : [];

// Workflows n8n
export const n8nWorkflows = hasData ? [
  { id: 1, nombre: 'ETL DGII 606/607',           estado: 'activo',   ultimaEjecucion: '2024-11-28 18:45', exitoso: true,  ejecuciones: 248 },
  { id: 2, nombre: 'Filtro Anonimización ZeroBias',estado: 'activo',  ultimaEjecucion: '2024-11-28 18:45', exitoso: true,  ejecuciones: 248 },
  { id: 3, nombre: 'Alertas Cobranza Auto',       estado: 'activo',   ultimaEjecucion: '2024-11-28 09:00', exitoso: true,  ejecuciones: 89  },
  { id: 4, nombre: 'Generador Pasaporte Financiero',estado: 'pausado', ultimaEjecucion: '2024-11-25 14:30', exitoso: true,  ejecuciones: 34  },
  { id: 5, nombre: 'Sincronización KPIs → DB',   estado: 'activo',   ultimaEjecucion: '2024-11-28 18:00', exitoso: true,  ejecuciones: 720 },
  { id: 6, nombre: 'Reporte Semanal Automático',  estado: 'error',    ultimaEjecucion: '2024-11-25 08:00', exitoso: false, ejecuciones: 12  },
] : [];

// Chat messages (demo)
export const chatDemoMessages = [
  {
    role: 'ai',
    content: '¡Hola! Soy tu **CFO Virtual DataPyme** 🤖 — evaluador financiero imparcial y asistente de tu empresa. Puedo analizar tu liquidez, tus datos DGII y darte recomendaciones en tiempo real. ¿En qué te ayudo hoy?',
  },
  {
    role: 'user',
    content: '¿Tengo liquidez suficiente para pagar la nómina la próxima semana?',
  },
  {
    role: 'ai',
    content: `Basándome en tus datos procesados del 606/607 (anonimizados):

**Análisis de Liquidez:**
- 💰 Efectivo disponible estimado: **RD$124,800**
- 📋 Obligaciones próximos 7 días: **RD$48,500** (cuentas por pagar venciendo)
- 🧾 Flujo neto proyectado: **+RD$76,300**

**Veredicto:** ✅ **SÍ tienes liquidez suficiente.** Tu Ratio Circulante es 1.38, que está sobre el umbral mínimo de 1.05 recomendado para operación saludable.

**Recomendación:** La cuenta de EDE Este (RD$8,500) está vencida desde el 30/11. Págala antes de que genere recargos del 2% mensual.`,
  },
];
