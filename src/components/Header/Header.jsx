import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🧾 Facturación CFDI</h1>
            <p>Sistema simplificado para el negocio familiar</p>
          </div>
          
          <div className="header-info">
            <div className="status">
              <span className="status-indicator online"></span>
              Sistema activo
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header