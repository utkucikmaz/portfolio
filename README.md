# 🚀 Portfolio Website

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?logo=tailwind-css&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-blue.svg)

A modern, responsive portfolio website built with React, TypeScript, and cutting-edge web technologies. Features a beautiful 3D interactive background, multi-language support, dark/light theme, and smooth animations.

**[🌐 Live Demo](https://utkucikmaz.com)** • **[📖 Documentation](#table-of-contents)** • **[🐛 Report Bug](https://github.com/utkucikmaz/portfolio/issues)** • **[💡 Request Feature](https://github.com/utkucikmaz/portfolio/issues)**

</div>

---

## 📑 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🚀 Quick Start](#quick-start)
- [📦 Installation](#installation)
- [⚙️ Configuration](#configuration)
- [🏗️ Project Structure](#project-structure)
- [🎨 Customization Guide](#customization-guide)
- [🌐 Internationalization](#internationalization)
- [🚢 Deployment](#deployment)
- [🧪 Development](#development)
- [📝 Available Scripts](#available-scripts)
- [🐛 Troubleshooting](#troubleshooting)
- [📄 License](#license)
- [👤 Author](#author)

---

## Features

### 🌍 Multi-language Support

- **12 Languages**: English, German, Turkish, Chinese, Japanese, Arabic, Russian, Spanish, Portuguese, French, Korean, Dutch
- Automatic language detection based on browser settings
- Persistent language preference with localStorage
- RTL (Right-to-Left) support for Arabic
- Language-specific CV downloads

### 🎨 Theme System

- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- Persistent theme preference
- System preference detection
- Customizable color schemes via CSS variables
- Celestial theme animations

### 🎭 3D Interactive Background

- **Three.js Integration**: Immersive 3D particle system
- Interactive celestial objects
- Performance-optimized rendering
- Responsive to theme changes
- Smooth animations and transitions

### 🚀 Animations & Interactions

- **Framer Motion**: Fluid, engaging animations throughout
- Type animation effects for hero section
- Scroll-triggered animations
- Hover effects and micro-interactions
- Smooth page transitions
- Number animations for statistics

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes (320px - 4K)
- Touch-friendly interactions
- Adaptive layouts
- Responsive typography

### ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Skip to main content link
- Focus indicators
- Semantic HTML structure

### 🔍 SEO Optimization

- Comprehensive meta tags
- Open Graph and Twitter Card support
- Structured data (JSON-LD)
- Sitemap.xml and robots.txt
- Canonical URLs
- Hreflang tags for multilingual SEO
- Optimized page titles and descriptions

### 💼 Professional Sections

- **Hero Section**: Animated introduction with type effects
- **Craft Section**: Skills showcase with certifications
- **Experience Section**: Professional journey timeline
- **Projects Section**: Portfolio projects with live demos
- **Personal Section**: About me and interests
- **Contact Section**: Integrated EmailJS contact form
- **Footer**: Social links and additional information

### ⚡ Performance

- Vite for lightning-fast builds
- Code splitting and lazy loading
- Optimized asset loading
- Image optimization
- Minimal bundle size
- Fast HMR (Hot Module Replacement)

## Tech Stack

### Core Technologies

| Technology     | Version | Purpose                            |
| -------------- | ------- | ---------------------------------- |
| **React**      | 18.2.0  | UI library for building components |
| **TypeScript** | 5.9.3   | Type-safe JavaScript               |
| **Vite**       | 5.1.4   | Build tool and dev server          |

### Styling & UI

| Technology        | Version | Purpose                         |
| ----------------- | ------- | ------------------------------- |
| **Tailwind CSS**  | 3.3.0   | Utility-first CSS framework     |
| **Framer Motion** | 10.16.1 | Animation library               |
| **Heroicons**     | 2.0.18  | Icon library                    |
| **Radix UI**      | 1.2.8   | Accessible component primitives |

### 3D Graphics

| Technology             | Version | Purpose                              |
| ---------------------- | ------- | ------------------------------------ |
| **Three.js**           | 0.155.0 | 3D graphics library                  |
| **@react-three/fiber** | 8.18.0  | React renderer for Three.js          |
| **@react-three/drei**  | 9.122.0 | Useful helpers for react-three-fiber |

### Internationalization

| Technology                           | Version | Purpose                        |
| ------------------------------------ | ------- | ------------------------------ |
| **i18next**                          | 23.7.6  | Internationalization framework |
| **react-i18next**                    | 13.5.0  | React bindings for i18next     |
| **i18next-browser-languagedetector** | 7.2.0   | Automatic language detection   |

### Additional Libraries

| Technology                 | Version | Purpose                  |
| -------------------------- | ------- | ------------------------ |
| **EmailJS**                | 4.1.0   | Contact form service     |
| **React Router DOM**       | 6.22.1  | Client-side routing      |
| **React Hot Toast**        | 2.6.0   | Toast notifications      |
| **React Type Animation**   | 3.1.0   | Typing animation effects |
| **React Animated Numbers** | 0.16.0  | Number animations        |
| **Axios**                  | 1.6.7   | HTTP client              |
| **React Draggable**        | 4.5.0   | Draggable components     |

### Development Tools

| Technology            | Version | Purpose                     |
| --------------------- | ------- | --------------------------- |
| **ESLint**            | 8.56.0  | Code linting                |
| **Prettier**          | 3.2.5   | Code formatting             |
| **TypeScript ESLint** | 8.53.0  | TypeScript-specific linting |

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **pnpm** / **yarn**)

### Installation

```bash
# Clone the repository
git clone https://github.com/utkucikmaz/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Installation

### Step-by-Step Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/utkucikmaz/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # EmailJS Configuration (Optional - for contact form)
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Configuration

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file or update `EmailSection.tsx`

### SEO Configuration

Update the following files with your information:

1. **`index.html`** - Update meta tags, Open Graph, and Twitter Card data
2. **`src/components/SEO.tsx`** - Update structured data and dynamic meta tags
3. **`public/sitemap.xml`** - Update with your domain
4. **`public/robots.txt`** - Configure crawler rules

### Theme Customization

Edit color schemes in:

- `src/styles/variables.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme configuration

---

## Project Structure

```
portfolio/
├── public/
│   ├── cv-*.pdf              # CV files in multiple languages
│   ├── images/               # Image assets
│   │   ├── hero.jpg
│   │   ├── hero-hover.png
│   │   └── tree.png
│   ├── logo/                 # Company/school logos
│   ├── svg/                  # SVG icons and assets
│   ├── robots.txt            # SEO robots file
│   └── sitemap.xml           # SEO sitemap
│
├── src/
│   ├── api/                  # API routes
│   │   └── cv/
│   │       └── route.ts      # CV download endpoint
│   │
│   ├── components/           # React components
│   │   ├── BackgroundThree.tsx    # 3D background component
│   │   ├── CraftSection.tsx        # Skills and certifications
│   │   ├── EmailSection.tsx        # Contact form
│   │   ├── Experience.tsx          # Work experience timeline
│   │   ├── Footer.tsx              # Footer component
│   │   ├── HawkingRadiation.tsx    # 3D particle effects
│   │   ├── HeroSection.tsx         # Hero section with animations
│   │   ├── LanguageSwitcher.tsx    # Language selector
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── NavLink.tsx             # Navigation link component
│   │   ├── PersonalSection.tsx     # About me section
│   │   ├── ProjectCard.tsx         # Project card component
│   │   ├── ProjectsSection.tsx     # Projects showcase
│   │   ├── ProjectTag.tsx          # Project tag component
│   │   ├── ScrambleText.tsx        # Text scramble animation
│   │   ├── ScrambleWords.tsx       # Word scramble animation
│   │   ├── ScrollToTopButton.tsx   # Scroll to top button
│   │   ├── SEO.tsx                 # SEO component
│   │   ├── SplashScreen.tsx        # Loading splash screen
│   │   ├── TabButton.tsx           # Tab button component
│   │   └── ThemeCelestial.tsx      # Celestial theme effects
│   │
│   ├── i18n/                 # Internationalization
│   │   ├── config.ts         # i18n configuration
│   │   └── locales/          # Translation files
│   │       ├── en.json       # English
│   │       ├── de.json       # German
│   │       ├── tr.json       # Turkish
│   │       ├── zh.json       # Chinese
│   │       ├── ja.json       # Japanese
│   │       ├── ar.json       # Arabic
│   │       ├── ru.json       # Russian
│   │       ├── es.json       # Spanish
│   │       ├── pt.json       # Portuguese
│   │       ├── fr.json       # French
│   │       ├── ko.json       # Korean
│   │       └── nl.json       # Dutch
│   │
│   ├── styles/               # Global styles
│   │   ├── typography.css    # Typography styles
│   │   └── variables.css     # CSS variables
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── i18n.d.ts         # i18n type definitions
│   │   └── index.ts          # Shared types
│   │
│   ├── App.tsx               # Main app component
│   ├── App.css               # App-specific styles
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore                # Git ignore rules
├── .prettierrc               # Prettier configuration
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── postcss.config.cjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript config for Node
└── vite.config.ts            # Vite configuration
```

---

## Customization Guide

### Adding a New Language

1. **Create translation file**

   ```bash
   # Create a new file in src/i18n/locales/
   # e.g., src/i18n/locales/it.json
   ```

2. **Copy structure from English**

   ```json
   {
     "nav": {
       "home": "Home",
       "craft": "As a Developer",
       ...
     }
   }
   ```

3. **Update i18n config**

   ```typescript
   // src/i18n/config.ts
   import itTranslations from './locales/it.json'

   const resources = {
     // ... existing languages
     it: {
       translation: itTranslations,
     },
   }
   ```

4. **Add CV file**

   ```bash
   # Add cv-italian.pdf to public/
   ```

5. **Update CV language map**

   ```typescript
   // src/components/HeroSection.tsx
   const CV_LANGUAGE_MAP: Record<string, string> = {
     // ... existing mappings
     it: 'cv-italian.pdf',
   }
   ```

6. **Update HTML hreflang tags**
   ```html
   <!-- index.html -->
   <link rel="alternate" hreflang="it" href="https://utkucikmaz.com/?lang=it" />
   ```

### Modifying Theme Colors

**Option 1: CSS Variables**

```css
/* src/styles/variables.css */
:root {
  --primary-color: #0ea5e9;
  --secondary-color: #8b5cf6;
  /* ... */
}

.dark {
  --primary-color: #38bdf8;
  /* ... */
}
```

**Option 2: Tailwind Config**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#38bdf8',
        },
      },
    },
  },
}
```

### Updating Content

#### Personal Information

Edit translation files in `src/i18n/locales/`:

```json
{
  "hero": {
    "greeting": "Hi, I'm",
    "title": "a developer.",
    "subtitle": "Your subtitle here..."
  }
}
```

#### Projects

Update `ProjectsSection.tsx`:

```typescript
const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Your Project',
    description: t('projects.yourproject.description'),
    gitUrl: 'https://github.com/yourusername/project',
    previewUrl: 'https://yourproject.com',
  },
]
```

#### Experience

Update `Experience.tsx` with your work history.

#### Skills

Update `CraftSection.tsx`:

```typescript
const skills: Skill[] = [
  { name: 'Your Skill', icon: '/svg/your-skill.svg', category: 'Category' },
]
```

---

## 🌐 Internationalization

### Supported Languages

| Language      | Code | Status      | RTL Support |
| ------------- | ---- | ----------- | ----------- |
| 🇺🇸 English    | `en` | ✅ Complete | ❌          |
| 🇩🇪 German     | `de` | ✅ Complete | ❌          |
| 🇹🇷 Turkish    | `tr` | ✅ Complete | ❌          |
| 🇨🇳 Chinese    | `zh` | ✅ Complete | ❌          |
| 🇯🇵 Japanese   | `ja` | ✅ Complete | ❌          |
| 🇸🇦 Arabic     | `ar` | ✅ Complete | ✅          |
| 🇷🇺 Russian    | `ru` | ✅ Complete | ❌          |
| 🇪🇸 Spanish    | `es` | ✅ Complete | ❌          |
| 🇵🇹 Portuguese | `pt` | ✅ Complete | ❌          |
| 🇫🇷 French     | `fr` | ✅ Complete | ❌          |
| 🇰🇷 Korean     | `ko` | ✅ Complete | ❌          |
| 🇳🇱 Dutch      | `nl` | ✅ Complete | ❌          |

### Language Detection

The app automatically detects the user's language preference in this order:

1. **localStorage** - Previously selected language
2. **Browser settings** - Navigator language
3. **HTML tag** - Lang attribute
4. **Fallback** - English (en)

### Adding RTL Support

For RTL languages (like Arabic), the app automatically:

- Flips the layout direction
- Adjusts text alignment
- Mirrors navigation and UI elements

---

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Or connect via GitHub**
   - Push your code to GitHub
   - Import project in [Vercel Dashboard](https://vercel.com)
   - Configure environment variables
   - Deploy!

### Netlify

1. **Install Netlify CLI**

   ```bash
   npm i -g netlify-cli
   ```

2. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**

   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Other Platforms

The built `dist` folder can be deployed to any static hosting service:

- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **Cloudflare Pages**
- **Azure Static Web Apps**

---

## Development

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Write code
   - Add tests (if applicable)
   - Update documentation

3. **Run checks**

   ```bash
   npm run lint
   npm run type-check
   npm run format
   ```

4. **Commit changes**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style

- **ESLint** for linting
- **Prettier** for formatting
- **TypeScript** for type safety

Run before committing:

```bash
npm run format
npm run lint
npm run type-check
```

### Browser Support

| Browser | Version | Status |
| ------- | ------- | ------ |
| Chrome  | >= 90   | ✅     |
| Firefox | >= 88   | ✅     |
| Safari  | >= 14   | ✅     |
| Edge    | >= 90   | ✅     |
| Opera   | >= 76   | ✅     |

---

## Available Scripts

| Script               | Description                               |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Start development server with HMR         |
| `npm run build`      | Build for production (outputs to `dist/`) |
| `npm run preview`    | Preview production build locally          |
| `npm run lint`       | Run ESLint to check code quality          |
| `npm run type-check` | Run TypeScript compiler to check types    |
| `npm run format`     | Format code with Prettier                 |

### Script Details

**Development Server**

```bash
npm run dev
# Starts Vite dev server at http://localhost:5173
# Features: HMR, fast refresh, source maps
```

**Production Build**

```bash
npm run build
# Creates optimized production build in dist/
# Includes: minification, tree-shaking, code splitting
```

**Linting**

```bash
npm run lint
# Checks code for errors and warnings
# Uses ESLint with TypeScript and React plugins
```

**Type Checking**

```bash
npm run type-check
# Validates TypeScript types without emitting files
# Catches type errors before runtime
```

**Formatting**

```bash
npm run format
# Formats all code with Prettier
# Ensures consistent code style
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: Port 5173 is already in use
# Solution: Use a different port
npm run dev -- --port 3000
```

#### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run type-check
```

#### Build Failures

```bash
# Clear all caches and reinstall
rm -rf node_modules dist .vite
npm install
npm run build
```

#### i18n Not Loading

- Check that translation files exist in `src/i18n/locales/`
- Verify language codes match in `config.ts`
- Clear browser localStorage

#### 3D Background Not Rendering

- Check browser WebGL support
- Verify Three.js dependencies are installed
- Check browser console for errors

#### EmailJS Not Working

- Verify environment variables are set
- Check EmailJS service and template IDs
- Ensure public key is correct
- Check browser console for API errors

### Getting Help

- 📧 **Email**: [your-email@example.com](mailto:your-email@example.com)
- 💬 **Issues**: [GitHub Issues](https://github.com/utkucikmaz/portfolio/issues)
- 📖 **Documentation**: Check this README and code comments

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Utku Cikmaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

<div align="center">

**Utku Cikmaz**

[![Website](https://img.shields.io/badge/Website-utkucikmaz.com-0ea5e9?style=for-the-badge)](https://utkucikmaz.com)
[![GitHub](https://img.shields.io/badge/GitHub-utkucikmaz-181717?style=for-the-badge&logo=github)](https://github.com/utkucikmaz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-utkucikmaz-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/utkucikmaz/)

Full Stack Web Developer specializing in React, TypeScript, Node.js, and modern web technologies.

</div>

---

## 🙏 Acknowledgments

Special thanks to the amazing open-source community and the creators of:

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [i18next](https://www.i18next.com/) - Internationalization framework
- [EmailJS](https://www.emailjs.com/) - Email service
- And all other amazing libraries that made this project possible!

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

**Made with ❤️ by [Utku Cikmaz](https://utkucikmaz.com)**

[⬆ Back to Top](#portfolio-website)

</div>
