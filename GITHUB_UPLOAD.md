# 🚀 Upload to GitHub - Step by Step

## ✅ Step 1: Create GitHub Repository

1. **Go to [github.com](https://github.com)**
2. **Sign in to your account**
3. **Click "+" → "New repository"**
4. **Fill in details:**
   - Repository name: `mycafe-website`
   - Description: `Modern cafe website with QR code ordering system`
   - Make it Public
   - Don't initialize with README
5. **Click "Create repository"**

## ✅ Step 2: Connect Your Local Repository

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/mycafe-website.git
git branch -M main
git push -u origin main
```

## ✅ Step 3: Verify Upload

1. **Go to your GitHub repository page**
2. **You should see all your files uploaded**
3. **Your repository URL will be:** `https://github.com/yourusername/mycafe-website`

## 🚀 Step 4: Deploy from GitHub

### Option A: Deploy to Netlify
1. **Go to [netlify.com](https://netlify.com)**
2. **Click "New site from Git"**
3. **Choose GitHub**
4. **Select your `mycafe-website` repository**
5. **Netlify will auto-detect Next.js and configure everything**
6. **Click "Deploy site"**

### Option B: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your `mycafe-website` repository**
5. **Vercel will auto-configure everything**
6. **Click "Deploy"**

## 📱 After Deployment

Your site will be live at:
- **Netlify:** `https://your-site-name.netlify.app`
- **Vercel:** `https://your-site-name.vercel.app`

### Test Your QR Codes:
- `/` - Homepage with menu QR code
- `/menu` - Menu page
- `/order?table=1` - Order page for table 1
- `/admin` - Admin panel (password: admin123)

## 🔄 Future Updates

To update your live site:
```bash
git add .
git commit -m "Update description"
git push
```

Your site will automatically redeploy!
