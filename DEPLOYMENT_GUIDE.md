# 🚀 Guía de Deployment a GitHub Pages

## ✅ Pasos para Activar GitHub Pages (Solo una vez)

### 1. Habilitar GitHub Pages en tu repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/Tiggreee/FacturAutentico`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral izquierdo, busca **Pages** (bajo la sección "Code and automation")
4. En **Source** (Fuente), selecciona: **GitHub Actions**
   - ⚠️ NO selecciones "Deploy from a branch", debe ser "GitHub Actions"
5. Guarda los cambios

### 2. Hacer merge a la rama main

El deployment se activa automáticamente cuando haces push a `main`:

```bash
# Opción A: Desde tu terminal local
git checkout main
git merge copilot/deploy-front-end-to-github-pages
git push origin main

# Opción B: Desde GitHub (Pull Request)
# - Crea un Pull Request de la rama copilot/deploy-front-end-to-github-pages a main
# - Haz merge del PR
```

### 3. Verificar el deployment

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás un workflow ejecutándose llamado "Deploy to GitHub Pages"
3. Espera ~2 minutos a que termine (icono verde ✓)
4. Accede a tu aplicación en: `https://tiggreee.github.io/FacturAutentico/`

## 🔄 Deployments Futuros

Después de la configuración inicial, **los deployments son 100% automáticos**:

1. Haces cambios en tu código
2. Commit y push a `main`:
   ```bash
   git add .
   git commit -m "Tu mensaje de cambio"
   git push origin main
   ```
3. GitHub Actions se ejecuta automáticamente
4. Tu sitio se actualiza en ~2 minutos

## 🛠️ Comandos Útiles

### Desarrollo local
```bash
npm run dev          # Inicia servidor de desarrollo en http://localhost:3001
npm run build        # Construye para producción (crea carpeta dist/)
npm run preview      # Preview del build localmente
```

### Testing del build antes de deployment
```bash
npm run build        # Construir
npm run preview      # Ver en http://localhost:4173
```

## 📁 Estructura de Archivos Importantes

```
.github/workflows/deploy.yml    ← GitHub Actions workflow
vite.config.js                  ← Configuración de Vite con base path
public/.nojekyll                ← Necesario para GitHub Pages
dist/                           ← Build de producción (NO se commitea)
```

## ❓ Troubleshooting

### El sitio muestra página en blanco
- ✅ Verifica que `base: '/FacturAutentico/'` esté en `vite.config.js`
- ✅ Asegúrate que `.nojekyll` existe en `public/`
- ✅ Revisa que GitHub Pages esté configurado como "GitHub Actions" en Settings

### El workflow falla
- ✅ Revisa los logs en Actions tab
- ✅ Verifica que `package.json` tenga el script `build`
- ✅ Asegúrate que todas las dependencias estén en `package.json`

### Cambios no se reflejan
- ✅ Limpia caché del navegador (Ctrl + Shift + R)
- ✅ Espera 2-3 minutos después del deployment
- ✅ Verifica en Actions que el workflow completó exitosamente

## 🎉 ¡Listo!

Tu aplicación de facturación CFDI 4.0 ahora está:
- ✅ Desplegada en internet (GitHub Pages)
- ✅ Con deployment automático en cada push a main
- ✅ Accesible desde cualquier dispositivo
- ✅ Con HTTPS automático (seguro)

**URL de tu aplicación:** https://tiggreee.github.io/FacturAutentico/

---

## 📝 Notas Importantes

1. **Backend separado**: Este deployment solo incluye el frontend. Para funcionalidad completa de timbrado CFDI, necesitarás desplegar el backend por separado (Node.js + Express).

2. **Datos simulados**: Actualmente la app funciona con datos en memoria. Para persistencia necesitas configurar backend + base de datos.

3. **Producción real**: Para uso productivo con timbrado SAT real:
   - Despliega backend en servidor seguro (Railway, DigitalOcean, etc.)
   - Configura certificados CSD del SAT
   - Integra API de timbrado (FiscalAPI o similar)
   - Actualiza las URLs del API en el frontend
