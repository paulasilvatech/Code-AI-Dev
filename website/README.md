# AI Code Development Landing Page

This is the landing page for the **AI-Powered Code Development** workshop built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Automated Deploy via GitHub Actions

The deployment is automatically handled via GitHub Actions to GitHub Pages whenever:

- Push to `main` branch with changes in `website/` directory
- Manual workflow execution

### How deployment works:

1. **Trigger**: Push to `main` or manual execution
2. **Build**: 
   - Install dependencies with `npm ci`
   - Execute build with `npm run build`
   - Generate static files in `dist/` folder
3. **Deploy**: Automatically publish to GitHub Pages

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm

### Available commands:

```bash
# Install dependencies
npm install

# Development (local server)
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📁 Project Structure

```
website/
├── src/
│   ├── components/
│   │   └── LandingPageComplete.tsx  # Main component
│   ├── App.tsx                      # Main App
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── dist/                            # Build output
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🎨 Technologies

- **React 18** - UI Library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - CSS Framework
- **Lucide React** - Icons

## 🌐 URLs

- **Live site**: https://paulasilvatech.github.io/Code-AI-Dev/
- **Repository**: https://github.com/paulasilvatech/Code-AI-Dev

## 📋 Implemented Features

✅ **Interactive modals** for workshop modules  
✅ **Access request form** with validation  
✅ **Responsive design** with purple/pink gradients  
✅ **Custom logo** with animations  
✅ **Complete sections**: Hero, Modules, Impact, Form  
✅ **Automated deployment** via GitHub Actions  

## 🔄 Deployment Flow

1. Develop locally
2. Commit and push to `main`
3. GitHub Actions automatically:
   - Builds the project
   - Deploys to GitHub Pages
   - Site updated in ~2-3 minutes

## 🐛 Troubleshooting

### Build failing:
- Check if all dependencies are installed
- Run `npm run build` locally to test

### Deploy not working:
- Verify GitHub Pages is enabled in repository settings
- Confirm workflow permissions are correct
- Check GitHub Actions logs for details

## 📞 Support

For deployment or development issues, check:
1. GitHub Actions logs
2. Browser console for errors
3. Repository settings on GitHub 