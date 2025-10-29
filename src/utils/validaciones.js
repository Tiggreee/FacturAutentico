// Validación de RFC según las reglas del SAT
export const validarRFC = (rfc) => {
  if (!rfc) return false
  
  // Convertir a mayúsculas y quitar espacios
  const rfcLimpio = rfc.trim().toUpperCase()
  
  // RFC de persona física: 4 letras + 6 números + 3 caracteres
  const patronPersonaFisica = /^[A-ZÑ&]{4}[0-9]{6}[A-Z0-9]{3}$/
  
  // RFC de persona moral: 3 letras + 6 números + 3 caracteres  
  const patronPersonaMoral = /^[A-ZÑ&]{3}[0-9]{6}[A-Z0-9]{3}$/
  
  return patronPersonaFisica.test(rfcLimpio) || patronPersonaMoral.test(rfcLimpio)
}

// Validar email
export const validarEmail = (email) => {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return patron.test(email)
}

// Calcular total con IVA
export const calcularTotal = (subtotal, porcentajeIVA = 16) => {
  const iva = subtotal * (porcentajeIVA / 100)
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    iva: parseFloat(iva.toFixed(2)),
    total: parseFloat((subtotal + iva).toFixed(2))
  }
}

// Formatear moneda
export const formatearMoneda = (cantidad) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(cantidad)
}

// Formatear fecha para CFDI
export const formatearFechaCFDI = (fecha) => {
  return fecha.toISOString().slice(0, 19) // YYYY-MM-DDTHH:mm:ss
}

// Generar serie y folio
export const generarSerieYFolio = () => {
  const serie = 'A'
  const folio = Date.now().toString().slice(-6) // Últimos 6 dígitos del timestamp
  return { serie, folio }
}

// Validar que todos los campos requeridos estén completos
export const validarFormularioCompleto = (formData) => {
  const errores = {}
  
  // Validar RFC
  if (!formData.rfcCliente) {
    errores.rfcCliente = 'El RFC es obligatorio'
  } else if (!validarRFC(formData.rfcCliente)) {
    errores.rfcCliente = 'El RFC no tiene un formato válido'
  }
  
  // Validar nombre
  if (!formData.nombreCliente?.trim()) {
    errores.nombreCliente = 'El nombre del cliente es obligatorio'
  }
  
  // Validar email
  if (!formData.emailCliente) {
    errores.emailCliente = 'El email es obligatorio'
  } else if (!validarEmail(formData.emailCliente)) {
    errores.emailCliente = 'El email no tiene un formato válido'
  }
  
  // Validar producto
  if (!formData.productoId) {
    errores.productoId = 'Debe seleccionar un producto'
  }
  
  // Validar cantidad
  if (!formData.cantidad || formData.cantidad < 1) {
    errores.cantidad = 'La cantidad debe ser mayor a 0'
  }
  
  return {
    esValido: Object.keys(errores).length === 0,
    errores
  }
}

// Generar UUID simple para folios fiscales (en producción usar una librería real)
export const generarUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  }).toUpperCase()
}

// Convertir número a letra (para importes en CFDI)
export const numeroALetras = (numero) => {
  const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE']
  const decenas = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA']
  const especiales = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISÉIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE']
  
  // Esta es una implementación básica
  // En producción se debería usar una librería especializada
  const entero = Math.floor(numero)
  const centavos = Math.round((numero - entero) * 100)
  
  if (entero === 0) {
    return `CERO PESOS ${centavos.toString().padStart(2, '0')}/100 M.N.`
  }
  
  // Implementación simplificada para números pequeños
  let letras = ''
  
  if (entero < 10) {
    letras = unidades[entero]
  } else if (entero < 100) {
    const dec = Math.floor(entero / 10)
    const uni = entero % 10
    if (entero >= 10 && entero <= 19) {
      letras = especiales[entero - 10]
    } else {
      letras = decenas[dec] + (uni > 0 ? ' Y ' + unidades[uni] : '')
    }
  } else {
    letras = entero.toString() // Fallback para números grandes
  }
  
  return `${letras} PESOS ${centavos.toString().padStart(2, '0')}/100 M.N.`
}