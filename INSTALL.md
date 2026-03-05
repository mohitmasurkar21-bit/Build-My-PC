# ⚠️ Installation Required - Build My PC

## 🚨 Prerequisites Not Found

Your system needs **Node.js** and **MongoDB** to run this application.

---

## 📥 Step 1: Install Node.js

### Windows Installation

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS version** (Long Term Support)
   - Choose: "Windows Installer (.msi)" for 64-bit

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - ✅ Make sure "Add to PATH" is checked
   - Click "Install"
   - Restart your computer after installation

3. **Verify Installation**
   Open PowerShell or Command Prompt and run:
   ```bash
   node --version
   npm --version
   ```
   
   You should see version numbers like:
   ```
   v20.11.0
   10.2.4
   ```

---

## 📥 Step 2: Install MongoDB

### Option A: MongoDB Community Server (Local)

1. **Download MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: Latest (7.0+)
   - Package: MSI

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (GUI tool)
   - Click "Install"

3. **Verify MongoDB is Running**
   - Open Services (Win + R → type `services.msc`)
   - Look for "MongoDB Server"
   - Status should be "Running"

### Option B: MongoDB Atlas (Cloud - Easier!)

1. **Create Free Account**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a region close to you
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

4. **Update Backend .env**
   - Open `c:\Build my Pc\backend\.env`
   - Replace `MONGODB_URI` with your Atlas connection string
   - Replace `<password>` with your actual password

---

## 🚀 Step 3: Run the Application

Once Node.js and MongoDB are installed:

### Terminal 1: Backend

```bash
cd "c:\Build my Pc\backend"
npm install
npm run seed
npm run dev
```

### Terminal 2: Frontend (New Terminal)

```bash
cd "c:\Build my Pc\frontend"
npm install
npm run dev
```

### Open Browser

Visit: **http://localhost:5173**

---

## 🎯 Quick Commands Reference

After installation, use these commands:

```bash
# Check if Node.js is installed
node --version
npm --version

# Check if MongoDB is running (local installation)
# Windows: services.msc → look for "MongoDB Server"

# Install backend dependencies
cd backend
npm install

# Seed database with sample products
npm run seed

# Start backend server
npm run dev

# Install frontend dependencies (in new terminal)
cd frontend
npm install

# Start frontend server
npm run dev
```

---

## 📊 What Happens After Installation

1. **Backend** will run on `http://localhost:5000`
   - API endpoints available
   - MongoDB connected
   - 16 sample products loaded

2. **Frontend** will run on `http://localhost:5173`
   - React app with Vite
   - Dark theme UI
   - All pages accessible

---

## 🆘 Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your computer after installing Node.js
- Reinstall Node.js and ensure "Add to PATH" is checked

### "MongoDB connection error"
- **Local MongoDB**: Check if MongoDB service is running in services.msc
- **MongoDB Atlas**: Verify connection string in `.env` file
- Check firewall settings

### "Port already in use"
- Close other applications using ports 5000 or 5173
- Or change ports in configuration files

---

## 💡 Recommended: Use MongoDB Atlas

For beginners, **MongoDB Atlas** (cloud) is easier than local installation:
- ✅ No local installation needed
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Works from anywhere
- ✅ No service management

---

## 📞 Need Help?

After installing Node.js and MongoDB:
1. Open PowerShell in `c:\Build my Pc\backend`
2. Run `npm install`
3. Run `npm run seed`
4. Run `npm run dev`

Then in a new PowerShell window:
1. Navigate to `c:\Build my Pc\frontend`
2. Run `npm install`
3. Run `npm run dev`

---

**Once installed, the application will work perfectly! 🚀**
