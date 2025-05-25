# AI Code Development Workshop Website

This is a static HTML website for the AI Code Development Workshop.

## Structure

- `index.html` - Homepage
- `vision.html` - Workshop vision page
- `differentiators.html` - Key differentiators page
- `workshop-levels.html` - Workshop levels overview
- `prerequisites.html` - Prerequisites page
- `resources.html` - Resources page
- `faq.html` - Frequently Asked Questions
- `static/` - Static assets (CSS, images, JavaScript)

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by GitHub Actions workflow located at `.github/workflows/deploy-website.yml`.

### GitHub Pages URL

Once deployed, the website will be available at:
```
https://paulanunes85.github.io/Code-AI-Dev/
```

## Content Synchronization

Documentation content is automatically synchronized from the main repository docs when changes are made. This is handled by the GitHub Actions workflow at `.github/workflows/sync-docs-content.yml`.

## Local Development

To view the website locally:

1. Open `index.html` in a web browser
2. Or use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## Making Changes

1. Edit the HTML files directly
2. Update styles in `static/css/`
3. Add images to `static/img/`
4. Commit and push changes to trigger automatic deployment

## Content Updates

The website content is based on the workshop documentation in the repository. When documentation is updated:

1. The sync workflow will automatically create a pull request
2. Review and merge the PR to update the website
3. The deployment workflow will publish the changes to GitHub Pages 