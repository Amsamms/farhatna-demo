# 🎯 Farhatna Demo Startup Guide

## 📋 Quick Reference

**Cost**: FREE ($0/month)  
**Demo URLs**: 
- **Frontend**: https://farhatna-web.loca.lt
- **API**: https://farhatna-api.loca.lt

**Demo Credentials**:
- **Admin**: admin@farhatna.com / admin123
- **Customer**: customer@example.com / customer123

---

## 🚀 How to Start the Demo

### Option A: Quick Check (If Already Running)

1. **Test if demo is live**:
   ```bash
   curl https://farhatna-api.loca.lt/health
   ```

2. **If you get a response**, demo is already running!
   - Open: https://farhatna-web.loca.lt

### Option B: Full Startup (If Not Running)

You need **4 terminals** open:

#### Terminal 1 - API Server
```bash
cd /home/amsamms/projects/clients/farhetna/apps/api
npm run dev
```
*Wait for: "Server running on port 5000"*

#### Terminal 2 - Frontend Server  
```bash
cd /home/amsamms/projects/clients/farhetna/apps/web
npm run dev
```
*Wait for: "Local: http://localhost:5173/"*

#### Terminal 3 - API Tunnel
```bash
lt --port 5000 --subdomain farhatna-api
```
*Wait for: "your url is: https://farhatna-api.loca.lt"*

#### Terminal 4 - Frontend Tunnel
```bash
lt --port 5173 --subdomain farhatna-web
```
*Wait for: "your url is: https://farhatna-web.loca.lt"*

---

## ✅ Testing Checklist

### 1. API Health Check
```bash
curl https://farhatna-api.loca.lt/health
```
**Expected**: `{"status":"OK","timestamp":"..."}`

### 2. Suppliers Data Check
```bash
curl https://farhatna-api.loca.lt/suppliers | head -n 5
```
**Expected**: JSON array with supplier data

### 3. Frontend Access
**Open**: https://farhatna-web.loca.lt
**Expected**: Landing page with language switcher

---

## 🎭 Demo Flow for Client

### 1. Landing Page
- Show bilingual support (EN ↔ AR button)
- Demonstrate RTL layout in Arabic
- Browse suppliers by category

### 2. Authentication
**Admin Login**: admin@farhatna.com / admin123
- Show admin dashboard
- Manage bookings
- View analytics

**Customer Login**: customer@example.com / customer123  
- Browse suppliers
- Make a booking
- View booking history

### 3. Key Features to Highlight
- ✅ Bilingual (English/Arabic) with RTL
- ✅ Complete booking workflow
- ✅ Admin management dashboard
- ✅ Mobile responsive design
- ✅ Professional UI/UX
- ✅ Real-time booking updates

---

## 🛠 Troubleshooting

### Problem: Tunnel URLs Don't Work
**Solution**: Restart the tunnel commands (Terminal 3 & 4)

### Problem: API Errors
**Solution**: 
1. Check API server (Terminal 1)
2. Restart if needed: `npm run dev`

### Problem: Frontend Won't Load
**Solution**:
1. Check frontend server (Terminal 2)  
2. Restart if needed: `npm run dev`

### Problem: Database Issues
**Solution**:
```bash
cd /home/amsamms/projects/clients/farhetna/apps/api
npm run prisma:push
npm run seed
```

---

## 📱 Demo URLs (Save These)

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | https://farhatna-web.loca.lt | Main demo site |
| **API** | https://farhatna-api.loca.lt | Backend API |
| **Health Check** | https://farhatna-api.loca.lt/health | API status |
| **Suppliers** | https://farhatna-api.loca.lt/suppliers | Suppliers data |

---

## 💡 Pro Tips

1. **Keep all 4 terminals open** during demo
2. **Test health check** before presenting
3. **Have backup plan**: localhost:5173 if tunnels fail
4. **Demo credentials** are seeded automatically
5. **Cost**: Emphasize FREE ($0/month) solution

---

## 🎯 Client Presentation Points

### Technical Achievements
- Modern React + Node.js stack
- Bilingual support with RTL
- JWT authentication & authorization
- Complete booking workflow
- Admin dashboard with analytics
- Mobile-first responsive design

### Business Value
- **Cost**: $0/month for demo
- **Scalability**: Ready for production migration
- **Professional**: Production-ready code quality
- **Features**: All core wedding platform features
- **Time**: Built in 1 day as proof of concept

---

*Last Updated: July 19, 2025*  
*Total Development Time: 1 day*  
*Monthly Cost: $0 (FREE)*