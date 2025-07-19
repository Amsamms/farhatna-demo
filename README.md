# 🎉 Farhatna - Wedding Services Booking Platform

A modern web application for booking wedding services across Egypt. Built with React + Vite frontend and Fastify + Prisma backend.

## ✨ Features

- **Customer Portal**: Browse and book wedding services
- **Admin Dashboard**: Manage bookings and view analytics
- **Service Categories**: Venues, Photography, Dresses, Makeup, Catering, Travel
- **Authentication**: JWT-based auth with role-based access
- **Responsive Design**: Tablet-friendly interface (≥768px)

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand
- **Backend**: Node.js, Fastify, Prisma ORM
- **Database**: SQLite (for development)
- **Authentication**: JWT with bcrypt
- **UI Components**: Custom components with Lucide React icons

## 📁 Project Structure

```
farhatna/
├── apps/
│   ├── api/           # Fastify backend
│   │   ├── server.js  # Main server file
│   │   ├── seed.js    # Database seeding
│   │   └── package.json
│   └── web/           # React frontend
│       ├── src/
│       │   ├── pages/     # Page components
│       │   ├── components/ # Reusable components
│       │   ├── store/     # Zustand state
│       │   └── utils/     # API utilities
│       └── package.json
├── prisma/
│   └── schema.prisma  # Database schema
└── CLAUDE.md          # Project instructions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### 1. Install Dependencies

**Backend:**
```bash
cd apps/api
npm install
```

**Frontend:**
```bash
cd apps/web
npm install
```

### 2. Setup Database

From the API directory:
```bash
cd apps/api
npm run prisma:push    # Create database
npm run seed          # Populate with sample data
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```
Frontend runs on: http://localhost:5173

## 🔑 Demo Credentials

**Admin Account:**
- Email: `admin@farhatna.com`
- Password: `admin123`

**Customer Account:**
- Email: `customer@example.com` 
- Password: `customer123`

## 📱 Usage

1. **Landing Page**: Visit http://localhost:5173
2. **Browse Services**: Click "Explore Services" to view suppliers
3. **Authentication**: Login with demo credentials or register new account
4. **Admin Dashboard**: Login as admin to manage bookings
5. **Customer Booking**: Login as customer to view your bookings

## 🎯 Available Scripts

### Backend (apps/api)
```bash
npm start              # Start production server
npm run dev           # Start development server with hot reload
npm run prisma:push   # Sync database with schema
npm run prisma:generate # Generate Prisma client
npm run seed          # Seed database with sample data
```

### Frontend (apps/web)
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Suppliers
- `GET /suppliers` - List all suppliers
- `GET /suppliers?category=VENUE` - Filter by category
- `GET /suppliers/:id` - Get supplier details

### Bookings
- `POST /bookings` - Create booking (auth required)
- `GET /bookings/me` - Get user's bookings (auth required)

### Admin
- `GET /admin/bookings` - Get all bookings (admin only)
- `PATCH /admin/bookings/:id` - Update booking status (admin only)

## 🔧 Configuration

### Environment Variables
Create `.env` files if needed:

**Backend (.env in apps/api/):**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=5000
```

**Frontend (.env in apps/web/):**
```env
VITE_API_URL=http://localhost:5000
```

## 🏗 Database Schema

The application uses the following main entities:
- **Users**: Customers and Admins
- **Suppliers**: Wedding service providers
- **Bookings**: Customer bookings with suppliers

Categories: VENUE, PHOTOGRAPHER, DRESS, MAKEUP, CATERING, TRAVEL
Booking Status: PENDING, CONFIRMED, CANCELLED

## 🎨 Design System

- **Primary Color**: #E91E63 (Pink)
- **Secondary Color**: #7C4DFF (Violet)  
- **Background**: #FDFDFD
- **Font**: Inter (Google Fonts)

## 🔍 Troubleshooting

**Database Issues:**
```bash
# Reset database
rm apps/api/dev.db
cd apps/api && npm run prisma:push && npm run seed
```

**Port Conflicts:**
- Backend: Change port in `apps/api/server.js`
- Frontend: Use `npm run dev -- --port 3000`

**CORS Errors:**
- Ensure frontend URL is in CORS origins in `server.js`

## 🚀 Production Deployment

1. **Build Frontend:**
```bash
cd apps/web
npm run build
```

2. **Setup Production Database:**
```bash
cd apps/api
# Switch to PostgreSQL/MySQL in production
npm run prisma:push
npm run seed
```

3. **Start Production Server:**
```bash
cd apps/api
npm start
```

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

**Ahmed Mohamed Sabri**
- GitHub: [@amsamms](https://github.com/amsamms)
- Email: ahmedsabri85@gmail.com

---

**Note**: This is a demo/prototype application. For production use, implement additional security measures, error handling, and testing.