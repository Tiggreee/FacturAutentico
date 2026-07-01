/* eslint-env node */
import 'dotenv/config';
import crypto from 'node:crypto';
import express from 'express';
import cors from 'cors';

const env = globalThis.process?.env ?? {};
const PORT = Number(env.PORT) || 3000;

const origins = (env.CORS_ORIGINS || 'http://localhost:3001')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();
app.use(
  cors({
    origin: origins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);
app.use(express.json({ limit: '256kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    modo: env.PAC_API_KEY ? 'PAC_CONFIGURADO' : 'MOCK',
    mensaje:
      env.PAC_API_KEY
        ? 'Listo para integrar llamadas reales al PAC en timbrarConPAC().'
        : 'Sin PAC_API_KEY: respuestas de timbrado son simuladas (solo desarrollo).'
  });
});

function validarPayload(body) {
  const err = [];
  if (!body?.cliente?.rfc) err.push('cliente.rfc');
  if (!body?.cliente?.nombre) err.push('cliente.nombre');
  if (!body?.cliente?.email) err.push('cliente.email');
  if (!body?.producto) err.push('producto');
  if (!body?.importes?.total) err.push('importes');
  return err;
}

/**
 * Aquí conectas el cliente HTTP del PAC que elijas (Facturama, SW, FiscalAPI, etc.).
 * Nunca expongas PAC_API_KEY al navegador.
 */
async function timbrarConPAC() {
  if (!env.PAC_API_URL || !env.PAC_API_KEY) {
    return {
      timbrado: 'MOCK',
      folioFiscal: crypto.randomUUID(),
      mensaje:
        'Timbrado simulado. Configura PAC_API_URL + PAC_API_KEY en server/.env e implementa la llamada en timbrarConPAC().'
    };
  }
  throw new Error(
    'PAC configurado pero integración HTTP pendiente: edita server/index.js → timbrarConPAC() según la doc de tu PAC.'
  );
}

app.post('/api/facturas', async (req, res) => {
  try {
    const missing = validarPayload(req.body);
    if (missing.length) {
      return res.status(400).json({ ok: false, error: 'Faltan campos', missing });
    }

    const timbre = await timbrarConPAC();

    const factura = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      cliente: req.body.cliente,
      producto: req.body.producto,
      importes: req.body.importes,
      formaPago: req.body.formaPago,
      usoCFDI: req.body.usoCFDI,
      estado: timbre.timbrado === 'MOCK' ? 'timbrada-mock' : 'timbrada',
      folioFiscal: timbre.folioFiscal,
      meta: { timbrado: timbre.timbrado, mensaje: timbre.mensaje }
    };

    return res.status(201).json({ ok: true, factura });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: e.message || 'Error interno' });
  }
});

app.listen(PORT, () => {
  console.log(`FacturAutentico API http://localhost:${PORT}`);
  console.log(`CORS: ${origins.join(', ')}`);
});
