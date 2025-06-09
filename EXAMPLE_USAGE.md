# Example Usage - Design-to-Code Repository

This is a practical example of how to use the deployment template for the Design-to-Code workshop.

## READY-TO-USE PROMPT

Copy this exact prompt and paste it to an AI assistant:

---

Convert the workshop landing page to a complete React project with automated GitHub Pages deployment following this exact pattern:

**Repository**: `Design-to-Code-Dev`  
**TSX File**: `website/design-code-landing.tsx`  
**Live URL**: `https://paulasilvatech.github.io/Design-to-Code-Dev/`  
**Theme**: `Design-to-Code automation with AI assistance`  

### REQUIREMENTS:

1. **Setup React/Vite project in `website/` directory**:
   - Convert TSX file to `src/components/LandingPageComplete.tsx`
   - Create complete React structure with TypeScript
   - Configure Vite with base path: `/Design-to-Code-Dev/`
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
├── vite.config.ts (with base: '/Design-to-Code-Dev/')
├── tsconfig.json
├── tailwind.config.js
├── index.html
└── README.md (English)
```

Execute all steps, verify deployment works, and ensure the site is live at https://paulasilvatech.github.io/Design-to-Code-Dev/

---

## OTHER WORKSHOP EXAMPLES

### Secure Code AI:
```
Repository: Secure-Code-AI-Dev
TSX File: website/secure-code-landing.tsx
Live URL: https://paulasilvatech.github.io/Secure-Code-AI-Dev/
Theme: Secure coding practices with AI-powered analysis
```

### Agentic Operations:
```
Repository: Agentic-Ops-Dev  
TSX File: website/agentic-ops-landing.tsx
Live URL: https://paulasilvatech.github.io/Agentic-Ops-Dev/
Theme: Autonomous operations and observability with AI agents
```

### Figma-to-Code:
```
Repository: Figma-to-Code-Dev
TSX File: website/figma-code-landing.tsx  
Live URL: https://paulasilvatech.github.io/Figma-to-Code-Dev/
Theme: Convert Figma designs to code with AI automation
```

## USAGE INSTRUCTIONS:

1. **Replace the placeholder values** with your specific repository details
2. **Copy the entire prompt** (including requirements and structure)
3. **Paste to AI assistant** in the target repository
4. **Verify the deployment** works after completion

This ensures consistent, professional React deployments across all workshop repositories with automated GitHub Pages deployment. 