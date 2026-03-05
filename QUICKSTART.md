# 🚀 Quick Start Guide - Build My PC

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Node.js** installed (v16 or higher) - [Download](https://nodejs.org/)
- [ ] **MongoDB** installed locally OR MongoDB Atlas account - [Download](https://www.mongodb.com/try/download/community)
- [ ] **Git** (optional, for version control)

---

## 🎯 5-Minute Setup

### Step 1: Install Backend Dependencies

Open terminal in the `backend` folder:

```bash
cd backend
npm install
```

### Step 2: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows (if MongoDB is installed as a service, it should already be running)
# Check if running: services.msc → look for MongoDB

# Mac/Linux
mongod
```

**Option B: MongoDB Atlas**
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `backend/.env`

### Step 3: Seed Database

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Added sample products
🎉 Database seeded successfully!
```

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 5: Install Frontend Dependencies

Open a **NEW terminal** in the `frontend` folder:

```bash
cd frontend
npm install
```

### Step 6: Start Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

### Step 7: Open Application

Visit **http://localhost:5173** in your browser!

---

## 🎮 Try It Out

### 1. Create Account
- Click "Login" button
- Switch to "Register"
- Enter username, email, password
- Click "Create Account"

### 2. Build Your First PC
- Navigate to "Build PC"
- Select components from each category
- Watch the compatibility status update in real-time
- See the "Is It Worth It?" evaluation

### 3. Add to Cart
- Click "Add to Cart" when build is compatible
- Navigate to "Cart"
- Review your items
- Click "Checkout (Demo)"

---

## 🔧 Troubleshooting

### Backend won't start

**Error: "npm: command not found"**
- Install Node.js from [nodejs.org](https://nodejs.org/)

**Error: "MongoServerError: connect ECONNREFUSED"**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env` file

### Frontend won't start

**Error: "Cannot find module"**
- Run `npm install` in the frontend folder

**Error: "Port 5173 is already in use"**
- Close other Vite servers or change port in `vite.config.js`

### Can't see products

**Empty product list**
- Make sure you ran `npm run seed` in the backend folder
- Check backend terminal for errors

---

## 📱 What You Should See

### Home Page
- Hero section with gradient text
- "Start Building" button
- Feature cards with glassmorphism
- Dark theme with neon accents

### Build PC Page
- Category tabs (CPU, Motherboard, GPU, etc.)
- Product cards with images and specs
- Live build summary sidebar
- Compatibility status (green ✅ or red ❌)
- "Is It Worth It?" evaluation

### Cart Page
- Selected items with images
- Quantity controls
- Total price
- Checkout button

---

## 🎨 Design Features to Notice

✨ **Glassmorphism** - Frosted glass cards with backdrop blur  
✨ **Neon Gradients** - Blue to purple gradient accents  
✨ **Smooth Animations** - Fade-in and slide-up effects  
✨ **Responsive Design** - Works on mobile and desktop  
✨ **Dark Theme** - Premium dark background (#0f172a)  

---

## 📊 Sample Data Included

The database seeder adds:
- 2 CPUs (AMD & Intel)
- 2 Motherboards (compatible sockets)
- 2 GPUs (NVIDIA & AMD)
- 2 RAM kits (16GB & 32GB)
- 2 Storage drives (NVMe & HDD)
- 2 Power supplies (650W & 750W)
- 2 Cabinets (different sizes)
- 2 Coolers (Air & Liquid)

Total: **16 products** ready to use!

---

## 🔐 Admin Access

To access the admin panel:

1. Register a normal account
2. Open MongoDB (Compass or Shell)
3. Find your user in the `users` collection
4. Set `isAdmin: true`
5. Refresh the page
6. Navigate to `/admin`

---

## 🎯 Next Steps

Once everything is working:

1. ✅ Test all features (register, login, build PC, cart)
2. ✅ Try creating incompatible builds (different sockets)
3. ✅ Add products via admin panel
4. ✅ Upload product images
5. ✅ Test on mobile devices
6. ✅ Deploy to production (see README.md)

---

## 📚 Need Help?

- **Full Documentation**: See [README.md](file:///c:/Build%20my%20Pc/README.md)
- **Project Walkthrough**: See [walkthrough.md](file:///C:/Users/Mohit/.gemini/antigravity/brain/4c8a05fe-75ca-4fb9-818a-56791cc458bd/walkthrough.md)
- **API Reference**: Check backend routes in `backend/routes/`

---

**Happy Building! 🖥️✨**
