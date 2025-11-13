import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            {/* El logo PDF se puede convertir a imagen y colocar aquí */}
            {/* <img src="/logo-autentico.png" alt="Auténtico" className="logo-image" /> */}
            <div className="logo-text">
              <h1>🧾 Factur<span style={{color: 'var(--accent-color)'}}>Auténtico</span></h1>
              <p>Sistema de facturación CFDI 4.0</p>
            </div>
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