import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import buildRoutes from './routes/builds.js';
import cartRoutes from './routes/cart.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/admin.js';

// Import middleware
import errorHandler from './middleware/errorMiddleware.js';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Security headers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging for development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/builds', buildRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Build My PC API is running' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error handling middleware
app.use(errorHandler);

// MySQL connection via Sequelize
import { sequelize } from './models/index.js';

// Sync models and start server
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connected to MySQL');
        const useMysql = process.env.USE_MYSQL === 'true' || process.env.NODE_ENV === 'production';
        return sequelize.sync(useMysql ? { alter: true } : {}); // alter:true only for MySQL; SQLite FK constraints break with alter
    })
    .then(() => {
        console.log('✅ Database synchronized');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📁 API endpoints available at http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error('❌ MySQL connection or sync error:', error);
        process.exit(1);
    });

export default app;
