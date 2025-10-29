# 🧾 Sistema de Facturación CFDI 4.0

Sistema simplificado de facturación electrónica para negocios familiares con interfaz minimalista y proceso automatizado.

## 🎯 Características

- **Interfaz minimalista**: Solo campos esenciales para facilitar el uso
- **Catálogo fijo**: 3 productos precargados con claves SAT correctas
- **Validaciones automáticas**: RFC, emails, importes
- **Generación CFDI 4.0**: XML y PDF conforme a normativa SAT
- **Historial básico**: Tabla con fecha, cliente, monto, descargas
- **Envío automático**: Por correo electrónico al cliente

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Validaciones**: JavaScript nativo
- **Estilos**: CSS custom con variables
- **Backend**: Preparado para Node.js
- **Timbrado**: Estructura para FiscalAPI o CFDIStamping

## 📋 Requisitos Previos

- Node.js 16+
- NPM o Yarn
- Certificados de Sello Digital (CSD) del SAT
- RFC activo en el SAT

## 🚀 Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar datos del emisor**:
   Editar `src/data/catalogos.js`:
   ```javascript
   export const DATOS_EMISOR = {
     rfc: 'TU_RFC_AQUI',
     nombre: 'Nombre de tu Negocio',
     // ... otros datos
   }
   ```

3. **Configurar productos**:
   Editar `PRODUCTOS_CATALOGO` en `src/data/catalogos.js` con tus 3 productos reales.

4. **Iniciar en desarrollo**:
   ```bash
   npm run dev
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header/              # Encabezado de la aplicación
│   ├── FacturasForm/        # Formulario de nueva factura
│   └── HistorialFacturas/   # Tabla de facturas generadas
├── data/
│   └── catalogos.js         # Productos, formas de pago, etc.
├── utils/
│   └── validaciones.js      # Validaciones RFC, email, etc.
├── App.jsx                  # Componente principal
└── main.jsx                 # Punto de entrada
```

## 🔧 Configuración de Producción

### Integración con APIs de Timbrado

#### Opción 1: FiscalAPI
```javascript
// Instalar SDK
npm install fiscal-api

// En tu componente
import FiscalAPI from 'fiscal-api'

const fiscal = new FiscalAPI({
  key: 'tu-api-key',
  secret: 'tu-secret'
})
```

#### Opción 2: CFDIStamping (.NET)
- Clonar: https://github.com/Veld-CC/CFDIStamping
- Crear API REST wrapper
- Integrar con fetch() desde React

### Configuración de Correo

1. **Configurar SMTP**:
   ```javascript
   const transporter = nodemailer.createTransporter({
     host: 'smtp.tu-proveedor.com',
     port: 587,
     auth: {
       user: 'tu-correo@dominio.com',
       pass: 'tu-contraseña'
     }
   })
   ```

## 🔐 Seguridad y Certificados

1. **Certificados CSD**:
   - Obtener del portal SAT
   - Convertir a formato PEM
   - Almacenar de forma segura

2. **Variables de entorno**:
   ```env
   CERT_PATH=./certificates/certificado.cer
   KEY_PATH=./certificates/llave.key
   KEY_PASSWORD=tu-contraseña
   ```

## 📝 Flujo de Facturación

1. **Usuario completa formulario**:
   - RFC, nombre, email del cliente
   - Selecciona producto del catálogo
   - Cantidad y forma de pago

2. **Sistema valida datos**:
   - RFC formato correcto
   - Email válido
   - Producto existe

3. **Genera CFDI**:
   - Crea XML con estructura SAT
   - Sella digitalmente
   - Timbra con PAC

4. **Entrega archivos**:
   - Genera PDF representación
   - Envía por correo
   - Almacena en historial

## 🧪 Testing

```bash
# Ejecutar pruebas
npm run test

# Modo watch
npm run test:watch
```

## 📦 Construcción

```bash
# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## 🚀 Despliegue

### Opción 1: Local/VPS
1. Build del proyecto
2. Servir con nginx/apache
3. Configurar HTTPS
4. Backup de certificados

### Opción 2: Cloud
- Vercel (frontend)
- Railway/DigitalOcean (backend)
- Configurar variables de entorno

## 📞 Soporte

Este sistema está diseñado específicamente para negocios familiares con:
- 3 productos fijos
- Proceso simple e intuitivo
- Mínima capacitación requerida

## 📄 Licencia

Proyecto personal para uso familiar.

---

**Nota**: Este sistema genera facturas CFDI 4.0 válidas, pero siempre verifica con tu contador la configuración fiscal específica de tu negocio.