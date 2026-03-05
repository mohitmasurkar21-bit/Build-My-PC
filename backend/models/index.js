import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';
import Build from './Build.js';
import Cart from './Cart.js';
import Order from './Order.js';

// Define Associations

// User - Build (One-to-Many)
User.hasMany(Build, { foreignKey: 'userId', as: 'builds' });
Build.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Cart (One-to-One)
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User - Order (One-to-Many)
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Build - Products (Many-to-One associations for specific components)
Build.belongsTo(Product, { as: 'cpu', foreignKey: 'cpuId' });
Build.belongsTo(Product, { as: 'motherboard', foreignKey: 'motherboardId' });
Build.belongsTo(Product, { as: 'gpu', foreignKey: 'gpuId' });
Build.belongsTo(Product, { as: 'ram', foreignKey: 'ramId' });
Build.belongsTo(Product, { as: 'storage', foreignKey: 'storageId' });
Build.belongsTo(Product, { as: 'psu', foreignKey: 'psuId' });
Build.belongsTo(Product, { as: 'cabinet', foreignKey: 'cabinetId' });
Build.belongsTo(Product, { as: 'cooler', foreignKey: 'coolerId' });

const models = {
    User,
    Product,
    Build,
    Cart,
    Order
};

export { sequelize, User, Product, Build, Cart, Order };
export default models;
