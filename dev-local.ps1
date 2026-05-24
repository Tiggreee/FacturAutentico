# Arranca API (3000) + Vite (3001). Ejecutar desde la raíz del repo:
#   pwsh -ExecutionPolicy Bypass -File .\dev-local.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error 'Node.js no está en PATH. Instálalo o abre una terminal donde funcione `node`.'
}

if (-not (Test-Path '.\server\.env')) {
  Copy-Item '.\server\.env.example' '.\server\.env'
  Write-Host 'Creado server\.env desde .env.example' -ForegroundColor Yellow
}

Write-Host 'Instalando dependencias (raíz + server)...' -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ''
Write-Host 'Levantando API + Vite. Abre: http://localhost:3001/FacturAutentico/' -ForegroundColor Green
Write-Host 'Ctrl+C para detener.' -ForegroundColor DarkGray
Write-Host ''
npm run dev:all
