# 🚀 Deployment Guide for MyCafe Website

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Login to Vercel (create account if needed)
   - Project name: `mycafe`
   - Framework: Next.js
   - Build settings: Default

4. **Your site will be live at:** `https://mycafe.vercel.app`

### Option 2: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag & drop the `.next` folder
   - Or connect your GitHub repository

### Option 3: GitHub Pages

1. **Create GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mycafe.git
   git push -u origin main
   ```

3. **Enable GitHub Pages** in repository settings

## 🔧 Pre-Deployment Checklist

### 1. Update QR Code URLs
Make sure all QR codes use relative URLs (they already do):
- ✅ `/menu` - Main menu QR code
- ✅ `/order?table=1` - Table-specific QR codes

### 2. Test Build Locally
```bash
npm run build
npm start
```

### 3. Environment Variables (if needed)
Create `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📱 Testing QR Codes

After deployment:

1. **Download/Print QR codes** from your live website
2. **Scan with mobile device** - should open the menu/order page
3. **Test table-specific QR codes** from admin panel

## 🌐 Custom Domain (Optional)

### Vercel:
1. Go to project dashboard
2. Settings → Domains
3. Add your custom domain
4. Update DNS records

### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS

## 🔒 Admin Access

- **URL:** `https://your-domain.com/admin`
- **Password:** `admin123` (change this in production!)

## 📊 Analytics (Optional)

Add Google Analytics or Vercel Analytics to track QR code usage.

## 🚨 Important Notes

1. **QR codes work with live URLs** - localhost won't work on mobile
2. **HTTPS required** for camera access on mobile devices
3. **Test on real devices** - QR codes may not work in browser simulators
4. **Update admin password** before going live

## 🆘 Troubleshooting

### QR Code Not Working:
- Check if URL is accessible on mobile
- Ensure HTTPS is enabled
- Test with different QR scanner apps

### Build Errors:
- Check Node.js version (16+ recommended)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### Deployment Issues:
- Check build logs
- Ensure all dependencies are in `package.json`
- Verify `next.config.js` settings
