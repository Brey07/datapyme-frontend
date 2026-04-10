-- Usuarios
CREATE TABLE usuarios (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  cedula TEXT,
  nombre TEXT,
  apellido TEXT,
  provincia TEXT,
  two_factor_secret TEXT,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Empresas (MIPYMES)
CREATE TABLE empresas (
  id TEXT PRIMARY KEY,
  rnc TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  sector TEXT,
  municipio TEXT,
  usuario_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Transacciones 606 (Cuentas por Pagar)
CREATE TABLE transacciones_606 (
  id TEXT PRIMARY KEY,
  empresa_id TEXT NOT NULL,
  ncf TEXT,
  proveedor TEXT,
  rnc_proveedor TEXT,
  monto REAL,
  itbis REAL,
  fecha DATE,
  vencimiento DATE,
  estado TEXT CHECK(estado IN ('pendiente', 'pagado', 'vencido')),
  tipo TEXT,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Transacciones 607 (Cuentas por Cobrar)
CREATE TABLE transacciones_607 (
  id TEXT PRIMARY KEY,
  empresa_id TEXT NOT NULL,
  ncf TEXT,
  cliente TEXT,
  rnc_cliente TEXT,
  monto REAL,
  itbis REAL,
  fecha DATE,
  vencimiento DATE,
  estado TEXT CHECK(estado IN ('pendiente', 'cobrado', 'credito', 'vencido')),
  tipo TEXT,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- KPIs históricos
CREATE TABLE kpis_historicos (
  id TEXT PRIMARY KEY,
  empresa_id TEXT NOT NULL,
  periodo TEXT,
  capital_trabajo REAL,
  ratio_circulante REAL,
  flujo_caja REAL,
  ingresos REAL,
  gastos REAL,
  margen_bruto REAL,
  score_crediticio INTEGER,
  calculado_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Proveedores con scoring
CREATE TABLE proveedores (
  id TEXT PRIMARY KEY,
  empresa_id TEXT NOT NULL,
  rnc TEXT,
  nombre TEXT,
  score INTEGER,
  riesgo TEXT CHECK(riesgo IN ('bajo', 'medio', 'alto')),
  plazo TEXT,
  total_compras REAL,
  frecuencia TEXT,
  alerta INTEGER DEFAULT 0,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);
