import { useState } from 'react'
import Header from './components/Header/Header'
import FacturasForm from './components/FacturasForm/FacturasForm'
import HistorialFacturas from './components/HistorialFacturas/HistorialFacturas'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('nueva-factura')
  const [facturas, setFacturas] = useState([])

  const handleFacturaCreada = (nuevaFactura) => {
    setFacturas([...facturas, nuevaFactura])
    setActiveTab('historial') // Cambiar a historial después de crear
  }

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        <nav className="tabs">
          <button 
            className={`tab ${activeTab === 'nueva-factura' ? 'active' : ''}`}
            onClick={() => setActiveTab('nueva-factura')}
          >
            🧾 Nueva Factura
          </button>
          <button 
            className={`tab ${activeTab === 'historial' ? 'active' : ''}`}
            onClick={() => setActiveTab('historial')}
          >
            📋 Historial ({facturas.length})
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'nueva-factura' && (
            <FacturasForm onFacturaCreada={handleFacturaCreada} />
          )}
          
          {activeTab === 'historial' && (
            <HistorialFacturas facturas={facturas} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App