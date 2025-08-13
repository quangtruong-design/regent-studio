# 🎨 Regent Studio - Premium 3D Creative Agency

<div align="center">

![Regent Studio Logo](./public/images/logo.svg)

**Crafting powerful visual experiences through cutting-edge 3D graphics, cinematic storytelling, and innovative design solutions.**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [💬 Contact](#contact)

</div>

---

## ✨ Features

### 🎯 **Modern UI/UX Design**
- **Glass Morphism Effects** - Sophisticated translucent design elements
- **3D Animations** - Immersive floating elements and interactive components
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark Theme** - Professional color scheme with lime accent highlights

### 🎬 **Interactive Elements**
- **Dynamic Logo Hover** - Switches between logo variants on hover
- **Parallax Scrolling** - Multi-layer depth effects
- **Smooth Animations** - Powered by Framer Motion
- **Hover Effects** - Enhanced user engagement throughout

### 📧 **Contact Integration**
- **EmailJS Integration** - Direct contact form to your inbox
- **Modal Contact Form** - Compact, professional inquiry system
- **Real-time Validation** - Form validation with success/error feedback
- **Multiple Access Points** - Contact options in hero and footer sections

### 🎨 **Visual Excellence**
- **Custom SVG Elements** - Unique floating design elements
- **Professional Typography** - Roboto font family for optimal readability
- **Color Harmony** - Synchronized color palette preventing visual conflicts
- **Modern Iconography** - Consistent visual language throughout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/regent-studio.git
   cd regent-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up EmailJS** (Optional)
   ```bash
   # Edit lib/emailjs-config.ts with your credentials
   # See EMAILJS_SETUP.md for detailed instructions
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Technology Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js" />
<br>Next.js
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br>Tailwind
</td>
</tr>
<tr>
<td align="center" width="96">
<img src="https://user-images.githubusercontent.com/16860528/20176256-42c8151a-a70e-11e6-9f6c-6d1c0a04ca8a.png" width="48" height="48" alt="Framer Motion" />
<br>Framer Motion
</td>
<td align="center" width="96">
<img src="https://avatars.githubusercontent.com/u/22565644?s=48&v=4" width="48" height="48" alt="EmailJS" />
<br>EmailJS
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
<br>Vercel
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=figma" width="48" height="48" alt="Figma" />
<br>Design
</td>
</tr>
</table>

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.4.6 | React framework with SSR/SSG |
| **React** | 19.1.0 | Component-based UI library |
| **TypeScript** | 5.0+ | Type-safe JavaScript |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework |
| **Framer Motion** | Latest | Animation and gesture library |
| **EmailJS** | Latest | Contact form email service |

## 📁 Project Structure

```
regent-studio/
├── 📂 app/                    # Next.js app directory
│   ├── favicon.ico           # Site favicon
│   ├── globals.css           # Global styles & animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page
├── 📂 components/            # React components
│   ├── BrandSection.tsx     # Brand story & business info
│   ├── ContactForm.tsx      # Email contact modal
│   ├── Footer.tsx           # Site footer with links
│   ├── HerroSection.tsx     # Hero section with animations
│   └── TermSection.tsx      # Team showcase section
├── 📂 lib/                   # Utility libraries
│   └── emailjs-config.ts    # EmailJS configuration
├── 📂 public/               # Static assets
│   └── 📂 images/           # Image assets
│       ├── element.svg      # Floating design element
│       ├── logo.svg         # Primary logo
│       └── logo_v2.svg      # Hover variant logo
├── 📄 EMAILJS_SETUP.md      # EmailJS setup guide
├── 📄 README.md             # This file
└── 📄 package.json          # Dependencies & scripts
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--accent-lime: #a2ff00      /* Primary brand color */
--accent-blue: #00d4ff      /* Secondary accent */
--accent-purple: #8b5cf6    /* Tertiary accent */

/* Background */
--background: #0a0a0a       /* Deep black */
--foreground: #f5f5f5       /* Light text */

/* Glass Effects */
--glass-bg: rgba(255, 255, 255, 0.08)
--glass-border: rgba(255, 255, 255, 0.15)
```

### Typography

- **Primary Font**: Roboto (Google Fonts)
- **Weights**: 100, 300, 400, 500, 700, 900
- **Styles**: Normal, Italic

### Animations

- **Duration**: 0.3s for interactions, 0.8s for page transitions
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Hover Effects**: Scale, glow, and filter transformations

## 🧩 Components Overview

### HeroSection
- **Purpose**: Landing area with navigation and call-to-action
- **Features**: Animated logo, floating elements, contact modal
- **Animations**: Parallax scrolling, particle effects

### TeamSection  
- **Purpose**: Showcase team members and company stats
- **Features**: Interactive member cards, statistics grid
- **Animations**: Staggered reveals, hover transformations

### BrandSection
- **Purpose**: Brand story and business field information
- **Features**: Services grid, detailed descriptions
- **Animations**: Scroll-triggered content reveals

### ContactForm
- **Purpose**: Direct communication with the studio
- **Features**: EmailJS integration, form validation
- **Animations**: Modal transitions, loading states

### Footer
- **Purpose**: Site links and additional contact options
- **Features**: Newsletter signup, social links, logo
- **Animations**: Hover effects, background elements

## 📧 EmailJS Setup

1. **Create Account**: Sign up at [emailjs.com](https://emailjs.com)
2. **Configure Service**: Set up your email provider
3. **Create Template**: Use provided template structure
4. **Update Config**: Edit `lib/emailjs-config.ts`

For detailed instructions, see [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Manual Build

```bash
npm run build
npm start
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🎯 Performance

- **Lighthouse Score**: 95+ Performance
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js automatic optimization
- **Font Loading**: Optimized with `next/font`

## 🛡️ Security

- **CSP Headers**: Content Security Policy implemented
- **HTTPS Only**: Secure connections enforced
- **Input Validation**: Form sanitization and validation
- **XSS Protection**: Built-in Next.js security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Regent Studio**
- 📧 Email: contact@regentstudio.com
- 📞 Phone: +1 (234) 567-890
- 🌐 Website: [regentstudio.com](#)

---

<div align="center">

**Made with ❤️ in Vietnam**

*Crafting the future of 3D visual experiences*

[![GitHub stars](https://img.shields.io/github/stars/username/regent-studio?style=social)](https://github.com/username/regent-studio)
[![Twitter Follow](https://img.shields.io/twitter/follow/regentstudio?style=social)](https://twitter.com/regentstudio)

</div>