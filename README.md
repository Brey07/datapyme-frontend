# DataPyme - Ecosistema Financiero Integral para MIPYMES RD

DataPyme es una plataforma web full-stack diseñada para reducir la mortalidad temprana de las MIPYMES dominicanas. Proporciona herramientas avanzadas de control de liquidez, gestión de cobros y análisis financiero potenciado por Inteligencia Artificial local.

---

## Vision General

DataPyme integra un CMS, ERP y CRM financieros orquestados por n8n y potenciados por IA local (Ollama). El sistema procesa los reportes fiscales de la Dirección General de Impuestos Internos (DGII) - Formatos 606 (compras) y 607 (ventas) - para transformarlos en inteligencia de negocio ejecutable.

### Caracteristicas Principales:
- CFO Virtual: Chatbot financiero que analiza datos anonimizados y ofrece recomendaciones en tiempo real.
- Dashboard de Liquidez: KPIs financieros automáticos (Ratio Circulante, Capital de Trabajo, Margen Bruto).
- Gestion de Riesgo: Scoring de proveedores y pipeline de cobranza preventiva.
- Cumplimiento Normativo: Alineado con la Ley 172-13 de Proteccion de Datos Personales (IA local, sin fuga de datos).

---

## Arquitectura del Sistema

El sistema utiliza una arquitectura de microservicios orquestada con Docker:

- Frontend: React + Vite (Puerto 5173/80)
- Workflow Engine: n8n (Puerto 5678)
- Local AI: Ollama (LLaMA 3) (Puerto 11434)
- Database: PostgreSQL 16 (Puerto 5432)

---

## Guia de Inicio Rapido

### Requisitos Previos
- Docker y Docker Compose
- Node.js 20+ (para desarrollo frontend)

### Instalacion con Docker (Recomendado)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Brey07/datapyme.git
   cd datapyme
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Edita .env con tus configuraciones locales
   ```

3. Levantar los servicios:
   ```bash
   docker-compose up -d
   ```

4. Descargar el modelo de IA:
   ```bash
   docker exec -it datapyme-ollama ollama pull llama3
   ```

### Acceso a los Servicios
- Frontend: [http://localhost:5173](http://localhost:5173)
- n8n: [http://localhost:5678](http://localhost:5678)
- Ollama: [http://localhost:11434](http://localhost:11434)

---

## Modulos Detallados

### 1. Sistema ERP / Contable
Convierte los formatos 606 (gastos) y 607 (ingresos) en metricas de supervivencia:
- Seguimiento de Cuentas por Pagar y Cobrar.
- Calculo automatico de Ratio Circulante (Alerta < 1.05).
- Reportes de Cash-Flow historicos.

### 2. CRM de Cobranza y Riesgo
- Automatizacion de recordatorios de pago.
- Scoring de proveedores basado en cumplimiento y terminos de credito.
- Preparacion para credito bancario (Loan Readiness).

### 3. IA Financiera Zero-Bias
Mediante un pipeline de n8n, los datos son anonimizados antes de ser procesados por Ollama, garantizando una evaluacion tecnica sin sesgos de genero, nombre o ubicacion.

---

## Tecnologias Utilizadas

- Frontend: React, Vite, Framer Motion, Recharts, Lucide Icons.
- Infraestructura: Docker, Nginx, n8n.
- IA/ML: Ollama (LLaMA 3).
- Backend: PostgreSQL.

---

## Licencia y Cumplimiento

Este proyecto ha sido desarrollado bajo las normativas vigentes de la Republica Dominicana:
- Ley 172-13 sobre Proteccion de Datos Personales.
- Integracion con formatos estandar de la DGII.

---

*Desarrollado para el ecosistema MIPYME de la Republica Dominicana.*
