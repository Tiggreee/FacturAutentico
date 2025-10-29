// Catálogo de productos del negocio familiar
// Estos productos están precargados con sus claves SAT correctas
export const PRODUCTOS_CATALOGO = {
  producto1: {
    id: 'producto1',
    nombre: 'Producto Principal 1',
    descripcion: 'Descripción detallada del primer producto',
    precio: 150.00,
    claveSAT: '50211508', // Ejemplo: Productos alimenticios
    claveUnidad: 'H87', // Pieza
    unidad: 'Pieza'
  },
  producto2: {
    id: 'producto2', 
    nombre: 'Producto Principal 2',
    descripcion: 'Descripción detallada del segundo producto',
    precio: 280.00,
    claveSAT: '50211509', // Ejemplo: Otros productos
    claveUnidad: 'KGM', // Kilogramo
    unidad: 'Kilogramo'
  },
  producto3: {
    id: 'producto3',
    nombre: 'Producto Principal 3', 
    descripcion: 'Descripción detallada del tercer producto',
    precio: 420.00,
    claveSAT: '50211510', // Ejemplo: Servicios
    claveUnidad: 'E48', // Servicio
    unidad: 'Servicio'
  }
}

// Formas de pago según catálogo SAT
export const FORMAS_PAGO = [
  { clave: '01', descripcion: 'Efectivo' },
  { clave: '02', descripcion: 'Cheque nominativo' },
  { clave: '03', descripcion: 'Transferencia electrónica de fondos' },
  { clave: '04', descripcion: 'Tarjeta de crédito' },
  { clave: '05', descripcion: 'Monedero electrónico' },
  { clave: '06', descripcion: 'Dinero electrónico' },
  { clave: '08', descripcion: 'Vales de despensa' },
  { clave: '12', descripcion: 'Dación en pago' },
  { clave: '13', descripcion: 'Pago por subrogación' },
  { clave: '14', descripcion: 'Pago por consignación' },
  { clave: '15', descripcion: 'Condonación' },
  { clave: '17', descripcion: 'Compensación' },
  { clave: '23', descripcion: 'Novación' },
  { clave: '24', descripcion: 'Confusión' },
  { clave: '25', descripcion: 'Remisión de deuda' },
  { clave: '26', descripcion: 'Prescripción o caducidad' },
  { clave: '27', descripcion: 'A satisfacción del acreedor' },
  { clave: '28', descripcion: 'Tarjeta de débito' },
  { clave: '29', descripcion: 'Tarjeta de servicios' },
  { clave: '30', descripcion: 'Aplicación de anticipos' },
  { clave: '31', descripcion: 'Intermediario pagos' },
  { clave: '99', descripcion: 'Por definir' }
]

// Usos de CFDI más comunes
export const USOS_CFDI = [
  { clave: 'G01', descripcion: 'Adquisición de mercancías' },
  { clave: 'G02', descripcion: 'Devoluciones, descuentos o bonificaciones' },
  { clave: 'G03', descripcion: 'Gastos en general' },
  { clave: 'I01', descripcion: 'Construcciones' },
  { clave: 'I02', descripcion: 'Mobilario y equipo de oficina por inversiones' },
  { clave: 'I03', descripcion: 'Equipo de transporte' },
  { clave: 'I04', descripcion: 'Equipo de computo y accesorios' },
  { clave: 'I05', descripcion: 'Dados, troqueles, moldes, matrices y herramental' },
  { clave: 'I06', descripcion: 'Comunicaciones telefónicas' },
  { clave: 'I07', descripcion: 'Comunicaciones satelitales' },
  { clave: 'I08', descripcion: 'Otra maquinaria y equipo' },
  { clave: 'D01', descripcion: 'Honorarios médicos, dentales y gastos hospitalarios' },
  { clave: 'D02', descripcion: 'Gastos médicos por incapacidad o discapacidad' },
  { clave: 'D03', descripcion: 'Gastos funerales' },
  { clave: 'D04', descripcion: 'Donativos' },
  { clave: 'D05', descripcion: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)' },
  { clave: 'D06', descripcion: 'Aportaciones voluntarias al SAR' },
  { clave: 'D07', descripcion: 'Primas por seguros de gastos médicos' },
  { clave: 'D08', descripcion: 'Gastos de transportación escolar obligatoria' },
  { clave: 'D09', descripcion: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones' },
  { clave: 'D10', descripcion: 'Pagos por servicios educativos (colegiaturas)' },
  { clave: 'P01', descripcion: 'Por definir' },
  { clave: 'S01', descripcion: 'Sin efectos fiscales' },
  { clave: 'CP01', descripcion: 'Pagos' },
  { clave: 'CN01', descripcion: 'Nómina' }
]

// Información del emisor (datos del negocio)
export const DATOS_EMISOR = {
  rfc: 'XAXX010101000', // RFC del negocio - CAMBIAR POR EL REAL
  nombre: 'Negocio Familiar S.A. de C.V.', // CAMBIAR POR EL NOMBRE REAL
  domicilio: {
    calle: 'Calle Principal',
    noExterior: '123', 
    colonia: 'Centro',
    municipio: 'Ciudad',
    estado: 'Estado',
    pais: 'México',
    codigoPostal: '12345'
  },
  regimenFiscal: '601' // General de Ley Personas Morales - VERIFICAR
}