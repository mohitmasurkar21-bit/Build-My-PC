import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { sequelize, User, Product, Build, Cart, Order } from './models/index.js';
import { codingProducts } from './data/codingProducts.js';
import { videoEditingProducts } from './data/videoEditingProducts.js';
import { generalProducts } from './data/generalProducts.js';
import { commonProducts } from './data/commonProducts.js';
import { gamingProducts } from './data/gamingProducts.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Sync database (force: true will drop tables)
        console.log('⏳ Connecting and syncing database...');
        await sequelize.sync({ force: true });
        console.log('✅ Database synced (tables cleared)');

        // Create Admin User
        console.log('👤 Creating admin user...');
        const adminPassword = 'admin123';
        // Note: Password hashing is handled by User model hooks
        await User.create({
            username: 'admin',
            email: 'admin@buildmypc.com',
            password: adminPassword,
            isAdmin: true
        });
        console.log('✅ Admin user created (User: admin, Pass: admin123)');

        // Combine all products
        const allProductsRaw = [
            ...commonProducts,
            ...codingProducts,
            ...videoEditingProducts,
            ...generalProducts,
            ...gamingProducts
        ];

        // Deduplicate products by name
        const productMap = new Map();
        allProductsRaw.forEach(product => {
            if (!productMap.has(product.name)) {
                productMap.set(product.name, product);
            }
        });
        const allProducts = Array.from(productMap.values());

        console.log(`📦 Seeding ${allProducts.length} products (Deduplicated from ${allProductsRaw.length})...`);
        await Product.bulkCreate(allProducts);
        console.log('✅ Products seeded successfully');

        console.log('✨ Seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
