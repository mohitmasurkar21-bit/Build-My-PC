import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: DataTypes.DECIMAL(10, 2),
    gst: DataTypes.DECIMAL(10, 2),
    deliveryCharges: DataTypes.DECIMAL(10, 2),
    status: {
        type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
        defaultValue: 'Pending'
    },
    paymentMethod: {
        type: DataTypes.ENUM('Card', 'UPI', 'NetBanking', 'COD'),
        defaultValue: 'Card'
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Failed', 'Refunded'),
        defaultValue: 'Pending'
    },
    razorpayOrderId: DataTypes.STRING,
    razorpayPaymentId: DataTypes.STRING,
    razorpaySignature: DataTypes.TEXT,
    transactionId: DataTypes.STRING,
    shippingAddress: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true
});

export default Order;
