/* eslint react/prop-types: 0 */
import { useState } from 'react'
import { PRODUCTOS_CATALOGO, FORMAS_PAGO } from '../../data/catalogos'
import { validarRFC } from '../../utils/validaciones'
import './FacturasForm.css'

const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function crearFacturaApi(payload) {
  const url = `${apiBase}/api/facturas`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.error || data.missing?.join(', ') || res.statusText
    throw new Error(typeof msg === 'string' ? msg : 'Error al timbrar')
  }
  if (!data.ok || !data.factura) {
    throw new Error('Respuesta inválida del servidor')
  }
  return data.factura
}

function FacturasForm({ onFacturaCreada }) {
  const [formData, setFormData] = useState({
    rfcCliente: '',
    nombreCliente: '',
    emailCliente: '',
    productoId: '',
    cantidad: 1,
    formaPago: '01',
    usoCFDI: 'G03'
  })

  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.rfcCliente) {
      nuevosErrores.rfcCliente = 'El RFC es obligatorio'
    } else if (!validarRFC(formData.rfcCliente)) {
      nuevosErrores.rfcCliente = 'RFC inválido'
    }

    if (!formData.nombreCliente.trim()) {
      nuevosErrores.nombreCliente = 'El nombre es obligatorio'
    }

    if (!formData.emailCliente) {
      nuevosErrores.emailCliente = 'El email es obligatorio'
    } else if (!/\S+@\S+\.\S+/.test(formData.emailCliente)) {
      nuevosErrores.emailCliente = 'Email inválido'
    }

    if (!formData.productoId) {
      nuevosErrores.productoId = 'Debe seleccionar un producto'
    }

    if (!formData.cantidad || formData.cantidad < 1) {
      nuevosErrores.cantidad = 'La cantidad debe ser mayor a 0'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validarFormulario()) return

    setEnviando(true)

    try {
      const producto = PRODUCTOS_CATALOGO[formData.productoId]
      const subtotal = producto.precio * formData.cantidad
      const iva = subtotal * 0.16
      const total = subtotal + iva

      const payload = {
        cliente: {
          rfc: formData.rfcCliente.toUpperCase(),
          nombre: formData.nombreCliente,
          email: formData.emailCliente
        },
        producto: {
          ...producto,
          cantidad: parseInt(formData.cantidad, 10)
        },
        importes: {
          subtotal: subtotal.toFixed(2),
          iva: iva.toFixed(2),
          total: total.toFixed(2)
        },
        formaPago: formData.formaPago,
        usoCFDI: formData.usoCFDI
      }

      const nuevaFactura = await crearFacturaApi(payload)
      onFacturaCreada(nuevaFactura)

      setFormData({
        rfcCliente: '',
        nombreCliente: '',
        emailCliente: '',
        productoId: '',
        cantidad: 1,
        formaPago: '01',
        usoCFDI: 'G03'
      })
    } catch (error) {
      console.error('Error al procesar factura:', error)
      setErrores({
        general:
          error?.message ||
          'Error al procesar la factura. ¿Está corriendo la API? (npm run api o npm run dev:all).'
      })
    } finally {
      setEnviando(false)
    }
  }

  const productoSeleccionado = formData.productoId ? PRODUCTOS_CATALOGO[formData.productoId] : null
  const subtotal = productoSeleccionado ? productoSeleccionado.precio * formData.cantidad : 0
  const iva = subtotal * 0.16
  const total = subtotal + iva

  return (
    <div className="facturas-form">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Nueva Factura CFDI 4.0</h2>
          <p className="card-description">Completa los datos necesarios para generar la factura electrónica</p>
        </div>

        {errores.general && <div className="alert alert-error">{errores.general}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-section">
              <h3>📋 Datos del Cliente</h3>

              <div className="form-group">
                <label htmlFor="rfcCliente" className="form-label">RFC del Cliente *</label>
                <input
                  type="text"
                  id="rfcCliente"
                  name="rfcCliente"
                  value={formData.rfcCliente}
                  onChange={handleChange}
                  className={`form-input ${errores.rfcCliente ? 'error' : ''}`}
                  placeholder="XAXX010101000"
                  maxLength="13"
                />
                {errores.rfcCliente && <div className="error">{errores.rfcCliente}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="nombreCliente" className="form-label">Nombre o Razón Social *</label>
                <input
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  value={formData.nombreCliente}
                  onChange={handleChange}
                  className={`form-input ${errores.nombreCliente ? 'error' : ''}`}
                  placeholder="Juan Pérez García"
                />
                {errores.nombreCliente && <div className="error">{errores.nombreCliente}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="emailCliente" className="form-label">Email *</label>
                <input
                  type="email"
                  id="emailCliente"
                  name="emailCliente"
                  value={formData.emailCliente}
                  onChange={handleChange}
                  className={`form-input ${errores.emailCliente ? 'error' : ''}`}
                  placeholder="cliente@ejemplo.com"
                />
                {errores.emailCliente && <div className="error">{errores.emailCliente}</div>}
              </div>
            </div>

            <div className="form-section">
              <h3>🛍️ Producto y Facturación</h3>

              <div className="form-group">
                <label htmlFor="productoId" className="form-label">Producto *</label>
                <select
                  id="productoId"
                  name="productoId"
                  value={formData.productoId}
                  onChange={handleChange}
                  className={`form-select ${errores.productoId ? 'error' : ''}`}
                >
                  <option value="">Selecciona un producto</option>
                  {Object.entries(PRODUCTOS_CATALOGO).map(([id, producto]) => (
                    <option key={id} value={id}>
                      {producto.nombre} - ${producto.precio}
                    </option>
                  ))}
                </select>
                {errores.productoId && <div className="error">{errores.productoId}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="cantidad" className="form-label">Cantidad *</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  className={`form-input ${errores.cantidad ? 'error' : ''}`}
                  min="1"
                  max="999"
                />
                {errores.cantidad && <div className="error">{errores.cantidad}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="formaPago" className="form-label">Forma de Pago</label>
                <select
                  id="formaPago"
                  name="formaPago"
                  value={formData.formaPago}
                  onChange={handleChange}
                  className="form-select"
                >
                  {FORMAS_PAGO.map((forma) => (
                    <option key={forma.clave} value={forma.clave}>
                      {forma.clave} - {forma.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="usoCFDI" className="form-label">Uso de CFDI</label>
                <select
                  id="usoCFDI"
                  name="usoCFDI"
                  value={formData.usoCFDI}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="G03">G03 - Gastos en general</option>
                  <option value="G01">G01 - Adquisición de mercancías</option>
                  <option value="G02">G02 - Devoluciones, descuentos o bonificaciones</option>
                  <option value="P01">P01 - Por definir</option>
                </select>
              </div>
            </div>
          </div>

          {productoSeleccionado && (
            <div className="resumen-importes">
              <h3>💰 Resumen de Importes</h3>
              <div className="importes-grid">
                <div className="importe-item">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="importe-item">
                  <span>IVA (16%):</span>
                  <span>${iva.toFixed(2)}</span>
                </div>
                <div className="importe-item total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large" disabled={enviando}>
              {enviando ? (
                <>
                  <span className="loading"></span>
                  Procesando factura...
                </>
              ) : (
                <>🧾 Generar Factura CFDI</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FacturasForm
