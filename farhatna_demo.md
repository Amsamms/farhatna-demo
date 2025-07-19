# 🎉 Farhatna – Wedding Services Booking Platform (Demo Prototype)

## 0. Objective
Create a **browser‑based web app** that showcases the core user flows:  
1. **Customer flow** – discover suppliers, build a booking, confirm.  
2. **Admin dashboard** – view & manage incoming orders, suppliers, customers.  

Focus on **clean UX**, **tablet usability (≥ 768 px)**, and **modular code** that we can extend later.

---

## 1. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Front‑end | **React 18 + Vite + Tailwind CSS + shadcn/ui** | Fast dev, modern components, great DX |
| State | **Zustand** | Lightweight global state |
| Routing | **react‑router‑dom v6** | Nested routes, code‑splitting |
| Back‑end | **Node 20 + Fastify** | Minimal, high‑perf REST |
| DB / ORM | **SQLite + Prisma** | Zero‑config, easy to ship a single file |
| Auth (demo) | **JWT (access) + HttpOnly cookie** | Enough for prototype |
| Dev Tools | **ESLint, Prettier, Husky** | Code quality & hooks |

---

## 2. Folder Structure

```text
farhatna-demo/
├─ apps/
│  ├─ web/           # React front‑end
│  └─ api/           # Fastify back‑end
├─ prisma/
│  └─ schema.prisma
└─ docker/
   └─ Dockerfile
```

---

## 3. Database Schema (`prisma/schema.prisma`)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  role      Role     @default(CUSTOMER)
  name      String
  email     String   @unique
  password  String   // hashed
  bookings  Booking[]
}

model Supplier {
  id          Int      @id @default(autoincrement())
  companyName String
  category    Category
  location    String
  description String
  priceFrom   Int
  priceTo     Int
  thumbnail   String
  bookings    Booking[]
}

model Booking {
  id          Int       @id @default(autoincrement())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
  supplier    Supplier  @relation(fields: [supplierId], references: [id])
  supplierId  Int
  eventDate   DateTime
  status      BookingStatus @default(PENDING)
  createdAt   DateTime @default(now())
}

enum Role           { ADMIN CUSTOMER }
enum BookingStatus  { PENDING CONFIRMED CANCELLED }
enum Category       { VENUE PHOTOGRAPHER DRESS MAKEUP CATERING TRAVEL }
```

> **Seed** with 10 suppliers across 5 categories and 2 demo users (admin + customer).

---

## 4. Fastify API (`apps/api`)

### 4.1 Key Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST   | /auth/login          | email + password → JWT |
| POST   | /auth/register       | demo only |
| GET    | /suppliers           | list / ?category= |
| GET    | /suppliers/:id       | supplier details |
| POST   | /bookings            | create booking (customer) |
| GET    | /bookings/me         | my bookings |
| GET    | /admin/bookings      | all bookings (admin) |
| PATCH  | /admin/bookings/:id  | update status |

Enable **CORS** only for `http://localhost:5173`.

---

## 5. React Front‑End (`apps/web`)

### 5.1 Design System
* **Brand colours:** Primary `#E91E63` (pink), Secondary `#7C4DFF` (violet), BG `#FDFDFD`
* **Typography:** `Inter` via Google Fonts.
* **Components:** shadcn/ui (`Button`, `Card`, `Dialog`, `Dropdown`, `Tabs`).

### 5.2 User Flows / Screens

| Route | Screen | Notes |
|-------|--------|-------|
| `/` | **Landing** | Hero, tagline “Your joy, one click away”, CTA buttons |
| `/explore` | **Service Catalog** | Category filters, supplier cards (`Book`) |
| `/supplier/:id` | **Supplier Detail** | Gallery, description, date‑picker |
| `/checkout` | **Booking Summary** | List chosen services, confirm button |
| `/auth/*` | **Auth** | Login / Register forms |
| `/dashboard` | **Admin Dashboard** | Side nav, Kanban board (drag‑drop) |

All screens **resize gracefully** — target tablet portrait ≥ 768 px.

### 5.3 State Management
* **Zustand** store: user, token, cart.
* Persist token in `localStorage`.

### 5.4 Networking
`api.ts` wrapper around `fetch` with `Authorization: Bearer`.

---

## 6. Dev Setup Commands (Windows CMD one‑liners)

```cmd
:: Scaffold front‑end
npm create vite@latest farhatna-demo\web -- --template react && cd farhatna-demo\web && npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p && npm i react-router-dom zustand classnames @radix-ui/react-dialog lucide-react && cd ..

:: Scaffold back‑end
mkdir api && cd api && npm init -y && npm i fastify fastify-cors fastify-jwt prisma @prisma/client sqlite3 && npx prisma init && cd ..

:: Install dev tooling
npm i -D prettier eslint husky lint-staged
```

---

## 7. Docker (optional)

Create a single container that serves API (port 5000) and static React build (port 8080).

```dockerfile
# docker/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

### Build API
FROM base AS api
COPY apps/api ./api
WORKDIR /app/api
RUN npm ci && npm run prisma:generate

### Build Web
FROM base AS web
COPY apps/web ./web
WORKDIR /app/web
RUN npm ci && npm run build

### Final
FROM node:20-alpine
WORKDIR /app
COPY --from=api /app/api ./api
COPY --from=web /app/web/dist ./public
EXPOSE 5000 8080
CMD ["node", "api/server.js"]
```

One‑line build + run:

```cmd
docker build -t farhatna-demo -f docker/Dockerfile . && docker run --rm -p 5000:5000 -p 8080:8080 farhatna-demo
```

---

## 8. UX / UI Heuristics
1. **Visual hierarchy** – big hero, clear CTA, consistent cards.  
2. **Motion** – subtle framer‑motion fade‑ins.  
3. **Feedback** – toast “Booking confirmed”.  
4. **Accessibility** – semantic HTML, aria labels, 4.5:1 contrast.  
5. **Offline hint** – skeleton loaders during API calls.  

---

## 9. Deliverables
* `apps/web` – React source + compiled `/dist`.  
* `apps/api` – Fastify source.  
* `schema.prisma` + `seed.ts`.  
* **README** with 2‑min local setup & prod build.  
* (Optional) Docker image on Docker Hub.

---

## 10. Stretch Goals (skip if time < 21 days)
* In‑app chat (Socket.io).  
* Calendar view for admin.  
* Payment stub (Stripe test).  
* Arabic RTL toggle.

---

### 🔚 End of prompt
