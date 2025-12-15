# HSK1 学习 - Checklist de Producción

## ✅ Completado

### PWA (Progressive Web App)
- [x] Service Worker con cache offline (v4)
- [x] Manifest.json completo con todos los iconos
- [x] Página offline dedicada (offline.html)
- [x] Pantalla de carga animada
- [x] Shortcuts para acceso rápido

### SEO y Metadatos
- [x] Meta tags SEO (title, description, keywords)
- [x] Open Graph tags (Facebook)
- [x] Twitter Card tags
- [x] Robots.txt
- [x] Sitemap.xml

### Accesibilidad
- [x] ARIA labels y roles
- [x] Skip link para navegación
- [x] Focus visible styles
- [x] Soporte para prefers-reduced-motion
- [x] Soporte para prefers-contrast: high
- [x] Estilos de impresión

### Rendimiento
- [x] Preload de recursos críticos
- [x] Prefetch de módulos secundarios
- [x] Lazy loading configurado
- [x] Headers de cache configurados
- [x] Compresión habilitada (.htaccess)

### Manejo de Errores
- [x] Global error handler
- [x] Unhandled promise rejection handler
- [x] Error toast UI
- [x] Performance monitoring

### Seguridad
- [x] Security headers configurados
- [x] Content Security Policy
- [x] X-Frame-Options
- [x] XSS Protection

---

## 📋 Pendiente antes de Deploy

### 1. Generar Iconos PNG
```bash
# Abre icons/generate-icons.html en el navegador
# Haz clic en "Generar Todos los Iconos"
# Descarga cada icono y guárdalos en /icons/
```

Iconos necesarios:
- [ ] icon-72.png
- [ ] icon-96.png
- [ ] icon-128.png
- [ ] icon-144.png
- [ ] icon-152.png
- [ ] icon-192.png
- [ ] icon-384.png
- [ ] icon-512.png
- [ ] icon-maskable-192.png
- [ ] icon-maskable-512.png
- [ ] shortcut-flashcards.png
- [ ] shortcut-exam.png
- [ ] shortcut-listening.png

### 2. Crear Screenshots para PWA
- [ ] screenshots/home.png (390x844)
- [ ] screenshots/flashcards.png (390x844)
- [ ] screenshots/og-image.png (1200x630) para redes sociales

### 3. Actualizar URLs
Buscar y reemplazar en estos archivos:
- [ ] manifest.json - cambiar URLs de `start_url`
- [ ] sitemap.xml - cambiar `https://hsk1-prep.com` por tu dominio
- [ ] robots.txt - actualizar URL del sitemap
- [ ] index.html - actualizar `og:url` y `twitter:url`

### 4. Configurar Hosting
Elige una plataforma:

**Netlify (Recomendado)**
- Arrastra la carpeta a netlify.com/drop
- El archivo `_headers` se aplicará automáticamente

**Vercel**
- `npx vercel` en la terminal
- `vercel.json` configurará los headers

**Apache/cPanel**
- Sube todos los archivos
- `.htaccess` se aplicará automáticamente

**GitHub Pages**
- Crea repositorio y activa Pages
- Nota: No soporta headers personalizados

### 5. Verificaciones Finales
- [ ] Probar en móvil (iOS y Android)
- [ ] Verificar instalación como PWA
- [ ] Probar modo offline
- [ ] Verificar que el audio TTS funciona
- [ ] Probar en diferentes navegadores
- [ ] Validar HTML: https://validator.w3.org/
- [ ] Lighthouse audit (objetivo: 90+ en todas las categorías)
- [ ] Probar accesibilidad: https://wave.webaim.org/

### 6. Post-Deploy
- [ ] Registrar en Google Search Console
- [ ] Enviar sitemap a Google
- [ ] Configurar Google Analytics (opcional)
- [ ] Configurar monitoreo de errores (Sentry, opcional)

---

## 🚀 Comandos Útiles

```bash
# Servir localmente para pruebas
npx serve .

# O con Python
python -m http.server 8000

# Auditoría Lighthouse desde CLI
npx lighthouse https://tu-dominio.com --view
```

---

## 📱 Prueba de PWA

1. Abre en Chrome/Edge
2. Debería aparecer "Instalar app" en la barra de dirección
3. En móvil: menú → "Añadir a pantalla de inicio"
4. Verifica que funciona sin conexión

---

## 📊 Métricas Objetivo

| Métrica | Objetivo |
|---------|----------|
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.8s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Lighthouse Best Practices | > 90 |
| Lighthouse SEO | > 90 |

---

¡Buena suerte con el lanzamiento! 加油！🎉
