# WebDev Demos — Páginas web para negocios locales

Portafolio y 3 demos funcionales de páginas web para negocios de Cali, Colombia. Diseñadas para vender: enfocadas en conversión vía WhatsApp, SEO técnico, accesibilidad y Core Web Vitals.

## 🎯 Demos incluidas

| Demo | Tipo | Enfoque | Tech Stack |
|------|------|---------|------------|
| **Restaurante La Parrilla** | Restaurante | Menú con tabs, pedidos WhatsApp, reseñas carousel | HTML5, CSS3, Vanilla JS |
| **Fashion Store** | Tienda/E-commerce | Catálogo con filtros, quick view, ofertas | HTML5, CSS3, Vanilla JS |
| **Taller Velozco** | Servicios/Taller | Servicios, certificación, agendamiento WhatsApp | HTML5, CSS3, Vanilla JS |
| **Portafolio** | Desarrollador | Case studies, métricas animadas, tech badges | HTML5, CSS3, Vanilla JS |

## ✨ Características principales (v2.0 - Visual Redesign)

- **Hero Split Layout**: 50/50 imagen + contenido en desktop, stacked en mobile con parallax sutil
- **Glassmorphism Nav**: Nav con blur, scroll progress bar (3px), active link highlight
- **Cards v2**: Accent border animado, hover lift + colored shadow, badges, image zoom
- **Scroll Reveal**: IntersectionObserver (hero + cards + stats) con stagger 100ms + counter animation
- **Testimonials Carousel**: Manual (prev/next + dots + keyboard + swipe touch)
- **Menu Tabs** (Restaurante): 4 categorías (entradas, platos, postres, bebidas)
- **Filter Chips** (Tienda): 5 filtros (todo, mujer, hombre, accesorios, ofertas) con animación
- **Case Studies** (Portafolio): 3 proyectos con métricas animadas + tech badges
- **WhatsApp Float Premium**: Botón expandible, pulse rings, modal premium con validación + success state
- **Inter Variable Font**: Self-hosted (woff2, 100-900), fluid typography `clamp()`
- **Glassmorphism + Gradientes**: Nav, modales, botones con brand colors
- **SEO técnico completo**: Open Graph, Twitter Cards, Schema.org (Restaurant, ClothingStore, AutoRepair, ProfessionalService)
- **Accesibilidad WCAG 2.1 AA**: Skip links, ARIA, focus-visible, semantic HTML, contrast ratios
- **Performance**: Lazy loading, preload hero, DNS prefetch, Inter Variable self-hosted, sin frameworks
- **Deploy gratis**: GitHub Pages + Cloudflare (HTTPS, CDN, custom domain ready)

## 🚀 Desarrollo local

```bash
# Clonar
git clone https://github.com/gabyzxdev/webdev-demos.git
cd webdev-demos

# Instalar dependencias (solo para lint/format)
npm ci

# Servidor de desarrollo (puerto 3000)
npm run dev

# Lint (stylelint + htmlhint)
npm run lint

# Formatear código (prettier)
npm run format
```

## 📁 Estructura del proyecto

```
webdev-demos/
├── .github/workflows/deploy.yml   # CI/CD: lint → deploy GitHub Pages
├── package.json                   # Scripts: dev, lint, format, deploy
├── sitemap.xml                    # Sitemap para SEO
├── robots.txt                     # Robots.txt
├── README.md                      # Este archivo
├── shared/                        # Sistema de diseño compartido
│   ├── fonts/Inter-Variable.woff2 # Inter Variable self-hosted (100-900)
│   ├── variables.css              # CSS Custom Properties (fluid type, brand-rgb, gradients, glassmorphism)
│   ├── base.css                   # Glassmorphism nav, scroll progress, hero split, cards v2, stats, testimonials, footer v2
│   ├── components.css             # Cards v2, buttons v2, badges, stats, testimonials
│   ├── animations.css             # Reveal, stagger, ripple, pulse, float
│   ├── nav.js                     # Glassmorphism nav, scroll progress, mobile panel, smooth scroll
│   ├── scroll-reveal.js           # IntersectionObserver (hero + cards + stats + counter)
│   ├── carousel.js                # Testimonials manual (prev/next + dots + keyboard + swipe)
│   ├── whatsapp-float.js          # Expandable btn, pulse rings, premium modal, form validation
│   ├── whatsapp-float.css
│   └── images/                    # Waves SVG, patterns
├── demo-restaurante/
│   ├── index.html                 # Hero split, menu tabs, cards v2, testimonials carousel, stats
│   ├── styles.css
│   └── images/
├── demo-tienda/
│   ├── index.html                 # Hero split, filter chips, cards v2, stats
│   ├── styles.css
│   └── images/
├── demo-taller/
│   ├── index.html                 # Hero split, certifications, sticky CTA, stats
│   ├── styles.css
│   └── images/
└── portafolio/
    ├── index.html                 # Hero split, case studies, tech badges, stats
    ├── styles.css
    └── images/
```

