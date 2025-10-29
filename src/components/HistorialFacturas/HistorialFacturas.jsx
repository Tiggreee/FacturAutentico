import './HistorialFacturas.css'

function HistorialFacturas({ facturas }) {
  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: { class: 'badge-warning', text: '⏳ Pendiente' },
      timbrada: { class: 'badge-success', text: '✅ Timbrada' },
      enviada: { class: 'badge-info', text: '📧 Enviada' },
      error: { class: 'badge-danger', text: '❌ Error' }
    }
    return badges[estado] || badges.pendiente
  }

  const descargarXML = (factura) => {
    // Simular descarga de XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante 
    xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
    Version="4.0"
    Folio="${factura.id}"
    Fecha="${factura.fecha}"
    Total="${factura.importes.total}">
    <!-- Contenido XML simplificado -->
</cfdi:Comprobante>`
    
    const blob = new Blob([xmlContent], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `factura-${factura.id}.xml`
    a.click()
    URL.revokeObjectURL(url)
  }

  const descargarPDF = (factura) => {
    // Simular descarga de PDF
    alert(`Descargando PDF de la factura ${factura.id}. En producción se generaría el PDF real.`)
  }

  const enviarPorCorreo = async (factura) => {
    try {
      // Simular envío por correo
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(`Factura enviada por correo a: ${factura.cliente.email}`)
    } catch (error) {
      alert('Error al enviar por correo')
    }
  }

  if (facturas.length === 0) {
    return (
      <div className="historial-vacio">
        <div className="card text-center">
          <div className="historial-vacio-content">
            <div className="historial-vacio-icon">📋</div>
            <h3>No hay facturas aún</h3>
            <p>Las facturas que generes aparecerán aquí.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="historial-facturas">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Historial de Facturas</h2>
          <p className="card-description">
            {facturas.length} {facturas.length === 1 ? 'factura generada' : 'facturas generadas'}
          </p>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => {
                const badge = getEstadoBadge(factura.estado)
                return (
                  <tr key={factura.id}>
                    <td>
                      <div className="fecha-cell">
                        <div className="fecha-principal">
                          {formatearFecha(factura.fecha)}
                        </div>
                        <div className="folio">
                          Folio: {factura.id}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="cliente-cell">
                        <div className="cliente-nombre">
                          {factura.cliente.nombre}
                        </div>
                        <div className="cliente-rfc">
                          {factura.cliente.rfc}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="producto-cell">
                        <div className="producto-nombre">
                          {factura.producto.nombre}
                        </div>
                        <div className="producto-cantidad">
                          Cantidad: {factura.producto.cantidad}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="total-cell">
                        ${factura.importes.total}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${badge.class}`}>
                        {badge.text}
                      </span>
                    </td>
                    <td>
                      <div className="acciones">
                        <button
                          className="btn-icon"
                          onClick={() => descargarXML(factura)}
                          title="Descargar XML"
                        >
                          📄
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => descargarPDF(factura)}
                          title="Descargar PDF"
                        >
                          📋
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => enviarPorCorreo(factura)}
                          title="Enviar por correo"
                        >
                          📧
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="historial-resumen">
          <div className="resumen-stats">
            <div className="stat">
              <span className="stat-label">Total facturas:</span>
              <span className="stat-value">{facturas.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Importe total:</span>
              <span className="stat-value">
                ${facturas.reduce((sum, f) => sum + parseFloat(f.importes.total), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistorialFacturas