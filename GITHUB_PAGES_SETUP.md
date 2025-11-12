# GitHub Pages Setup Instructions

This document provides instructions for enabling GitHub Pages for this repository.

## What is GitHub Pages?

GitHub Pages is a free hosting service provided by GitHub that allows you to host static websites directly from your GitHub repository. Once enabled, your Magnus Archives Character Sheet will be accessible online without requiring users to download or clone the repository.

## Setup Steps

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/Jurneymann/magnus-archives-character-sheet`
2. Click on **Settings** (in the repository menu)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select your main branch (e.g., `main` or `master`) from the dropdown
6. Select **/ (root)** as the folder
7. Click **Save**

### 2. Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-3 minutes
- You'll see a message at the top of the Pages settings with your site URL once it's ready
- The URL will be: `https://jurneymann.github.io/magnus-archives-character-sheet/`

### 3. Verify the Deployment

Once deployed, visit your site at:
```
https://jurneymann.github.io/magnus-archives-character-sheet/
```

The character sheet should load and be fully functional.

## Files Included for GitHub Pages

This repository includes the following files to ensure GitHub Pages works correctly:

- **`.nojekyll`**: An empty file that tells GitHub Pages not to process the site with Jekyll (a static site generator). This ensures all files and directories are served as-is.
- **`index.html`**: The main character sheet file that will be served as the homepage.

## Troubleshooting

### Site Not Loading

- Make sure GitHub Pages is enabled in the repository settings
- Verify that the branch and folder are correctly selected
- Check that the deployment completed successfully (you can see deployment status in the **Actions** tab)
- Clear your browser cache and try again

### Assets Not Loading

- Ensure all asset paths in `index.html` are relative (not absolute)
- The `.nojekyll` file should prevent any issues with directories starting with underscores

### 3D Dice Roller Not Working

- The 3D dice roller should work on GitHub Pages since it's served via HTTPS
- If issues persist, check the browser console for any CORS or loading errors

## Custom Domain (Optional)

If you want to use a custom domain instead of the default `github.io` URL:

1. Purchase and configure your domain with your DNS provider
2. In the GitHub Pages settings, add your custom domain
3. Follow GitHub's documentation for custom domain setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Updating the Site

Any changes pushed to the main branch will automatically trigger a new deployment. The site typically updates within 1-3 minutes after pushing changes.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
