import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'PSU', 'Cabinet', 'Cooler', 'Accessories'),
        allowNull: false
    },
    section: {
        type: DataTypes.ENUM('General', 'Gaming', 'Coding', 'Video Editing'),
        defaultValue: 'General'
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '/uploads/default-product.jpg'
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specs: {
        type: DataTypes.JSON,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }
}, {
    timestamps: true
});

export default Product;
