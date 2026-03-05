# 🔧 Node.js Installation Verification & Fix

## Current Issue
Node.js commands are not recognized in the terminal. This means either:
1. Node.js wasn't installed correctly
2. The PATH environment variable wasn't updated
3. You need to restart your computer (not just the terminal)

---

## ✅ Step 1: Verify Installation

Check if Node.js files exist:
1. Open File Explorer
2. Navigate to: `C:\Program Files\nodejs\`
3. Look for these files:
   - `node.exe`
   - `npm.cmd`
   - `npx.cmd`

**If these files DON'T exist:** Node.js is not installed. Go to Step 2.
**If these files DO exist:** Node.js is installed but PATH is wrong. Go to Step 3.

---

## 📥 Step 2: Install Node.js Properly

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Click the **LTS** button (Long Term Support)
   - Download the Windows Installer (.msi)

2. **Run Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next"
   - **IMPORTANT:** Check "Automatically install necessary tools"
   - **IMPORTANT:** Check "Add to PATH"
   - Click "Install"
   - Wait for installation to complete

3. **Restart Computer**
   - **MUST restart computer, not just terminal**
   - This is required for PATH changes

4. **Test After Restart**
   - Open PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - You should see version numbers

---

## 🔧 Step 3: Fix PATH (If Node.js is Installed)

If Node.js files exist but commands don't work:

### Option A: Automatic Fix (Recommended)
1. **Uninstall Node.js**
   - Settings → Apps → Node.js → Uninstall
2. **Reinstall Node.js**
   - Download from https://nodejs.org/
   - Make sure "Add to PATH" is checked
3. **Restart computer**

### Option B: Manual PATH Fix
1. **Open Environment Variables**
   - Press `Win + R`
   - Type: `sysdm.cpl`
   - Click "Environment Variables"

2. **Edit System PATH**
   - Under "System variables", find "Path"
   - Click "Edit"
   - Click "New"
   - Add: `C:\Program Files\nodejs\`
   - Click OK on all windows

3. **Restart Computer**
   - Must restart for PATH to take effect

4. **Test**
   - Open new PowerShell
   - Run: `node --version`

---

## 🧪 Testing Node.js

After installation and restart, run these commands:

```powershell
# Check Node.js version
node --version
# Should show: v20.x.x or v22.x.x

# Check npm version
npm --version
# Should show: 10.x.x

# Check installation path
where.exe node
# Should show: C:\Program Files\nodejs\node.exe
```

---

## ✅ Once Node.js Works

When `node --version` shows a version number, run:

### Backend Setup
```bash
cd "c:\Build my Pc\backend"
npm install
npm run seed
npm run dev
```

### Frontend Setup (New Terminal)
```bash
cd "c:\Build my Pc\frontend"
npm install
npm run dev
```

---

## 🆘 Still Not Working?

### Try Command Prompt Instead of PowerShell
1. Open Command Prompt (cmd.exe)
2. Run: `node --version`
3. If it works in cmd but not PowerShell, use cmd

### Check Windows Version
- Node.js requires Windows 10 or later
- Check: Settings → System → About

### Antivirus Blocking
- Some antivirus software blocks Node.js
- Temporarily disable and try again

---

## 📞 Next Steps

1. **Verify Node.js is installed** (check C:\Program Files\nodejs\)
2. **If not installed:** Download and install from nodejs.org
3. **Restart your computer** (required!)
4. **Test:** Open new PowerShell and run `node --version`
5. **If working:** Let me know and I'll run the app commands
6. **If still not working:** Try the manual PATH fix above

---

**The application is ready to run - we just need Node.js working first!**
