# QR Table Manager - Production Setup Guide

This guide will help you set up the QR Table Manager system for your cafe/restaurant. The system allows guests to scan QR codes on tables to view menus, place orders, and pay bills, while staff gets a real-time dashboard to manage orders.

## 🚀 Features

- **QR Code Generation**: Unique QR codes for each table with deep links
- **Guest Ordering**: Mobile-friendly menu with cart management
- **Real-time Dashboard**: Live order tracking and status updates
- **Payment Integration**: Razorpay support (India-ready)
- **Admin Panel**: Table management, menu editing, order monitoring
- **Persistent Carts**: Session-based cart storage per table
- **Tax Calculation**: Automatic tax and total calculation
- **Receipt Generation**: Printable bills and order confirmations

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or SQLite for development)
- Razorpay account (for payments)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
# Install additional dependencies
npm install @prisma/client prisma
npm install -D @types/qrcode
```

### 2. Database Setup

#### Option A: PostgreSQL (Production)

1. Create a PostgreSQL database (Neon, Supabase, Railway, etc.)
2. Set your database URL in `.env`:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_BASE_URL="https://your-domain.com"
```

#### Option B: SQLite (Development)

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 3. Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL="your-database-url"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3001"

# Razorpay (Optional)
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Pusher (Optional - for real-time updates)
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_KEY="your-pusher-key"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="your-pusher-cluster"
```

### 4. Database Migration and Seeding

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# Seed database with sample data
npx tsx scripts/seed.ts
```

### 5. Start Development Server

```bash
npm run dev
```

## 📱 Usage

### For Guests

1. **Scan QR Code**: Guests scan the QR code on their table
2. **Browse Menu**: View menu items organized by categories
3. **Add to Cart**: Add items with quantity controls
4. **Place Order**: Enter name and phone number to submit order
5. **Track Order**: View order status and estimated time
6. **Pay Bill**: Complete payment when ready

### For Staff

1. **Dashboard**: Access `/dashboard` for real-time order management
2. **Order Management**: Update order statuses (Pending → Preparing → Ready → Served)
3. **Table Management**: Access `/admin/tables` to manage tables and QR codes
4. **Menu Management**: Edit menu items and categories (coming soon)

## 🔧 API Endpoints

### Guest Endpoints

- `GET /api/tables/[tableId]` - Get table information
- `GET /api/menu` - Get menu with categories
- `GET /api/cart/[sessionId]` - Get cart items
- `POST /api/cart/[sessionId]` - Save cart items
- `POST /api/orders` - Create new order

### Admin Endpoints

- `GET /api/orders` - Get all orders
- `PATCH /api/orders/[orderId]` - Update order status
- `GET /api/admin/tables` - Get all tables
- `POST /api/admin/tables` - Create new table
- `PATCH /api/admin/tables/[tableId]` - Update table
- `DELETE /api/admin/tables/[tableId]` - Delete table
- `GET /api/admin/tables/[tableId]/qr-code` - Download QR code

## 🎨 Customization

### Styling

The system uses Tailwind CSS with a warm amber/orange theme. Customize colors in:

- `tailwind.config.ts` - Theme colors
- `src/app/globals.css` - Global styles
- Component files - Individual styling

### Menu Items

Add menu items through the database or create an admin interface:

```sql
-- Example: Add a new menu item
INSERT INTO MenuItem (name, description, price, categoryId, isAvailable, isVegetarian, sortOrder)
VALUES ('New Item', 'Description', 199, 'category-id', true, true, 1);
```

### Categories

Organize menu items into categories:

```sql
-- Example: Add a new category
INSERT INTO Category (name, description, sortOrder)
VALUES ('Desserts', 'Sweet treats', 6);
```

## 🔒 Security Considerations

1. **Input Validation**: All inputs are validated on both client and server
2. **SQL Injection**: Prisma ORM prevents SQL injection
3. **XSS Protection**: React automatically escapes user input
4. **Rate Limiting**: Consider adding rate limiting for production
5. **Authentication**: Add admin authentication for production use

## 🚀 Production Deployment

### 1. Build the Application

```bash
npm run build
npm start
```

### 2. Environment Setup

- Set `NODE_ENV=production`
- Use production database
- Configure CDN for images
- Set up SSL certificates

### 3. Database Backup

```bash
# Backup PostgreSQL
pg_dump your_database > backup.sql

# Restore
psql your_database < backup.sql
```

### 4. Monitoring

- Set up error tracking (Sentry)
- Monitor database performance
- Track order analytics
- Set up uptime monitoring

## 🔧 Troubleshooting

### Common Issues

1. **QR Codes Not Generating**
   - Check if `qrcode` package is installed
   - Verify table creation in database
   - Check console for errors

2. **Orders Not Loading**
   - Verify database connection
   - Check API routes are working
   - Ensure Prisma client is generated

3. **Images Not Loading**
   - Verify image paths in database
   - Check if images exist in `public/images/`
   - Ensure proper file permissions

### Debug Mode

Enable debug logging:

```env
DEBUG=prisma:*
```

## 📈 Analytics and Insights

Track key metrics:

- Orders per table
- Popular menu items
- Peak ordering times
- Average order value
- Payment success rates

## 🔄 Updates and Maintenance

### Regular Tasks

1. **Database Backups**: Daily automated backups
2. **Menu Updates**: Regular menu item updates
3. **QR Code Regeneration**: If URLs change
4. **Performance Monitoring**: Monitor response times
5. **Security Updates**: Keep dependencies updated

### Version Updates

```bash
# Update dependencies
npm update

# Regenerate Prisma client
npx prisma generate

# Run migrations
npx prisma db push
```

## 🤝 Support

For issues and questions:

1. Check the troubleshooting section
2. Review API documentation
3. Check database logs
4. Monitor application logs

## 📄 License

This project is licensed under the MIT License.

---

**Happy Ordering! 🍕☕**
