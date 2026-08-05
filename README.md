# WebDev Demos — Páginas web para negocios locales

Portafolio y 3 demos funcionales de páginas web para negocios de Cali, Colombia. Diseñadas para vender: enfocadas en conversión vía WhatsApp, SEO técnico, accesibilidad y Core Web Vitals.

## 🎯 Demos incluidas

| Demo | Tipo | Enfoque | Tech Stack |
|------|------|---------|------------|
| **Restaurante La Parrilla** | Restaurante | Menú, pedidos WhatsApp, reseñas | HTML5, CSS3, Vanilla JS |
| **Fashion Store** | Tienda/E-commerce | Catálogo, precios, envíos | HTML5, CSS3, Vanilla JS |
| **Taller Velozco** | Servicios/Taller | Servicios, cotización, citas | HTML5, CSS3, Vanilla JS |
| **Portafolio** | Desarrollador | Casos de estudio, tech stack, contacto | HTML5, CSS3, Vanilla JS |

## ✨ Características principales

- **WhatsApp-first**: Todos los CTAs llevan a WhatsApp con mensajes pre-llenados
- **WhatsApp Flotante**: Botón fijo + modal de cotización en todas las páginas
- **SEO técnico completo**: Open Graph, Twitter Cards, Schema.org (Restaurant, ClothingStore, AutoRepair, ProfessionalService)
- **Accesibilidad WCAG 2.1 AA**: Skip links, ARIA, focus-visible, semantic HTML, contrast ratios
- **Performance**: Lazy loading nativo, preload hero images, dns-prefetch, CSS custom properties, sin frameworks
- **Responsive**: Mobile-first, breakpoints en 640/768/1024/1280px
- **Deploy gratis**: GitHub Pages + Cloudflare (HTTPS, CDN, custom domain ready)

## 🚀 Desarrollo local

```bash
# Clonar
git clone https://github.com/gabyzxdev/webdev-demos.git
cd webdev-demos/WebDev

# Instalar dependencias (solo para lint/format)
npm ci

# Servidor de desarrollo (puerto 3000)
npm run dev

# Lint
npm run lint

# Formatear código
npm run format
```

## 📁 Estructura del proyecto

```
WebDev/
├── .github/workflows/deploy.yml   # CI/CD: lint → deploy GitHub Pages
├── package.json                   # Scripts: dev, lint, format, deploy
├── sitemap.xml                    # Sitemap para SEO
├── robots.txt                     # Robots.txt
├── README.md                      # Este archivo
├── shared/                        # Sistema de diseño compartido
│   ├── variables.css              # CSS Custom Properties (colores, spacing, typography)
│   ├── base.css                   # Componentes base: nav, hero, buttons, cards, sections
│   ├── nav.js                     # Menú móvil + nav scroll shadow
│   ├── whatsapp-float.css         # Botón WhatsApp flotante + modal cotización
│   └── whatsapp-float.js          # Lógica flotante + modal + Formspree → WhatsApp
├── demo-restaurante/
│   ├── index.html
│   ├── styles.css                 # Estilos específicos del restaurante
│   └── images/                    # Placeholders SVG
├── demo-tienda/
│   ├── index.html
│   ├── styles.css                 # Estilos específicos de la tienda
│   └── images/
├── demo-taller/
│   ├── index.html
│   ├── styles.css                 # Estilos específicos del taller
│   └── images/
└── portafolio/
    ├── index.html
    ├── styles.css                 # Estilos del portafolio + tech badges
    └── images/
```

## 🎨 Sistema de diseño (shared/)

### Variables CSS (`variables.css`)
- **Colores**: Paleta neutra + 4 temas de marca (`--color-restaurante`, `--color-tienda`, `--color-taller`, `--color-portafolio`)
- **Tipografía**: Inter (Google Fonts) con fallbacks sistémicos
- **Espaciado**: Escala consistente `--space-1` a `--space-20`
- **Sombras**: 4 niveles (`--shadow-sm` a `--shadow-xl`)
- **Radios**: `--radius-sm` a `--radius-full`
- **Temas**: Aplicar `.theme-restaurante`, `.theme-tienda`, `.theme-taller`, `.theme-portafolio` al `<body>`

### Componentes base (`base.css`)
- `.nav` / `.nav-inner` / `.logo` / `.menu` / `.menu-btn`
- `.hero` / `.hero-texto`
- `.btn` / `.btn-wa` / `.btn-out` / `.btn-brand` / `.btn-out-dark`
- `.sec` / `.dark`
- `.cards` / `.card` / `.ico`
- `.price` / `.precio`
- `.skip-link`
- Responsive breakpoints
- Print styles

### WhatsApp Flotante (`whatsapp-float.css` + `whatsapp-float.js`)
- Botón fijo bottom-right con animación pulse
- Tooltip "Escríbenos por WhatsApp"
- Modal de cotización: Nombre, WhatsApp, Tipo, Mensaje
- Submit → Formspree (background) + abre WhatsApp pre-llenado
- Totalmente accesible (ARIA, focus trap, Escape para cerrar)

## 🔧 Personalización

### Cambiar datos de contacto
Editar en cada `index.html`:
- `tel:+573178695838` → tu WhatsApp
- `mailto:correo@ejemplo.com` → tu email
- Schema.org `telephone`, `email`, `address`

### Cambiar colores de marca
En `shared/variables.css`:
```css
--color-restaurante: #TU_COLOR;
--color-restaurante-light: #TU_COLOR_CLARO;
--color-restaurante-dark: #TU_COLOR_OSCURO;
```
Y en el HTML: `<body class="theme-restaurante">`

### Agregar Formspree real
En `shared/whatsapp-float.js`:
```javascript
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_FORM_ID';
```

### Usar imágenes reales
Reemplazar placeholders en `*/images/`:
- `hero-placeholder.svg` → `hero.jpg` (1200x600, WebP)
- `plato-placeholder.svg` → fotos reales de platos
- `prenda-placeholder.svg` → fotos de productos
- `herramienta-placeholder.svg` → fotos del taller
- `demo-*-thumb.svg` → screenshots reales de las demos

## 📦 Deploy

### GitHub Pages (gratis, recomendado)
1. Push a `main` → GitHub Action hace lint + deploy automático
2. Settings → Pages → Source: "GitHub Actions"
3. URL: `https://gabyzxdev.github.io/WebDev/portafolio/`

### Cloudflare (gratis, mejor performance)
1. Añadir sitio en Cloudflare → DNS: CNAME `gabyzxdev.github.io` → Proxy ON
2. SSL/TLS: Full (strict)
3. Page Rules: Cache Everything + Edge TTL 1 hora
4. Custom domain futuro: solo añadir registro DNS

### Netlify / Vercel (alternativa)
Conectar repo → Build command: `npm run build` → Publish: `dist`

## 📊 Analytics (gratis, privacy-first)
- **Umami Cloud**: 1 sitio, 100k eventos/mes
- **GoatCounter**: Gratis, open source
- Añadir script en `base.html` o inyectar en build

## 📝 Licencia

MIT License - Úsalo libremente para tus proyectos o clientes.

## 👨‍💻 Autor

**Angel Gabriel Campo**  
Desarrollador Web Freelance — Cali, Colombia  
📱 WhatsApp: +57 317 869 5838  
📧 Email: gabyzx.dev@gmail.com  
🌐 Portafolio: `https://gabyzxdev.github.io/WebDev/portafolio/`