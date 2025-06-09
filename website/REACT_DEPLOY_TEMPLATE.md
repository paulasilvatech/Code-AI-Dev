# React Landing Page Deployment Template

Use this prompt to convert any TSX landing page into a complete React project with automated GitHub Pages deployment.

## PROMPT TEMPLATE

---

**INSTRUCTIONS FOR AI ASSISTANT:**

Convert the existing landing page to a complete React/Vite project with automated GitHub Pages deployment.

### **INPUT REQUIREMENTS:**
- **Repository name**: `[REPOSITORY_NAME]` (e.g., "Design-to-Code-Dev")
- **Landing page file**: `[TSX_FILE_PATH]` (e.g., "website/design-code-landing.tsx")
- **Live site URL**: `[LIVE_SITE_URL]` (e.g., "https://paulasilvatech.github.io/Design-to-Code-Dev/")
- **Workshop theme**: `[WORKSHOP_THEME]` (e.g., "Design-to-Code automation")

### **PROJECT SETUP REQUIREMENTS:**

1. **Create React/Vite Structure in `website/` directory:**
   ```
   website/
   ├── src/
   │   ├── components/
   │   │   └── LandingPageComplete.tsx
   │   ├── App.tsx
   │   ├── main.tsx
   └── index.css
   ├── package.json
   ├── vite.config.ts
   ├── tsconfig.json
   ├── tsconfig.node.json
   ├── tailwind.config.js
   ├── index.html
   ├── .gitignore
   ├── README.md
   └── favicon.ico
   ```

2. **Dependencies (package.json):**
   ```json
   {
     "name": "[repository-name]-landing-page",
     "private": true,
     "version": "0.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
       "preview": "vite preview"
     },
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "lucide-react": "^0.263.1"
     },
     "devDependencies": {
       "@types/react": "^18.2.15",
       "@types/react-dom": "^18.2.7",
       "@typescript-eslint/eslint-plugin": "^6.0.0",
       "@typescript-eslint/parser": "^6.0.0",
       "@vitejs/plugin-react": "^4.0.3",
       "autoprefixer": "^10.4.14",
       "eslint": "^8.45.0",
       "eslint-plugin-react-hooks": "^4.6.0",
       "eslint-plugin-react-refresh": "^0.4.3",
       "postcss": "^8.4.24",
       "tailwindcss": "^3.3.0",
       "typescript": "^5.0.2",
       "vite": "^4.4.5"
     }
   }
   ```

3. **Vite Configuration (vite.config.ts):**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/[REPOSITORY_NAME]/',
     build: {
       outDir: 'dist',
       assetsDir: 'assets',
       rollupOptions: {
         input: {
           main: './index.html'
         }
       }
     }
   })
   ```

4. **TypeScript Configuration (tsconfig.json):**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "useDefineForClassFields": true,
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "module": "ESNext",
       "skipLibCheck": true,
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true
     },
     "include": ["src"],
     "references": [{ "path": "./tsconfig.node.json" }]
   }
   ```

5. **Tailwind Configuration (tailwind.config.js):**
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         animation: {
           'blob': 'blob 7s infinite',
         },
         keyframes: {
           blob: {
             '0%': { transform: 'translate(0px, 0px) scale(1)' },
             '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
             '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
             '100%': { transform: 'translate(0px, 0px) scale(1)' },
           }
         },
       },
     },
     plugins: [],
   }
   ```

### **GITHUB ACTIONS DEPLOYMENT:**

Update `.github/workflows/deploy-website.yml`:
```yaml
name: Deploy React Landing Page to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'website/**'
      - '.github/workflows/deploy-website.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: './website/package-lock.json'

      - name: Install dependencies
        run: npm ci
        working-directory: ./website

      - name: Build React app
        run: npm run build
        working-directory: ./website

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./website/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### **CODE CONVERSION REQUIREMENTS:**

1. **Convert TSX file to React component:**
   - Remove `React` import (use only hooks needed)
   - Add proper TypeScript types for all props
   - Fix any TypeScript errors (especially `any` types)
   - Ensure component is exported as default

