# 🔧 Fix Netlify Deployment Issues

## Problem: Next.js doesn't work with standard Netlify deployment

## Solution 1: Use Netlify's Next.js Plugin (Recommended)

1. **Go to your Netlify dashboard**
2. **Go to Site settings → Build & deploy → Environment**
3. **Add these environment variables:**
   ```
   NODE_VERSION = 18
   NPM_VERSION = 9
   ```

4. **Go to Site settings → Build & deploy → Build settings**
5. **Update these settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

6. **Go to Site settings → Build & deploy → Continuous deployment**
7. **Click "Install Netlify Next.js plugin"**

## Solution 2: Manual Upload with Correct Settings

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Go to Netlify dashboard**
3. **Click "Deploy manually"**
4. **Upload your entire project folder**
5. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

## Solution 3: GitHub Integration (Easiest)

1. **Push your code to GitHub**
2. **Connect Netlify to your GitHub repo**
3. **Netlify will auto-detect Next.js and configure everything**

## Common Errors & Fixes:

### Error: "Build failed"
- Check Node.js version (use 18)
- Make sure all dependencies are in package.json
- Check build logs for specific errors

### Error: "404 Not Found"
- Verify publish directory is `.next`
- Check if build completed successfully
- Make sure all files were uploaded

### Error: "Module not found"
- Run `npm install` before building
- Check if all dependencies are installed

## ✅ After Successful Deployment

Your site will be live at: `https://your-site-name.netlify.app`

### Test URLs:
- `/` - Homepage
- `/menu` - Menu page
- `/order?table=1` - Order page
- `/admin` - Admin panel (password: admin123)

## 🆘 Still Having Issues?

1. **Check Netlify build logs** for specific error messages
2. **Try GitHub integration** instead of manual upload
3. **Use Vercel** as an alternative (better for Next.js)
