import { Product, User, Build, Order } from '../models/index.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getStats = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalBuilds = await Build.count();
    const totalOrders = await Order.count();

    // Calculate total revenue from orders (Paid status)
    const paidOrders = await Order.findAll({ where: { paymentStatus: 'Paid' } });
    const totalRevenue = paidOrders.reduce((acc, order) => acc + Number(order.totalPrice), 0);

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalProducts,
            totalBuilds,
            totalOrders,
            totalRevenue
        }
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// @desc    Get all builds
// @route   GET /api/admin/builds
// @access  Private/Admin
export const getAllBuilds = asyncHandler(async (req, res, next) => {
    const builds = await Build.findAll({
        include: [{ model: User, as: 'user', attributes: ['username', 'email'] }]
    });
    res.status(200).json({
        success: true,
        count: builds.length,
        data: builds
    });
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.findAll({
        include: [{ model: User, as: 'user', attributes: ['username', 'email'] }],
        order: [['createdAt', 'DESC']]
    });

    // Note: If you want to populate products within orders.items (JSON), 
    // you'd need manual population like in cartController.

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
        return next(new ErrorResponse('Order not found', 404));
    }

    order.status = req.body.status || order.status;
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

    await order.save();

    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc    Create new product (Admin)
// @route   POST /api/admin/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        data: product
    });
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
    const [updated] = await Product.update(req.body, {
        where: { id: req.params.id }
    });

    if (!updated) {
        return next(new ErrorResponse('Product not found', 404));
    }

    const product = await Product.findByPk(req.params.id);

    res.status(200).json({
        success: true,
        data: product
    });
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const deleted = await Product.destroy({
        where: { id: req.params.id }
    });

    if (!deleted) {
        return next(new ErrorResponse('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});
