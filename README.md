# 🖥️ Build My PC - Full-Stack PC Builder Application

A modern, production-ready PC customization and e-commerce platform with automatic compatibility checking, intelligent build evaluation, and a premium dark-themed UI.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎯 Core Features
- **Smart PC Builder**: Select components across 9 categories (CPU, Motherboard, GPU, RAM, Storage, PSU, Cabinet, Cooler, Accessories)
- **Auto Compatibility Checking**: Real-time validation of component compatibility
- **"Is It Worth It?" AI Evaluation**: Intelligent analysis of build balance and value
- **Shopping Cart**: Full e-commerce cart functionality with quantity management
- **User Authentication**: JWT-based secure login and registration
- **Saved Builds**: Save and retrieve custom PC configurations
- **Admin Panel**: Complete product management system

### 🎨 Design Features
- **Dark Theme**: Premium #0f172a background with neon accents
- **Glassmorphism**: Modern frosted glass card effects
- **Neon Gradients**: Blue + Purple gradient highlights
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Fully Responsive**: Mobile-first design with breakpoints
- **Custom Scrollbar**: Styled with gradient effects

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API server
- **MongoDB** + **Mongoose** - Database and ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - Image upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Context API** - State management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables:
Create a \`.env\` file in the backend directory:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/buildmypc
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
\`\`\`

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on **http://localhost:5000**

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on **http://localhost:5173**

## 📁 Project Structure

\`\`\`
Build my Pc/
├── backend/
│   ├── models/          # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Build.js
│   │   └── Cart.js
│   ├── routes/          # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── builds.js
│   │   └── cart.js
│   ├── middleware/      # Auth & upload middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── utils/           # Helper functions
│   │   ├── compatibility.js
│   │   └── evaluation.js
│   ├── uploads/         # Product images
│   ├── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── BuildSummary.jsx
    │   │   ├── CompatibilityStatus.jsx
    │   │   └── GlassCard.jsx
    │   ├── pages/       # Route pages
    │   │   ├── Home.jsx
    │   │   ├── BuildPC.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Auth.jsx
    │   │   └── Admin.jsx
    │   ├── context/     # React context
    │   │   └── AuthContext.jsx
    │   ├── services/    # API calls
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
\`\`\`

## 🔌 API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user

### Products
- \`GET /api/products\` - Get all products (with filters)
- \`GET /api/products/:id\` - Get single product
- \`POST /api/products\` - Create product (Admin)
- \`PUT /api/products/:id\` - Update product (Admin)
- \`DELETE /api/products/:id\` - Delete product (Admin)

### Builds
- \`POST /api/builds\` - Save build
- \`GET /api/builds/user/:userId\` - Get user's builds
- \`GET /api/builds/:id\` - Get specific build
- \`DELETE /api/builds/:id\` - Delete build
- \`POST /api/builds/check-compatibility\` - Check compatibility

### Cart
- \`GET /api/cart/:userId\` - Get user's cart
- \`POST /api/cart\` - Add item to cart
- \`PUT /api/cart/:userId/item/:productId\` - Update quantity
- \`DELETE /api/cart/:userId/item/:productId\` - Remove item
- \`DELETE /api/cart/:userId\` - Clear cart

## 🧠 Compatibility Logic

The system automatically checks:
- ✅ CPU socket matches Motherboard socket
- ✅ RAM type matches Motherboard support
- ✅ PSU wattage is sufficient for components
- ✅ GPU length fits in Cabinet
- ✅ Motherboard form factor fits in Cabinet

## 💰 "Is It Worth It?" Evaluation

The AI evaluation considers:
- CPU-GPU price balance
- Price-to-performance ratio
- RAM capacity adequacy
- Storage type (SSD/NVMe bonus)
- Overall build category (Excellent/Good/Fair/Poor)

## 🎨 Design System

### Colors
- **Background**: #0f172a (dark-bg)
- **Cards**: #1e293b (dark-card)
- **Primary Blue**: #0ea5e9
- **Primary Purple**: #a855f7
- **Gradients**: Blue to Purple (135deg)

### Components
- **Glass Cards**: Frosted glass effect with backdrop blur
- **Neon Borders**: Gradient borders with glow
- **Buttons**: Gradient backgrounds with hover effects
- **Animations**: Fade-in, slide-up, pulse, glow

## 👤 Default Admin Account

To access the admin panel, you'll need to manually set a user's \`isAdmin\` field to \`true\` in MongoDB.

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: \`npm run build\`
4. Set output directory: \`dist\`
5. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update \`MONGODB_URI\` in backend .env

## 📝 Usage

1. **Register/Login**: Create an account or login
2. **Browse Components**: Navigate to Build PC page
3. **Select Parts**: Choose components from each category
4. **Check Compatibility**: View real-time compatibility status
5. **Get Evaluation**: See "Is It Worth It?" analysis
6. **Add to Cart**: Add complete build to shopping cart
7. **Save Build**: Save configuration for later
8. **Checkout**: Complete purchase (demo mode)

## 🎓 Perfect for BSc IT Projects

This project demonstrates:
- ✅ Full-stack development
- ✅ RESTful API design
- ✅ Database modeling
- ✅ Authentication & authorization
- ✅ Modern UI/UX design
- ✅ Responsive web design
- ✅ State management
- ✅ File upload handling
- ✅ Complex business logic

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ for PC enthusiasts**
