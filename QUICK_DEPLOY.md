# 🚀 Quick Deploy to Netlify

## Method 1: Drag & Drop (Easiest)

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Sign up/Login** (free account)
4. **Drag & drop your entire project folder** to the deploy area
5. **Wait for deployment** (usually 2-3 minutes)
6. **Get your live URL!** (like `https://amazing-cafe-123.netlify.app`)

## Method 2: GitHub Integration

1. **Create a GitHub repository**
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/mycafe.git
   git push -u origin main
   ```
3. **Connect to Netlify** and select your repository
4. **Deploy automatically!**

## Method 3: Manual Upload

1. **Zip your project folder**
2. **Upload to Netlify**
3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

## ✅ After Deployment

Your site will be live at: `https://your-site-name.netlify.app`

### Test These URLs:
- `/` - Homepage with menu QR code
- `/menu` - Menu page
- `/order?table=1` - Order page for table 1
- `/admin` - Admin panel (password: admin123)
- `/events` - Events page

### QR Code Testing:
1. **Download/Print QR codes** from your live site
2. **Scan with mobile device**
3. **Should open the correct pages!**

## 🔧 Troubleshooting

If you get 404 errors:
- Check if build completed successfully
- Verify the publish directory is `.next`
- Make sure all files are uploaded
- Check Netlify build logs for errors
