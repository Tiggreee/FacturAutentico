# API FacturAutentico

Servidor mínimo en **Node + Express** para:

- Recibir datos del formulario React.
- (Futuro) Llamar a tu **PAC** con llaves solo en servidor.
- Mientras no haya PAC: **timbrado MOCK** (UUID real, sin validez fiscal).

## Arranque

**Recomendado (API + Vite a la vez), desde la raíz del repo:**

```bash
npm install
npm run dev:all
```

**Solo el servidor** (y en otra terminal `npm run dev` en la raíz):

```bash
cd server
cp .env.example .env
npm install
npm start
```

Vite (`:3001`) proxifica `/api` → `http://localhost:3000` (ver `vite.config.js`).

## Variables

Ver `.env.example`. Añade `PAC_API_URL` y `PAC_API_KEY` cuando tengas proveedor; luego implementa `timbrarConPAC()` en `index.js`.
