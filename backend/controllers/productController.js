import Product from '../models/Product.js';
import { Op } from 'sequelize';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res, next) => {
    const { category, minPrice, maxPrice, brand, section } = req.query;

    let filter = {};

    if (section && section !== 'General') {
        filter[Op.or] = [
            { section: section },
            { section: 'General' }
        ];

        // Additional fallback for Gaming to include high-price items
        if (section === 'Gaming') {
            filter[Op.or].push({ price: { [Op.gte]: 20000 } });
        }
    }

    if (category) {
        filter.category = category;
    }

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price[Op.gte] = Number(minPrice);
        if (maxPrice) filter.price[Op.lte] = Number(maxPrice);
    }

    if (brand) {
        filter.brand = brand;
    }

    const products = await Product.findAll({
        where: filter,
        order: [['createdAt', 'DESC']]
    });

    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    res.json({
        success: true,
        data: product
    });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res, next) => {
    const productData = {
        ...req.body,
        specs: typeof req.body.specs === 'string' ? JSON.parse(req.body.specs) : req.body.specs
    };

    if (req.file) {
        productData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create(productData);

    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
    });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res, next) => {
    const updateData = {
        ...req.body,
        specs: typeof req.body.specs === 'string' ? JSON.parse(req.body.specs) : req.body.specs
    };

    if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
    }

    const [updated] = await Product.update(updateData, {
        where: { id: req.params.id }
    });

    if (!updated) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    const product = await Product.findByPk(req.params.id);

    res.json({
        success: true,
        message: 'Product updated successfully',
        data: product
    });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
    const deleted = await Product.destroy({
        where: { id: req.params.id }
    });

    if (!deleted) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});
