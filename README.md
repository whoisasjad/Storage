# CloudStorage - Free Image Hosting

A beautiful, modern image hosting service that stores images in GitHub and provides instant shareable links.

## Features

- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📁 **Drag & Drop Upload** - Easy file upload with progress tracking
- 🖼️ **Stock Photo Gallery** - Curated collection of nature, landscape, and wildlife photos
- 🔗 **Instant Links** - Get shareable URLs immediately after upload
- 📱 **Mobile Friendly** - Fully responsive design for all devices
- ⚡ **Serverless Backend** - Powered by Vercel serverless functions

## Live Demo

Visit the live site: [https://a4axjd.github.io/Storage/](https://a4axjd.github.io/Storage/)

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import this repository in Vercel
4. Add environment variable:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token with repo permissions
5. Deploy!

### Option 2: Deploy to Cloudflare Pages

1. Fork this repository
2. Connect your GitHub account to [Cloudflare Pages](https://pages.cloudflare.com)
3. Import this repository
4. Add environment variable:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token with repo permissions
5. Deploy!

### GitHub Pages (Static Only)

The static version is automatically deployed to GitHub Pages at:
`https://[username].github.io/Storage/`

Note: Image upload functionality requires serverless backend deployment.

## Environment Variables

- `GITHUB_TOKEN`: GitHub Personal Access Token with repository write permissions

## File Structure

```
Storage/
├── index.html              # Main landing page
├── api/
│   └── upload.js           # Vercel serverless function
├── images/
│   ├── nature/             # Nature stock photos
│   ├── landscape/          # Landscape stock photos
│   ├── wildlife/           # Wildlife stock photos
│   └── uploads/            # User uploaded images
├── vercel.json             # Vercel configuration
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## How It Works

1. **Frontend**: Beautiful HTML/CSS/JavaScript interface with drag & drop upload
2. **Backend**: Serverless function that receives base64-encoded images
3. **Storage**: Images are stored directly in GitHub repository
4. **CDN**: GitHub Pages serves images with global CDN
5. **Links**: Instant shareable URLs using GitHub Pages domain

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own image hosting needs!

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

