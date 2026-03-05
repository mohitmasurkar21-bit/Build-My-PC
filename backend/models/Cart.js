import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    // Items as JSON array: [{ productId, quantity }]
    items: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
}, {
    timestamps: true
});

export default Cart;
