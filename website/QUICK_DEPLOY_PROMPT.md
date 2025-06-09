# Quick Deploy Prompt for Workshop Landing Pages

Copy and paste this prompt, replacing the placeholders with your specific repository details:

---

## DEPLOY PROMPT

Convert the workshop landing page to a complete React project with automated GitHub Pages deployment following this exact pattern:

**Repository**: `[REPOSITORY_NAME]` (e.g., "Design-to-Code-Dev")  
**TSX File**: `[TSX_FILE_PATH]` (e.g., "website/design-code-landing.tsx")  
**Live URL**: `[LIVE_SITE_URL]` (e.g., "https://paulasilvatech.github.io/Design-to-Code-Dev/")  
**Theme**: `[WORKSHOP_THEME]` (e.g., "Design-to-Code automation with AI assistance")  

### REQUIREMENTS:

1. **Setup React/Vite project in `website/` directory**:
   - Convert TSX file to `src/components/LandingPageComplete.tsx`
   - Create complete React structure with TypeScript
   - Configure Vite with base path: `/[REPOSITORY_NAME]/`
   - Setup Tailwind CSS with blob animations
   - Include all dependencies: React 18, TypeScript, Lucide React

2. **Configure automated GitHub Actions deployment**:
   - Update `.github/workflows/deploy-website.yml` 
   - Trigger on push to main with `website/**` changes
   - Build: `npm ci` → `npm run build` → deploy to GitHub Pages
   - Output to `website/dist/` directory

3. **Clean up website directory**:
   - Remove ALL unnecessary files: HTML files, static/ folder, Jekyll configs
   - Keep ONLY React project files
   - Remove old TSX file after copying to src/

4. **Fix TypeScript errors**:
   - Add proper types for all props and functions
   - Remove unused imports and variables
   - Ensure clean build with zero errors

5. **Documentation in English**:
   - Create professional README.md with setup instructions
   - Include local development commands
   - Document deployment process

6. **Maintain exact color scheme and features**:
   - Keep original design and gradients exactly
   - Preserve all interactive modals and forms
   - Ensure responsive design works

7. **Test and deploy**:
   - Verify `npm run build` works locally
   - Commit and push to trigger GitHub Actions
   - Confirm site deploys successfully

### FINAL STRUCTURE:
```
website/
├── src/
│   ├── components/LandingPageComplete.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── dist/ (build output)
├── package.json
├── vite.config.ts (with correct base path)
├── tsconfig.json
├── tailwind.config.js
├── index.html
└── README.md (English)
```

Execute all steps, verify deployment works, and ensure the site is live at the provided URL.

---

## EXAMPLE USAGE:

For Design-to-Code repository:

```
Repository: Design-to-Code-Dev
TSX File: website/design-code-landing.tsx  
Live URL: https://paulasilvatech.github.io/Design-to-Code-Dev/
Theme: Design-to-Code automation with AI assistance
```

Replace placeholders and follow all requirements exactly as implemented for Code-AI-Dev. 