## 🎨 Sistema de diseño (shared/)

### Variables CSS (`variables.css`)
- **Fluid Typography**: `clamp()` para `--fs-xs` a `--fs-5xl` (sin media queries)
- **Brand RGB**: `--color-*-rgb` por tema para sombras coloreadas
- **Gradientes**: `--gradient-brand`, `--gradient-hero`, `--gradient-text`, `--gradient-whatsapp`
- **Sombras coloreadas**: `--shadow-brand`, `--shadow-brand-lg`, `--shadow-whatsapp`, `--shadow-card`
- **Glassmorphism**: `--glass-bg`, `--glass-blur`, `--glass-border`, `--glass-bg-dark`
- **Patterns CSS**: `--pattern-dots`, `--pattern-grid`, `--pattern-noise`
- **Scroll Progress**: `--scroll-progress-height`, `--scroll-progress-bg`
- **Temas**: `.theme-restaurante`, `.theme-tienda`, `.theme-taller`, `.theme-portafolio`

### Componentes base (`base.css`)
- **Nav Glassmorphism**: `.nav.scrolled` con blur, scroll progress bar (3px top)
- **Hero Split**: `.hero-split` (desktop 1.2fr/1fr, mobile stacked)
- **Cards v2**: `.card` con accent border, hover lift + colored shadow
- **Stats Bar**: `.stats-bar` + `.stat-item` con counter animation
- **Testimonials**: `.testimonial` + carousel controls
- **Footer v2**: 4 columnas, newsletter, social icons
- **Section Dividers**: Waves SVG entre secciones
- **Patterns utilities**: `.bg-pattern-dots`, `.bg-pattern-grid`, `.bg-pattern-noise`

### JavaScript Modules
- **nav.js**: Glassmorphism on scroll, scroll progress bar, mobile panel, smooth scroll, active nav
- **scroll-reveal.js**: IntersectionObserver (hero, cards, stats, testimonials, footer) + counter animation
- **carousel.js**: Testimonials manual (prev/next + dots + keyboard + swipe touch)
- **whatsapp-float.js**: Expandable btn, pulse rings, premium modal, validation, success state, Formspree

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
--color-restaurante-rgb: R, G, B;  /* Para sombras coloreadas */
```
Y en el HTML: `<body class="theme-restaurante">`

### Agregar Formspree real
En `shared/whatsapp-float.js` (línea 7):
```javascript
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_FORM_ID';
```

### Mensaje WhatsApp por defecto
En `shared/whatsapp-float.js` (línea 8):
```javascript
var DEFAULT_MESSAGE = 'Tu mensaje personalizado {tipo} {nombre} {tel}';
```

### Usar imágenes reales
Reemplazar en `*/images/`:
- Hero: `hero.jpg` (1600x900, WebP)
- Cards: fotos reales por categoría
- Case studies: screenshots reales (800x450 WebP)

## 📦 Deploy

### GitHub Pages (gratis, recomendado)
1. Push a `main` → GitHub Action: lint → deploy a GitHub Pages
2. Settings → Pages → Source: **"GitHub Actions"**
3. URLs live:
   - `https://gabyzxdev.github.io/webdev-demos/portafolio/`
   - `https://gabyzxdev.github.io/webdev-demos/demo-restaurante/`
   - `https://gabyzxdev.github.io/webdev-demos/demo-tienda/`
   - `https://gabyzxdev.github.io/webdev-demos/demo-taller/`

### Cloudflare (gratis, mejor performance)
1. Añadir sitio en Cloudflare → DNS: CNAME `gabyzxdev.github.io` → **Proxy ON**
2. SSL/TLS: **Full (strict)**
3. Page Rules: **Cache Everything** + Edge TTL 1 hora
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
🌐 Portafolio: `https://gabyzxdev.github.io/webdev-demos/portafolio/`