2. **File structure:**
   - Copy TSX content to `src/components/LandingPageComplete.tsx`
   - Create minimal `src/App.tsx` that imports the landing page
   - Create `src/main.tsx` with React.StrictMode setup
   - Create `src/index.css` with Tailwind imports

3. **HTML template (index.html):**
   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <link rel="icon" type="image/x-icon" href="/favicon.ico" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>[WORKSHOP_TITLE] Workshop</title>
       <meta name="description" content="[WORKSHOP_DESCRIPTION]" />
       <meta property="og:title" content="[WORKSHOP_TITLE] Workshop" />
       <meta property="og:description" content="[WORKSHOP_DESCRIPTION]" />
       <meta property="og:url" content="[LIVE_SITE_URL]" />
     </head>
     <body>
       <div id="root"></div>
       <script type="module" src="/src/main.tsx"></script>
     </body>
   </html>
   ```

### **CLEANUP REQUIREMENTS:**

**Remove all unnecessary files from `website/` directory:**
- All `.html` files (except `index.html` generated by build)
- `static/` directory and contents
- Jekyll configuration files (`_config.yml`, `.nojekyll`)
- Old TSX files after copying to src/
- Any shell scripts or legacy config files
- `CNAME` files
- Old CSS files not part of React build

**Keep only:**
- React project files (src/, package.json, etc.)
- Build output (dist/)
- Dependencies (node_modules/)
- Project configuration files

### **DOCUMENTATION REQUIREMENTS:**

Create `website/README.md` in English:
```markdown
# [Workshop Name] Landing Page

This is the landing page for the **[Workshop Name]** workshop built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Automated Deploy via GitHub Actions

The deployment is automatically handled via GitHub Actions to GitHub Pages whenever:
- Push to `main` branch with changes in `website/` directory
- Manual workflow execution

### How deployment works:
1. **Trigger**: Push to `main` or manual execution
2. **Build**: Install dependencies → Build → Generate static files
3. **Deploy**: Automatically publish to GitHub Pages

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm

### Available commands:
\`\`\`bash
npm install    # Install dependencies
npm run dev    # Development server
npm run build  # Production build
npm run preview # Preview build
\`\`\`

## 🌐 URLs
- **Live site**: [LIVE_SITE_URL]
- **Repository**: https://github.com/paulasilvatech/[REPOSITORY_NAME]

## 📋 Implemented Features
✅ Interactive modals for workshop modules  
✅ Access request form with validation  
✅ Responsive design with theme colors  
✅ Custom logo with animations  
✅ Automated deployment via GitHub Actions
```

### **EXECUTION STEPS:**

1. **Setup Project Structure**
   - Create all configuration files
   - Setup package.json with correct dependencies
   - Configure TypeScript, Vite, and Tailwind

2. **Convert Landing Page**
   - Copy TSX content to React component
   - Fix TypeScript errors
   - Ensure proper imports and exports

3. **Configure Deployment**
   - Update GitHub Actions workflow
   - Set correct repository name in vite.config.ts

4. **Clean Directory**
   - Remove all unnecessary files
   - Keep only React project files

5. **Test and Deploy**
   - Run `npm install` and `npm run build`
   - Commit and push to trigger deployment

6. **Verify**
   - Check GitHub Actions logs
   - Verify site loads at GitHub Pages URL

### **FINAL VALIDATION:**

Ensure:
- ✅ Build completes without errors
- ✅ TypeScript compilation succeeds  
- ✅ Site deploys to GitHub Pages automatically
- ✅ All features work (modals, forms, etc.)
- ✅ Responsive design maintained
- ✅ Documentation in English
- ✅ Clean project structure

---

**Usage Instructions:**
1. Replace all `[PLACEHOLDER]` values with actual project details
2. Provide the TSX file path to be converted
3. Execute all steps in order
4. Verify deployment works correctly

This template ensures consistent, professional React deployments across all workshop repositories. 