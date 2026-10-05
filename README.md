# Dikshant Neupane — AI/Data/ML Portfolio

A unique, interactive portfolio website featuring an OS-style interface with draggable windows, terminal commands, and project showcases.

## 🚀 Features

### **Core Functionality**
- **Terminal-based OS Interface** – Draggable windows with minimize/maximize/close controls
- **5 Featured Projects** – Detailed AI/ML project showcases with real GitHub links
- **33+ Repositories** – Organized by category (Web, React, Python, ML & Data, DSA & CS, Experiments)
- **Mobile Responsive** – Bottom tab navigation for mobile devices
- **Live Clock** – Display with Nepali calendar dates (BS)
- **Interactive Terminal** – Command history, autocomplete, and key commands
- **Window Management** – Minimize, maximize, drag, close functionality
- **Wallpaper Switcher** – Toggle between different background images

### **Technical Stack**
- **React 19** with TypeScript
- **Vite** build system with single-file output
- **Tailwind CSS** for styling
- **Responsive Design** – Desktop + mobile optimized
- **Keyboard Shortcuts** – Ctrl+T (open terminal), Escape (close window)

### **Design Quality**
- **Space Grotesk + Inter + JetBrains Mono** typography
- **Warm color palette** with lime green accents
- **Glassmorphism & Frosted Glass** card design
- **Smooth animations** and transitions
- **Professional visual hierarchy**

### **Accessibility & UX**
- Keyboard shortcuts support
- Command autocomplete with Tab key
- Touch-optimized mobile interface
- Proper semantic HTML and ARIA labels
- Screen reader friendly

## 📁 Project Structure

```
d:\project\
├── src\
│   └── App.tsx         # Main application component
├── public\
│   └── images\         # Background images
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── DESIGN.md           # Design system documentation
├── vercel.json         # Vercel deployment configuration
└── .gitignore          # Git ignore file
```

## 🚀 Deployment

### **Deploy to Vercel**
1. Push to GitHub: `git add . && git commit -m "Deploy" && git push origin main`
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings (automatically detected from `vercel.json`)
5. Deploy!

### **Local Development**
```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
```

## 🛡️ Security Headers
This portfolio includes standard security headers configured in `vercel.json`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Strict-Transport-Security
- X-XSS-Protection
- Content-Security-Policy

## 📱 Mobile Features
- **Bottom Tab Bar** – Home, Projects, Repos, About, Contact
- **Project Bottom Sheets** – Interactive project details
- **Enhanced Text Visibility** – Better contrast and larger fonts
- **Optimized Layout** – Improved touch targets and spacing

## 🎨 Design System
Based on the "Sunlit Sanctuary" concept:
- **Warm Ivory** base colors with **Palm Green** accents
- **Organic Minimalism** with **Advanced Glassmorphism**
- **Optical Layering** with backdrop blur and subtle inner glow
- **Fluid Floating Grid** layout

## 🔗 Contact
- **Email**: dikshantneupane69@gmail.com
- **GitHub**: [github.com/Dikshant-Neupane](https://github.com/Dikshant-Neupane)
- **LinkedIn**: [linkedin.com/in/dikshant-neupane](https://www.linkedin.com/in/dikshant-neupane-a64b09326/)

---

Built with ❤️ by Dikshant Neupane