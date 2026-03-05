import { Build, Product, User } from '../models/index.js';
import { checkCompatibility } from '../utils/compatibility.js';
import { evaluateBuild } from '../utils/evaluation.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Save new build
// @route   POST /api/builds
// @access  Private
export const saveBuild = asyncHandler(async (req, res, next) => {
    const { buildName, components } = req.body;

    // Fetch all component details to calculate price and check compatibility
    const componentDetails = {};
    let totalPrice = 0;

    // Component mapping from request to model fields
    const buildData = {
        userId: req.user.id,
        buildName: buildName || 'My Custom Build',
        accessoryIds: components.accessories || []
    };

    for (const [key, productId] of Object.entries(components)) {
        if (productId) {
            if (key === 'accessories' && Array.isArray(productId)) {
                const items = await Product.findAll({ where: { id: productId } });
                componentDetails[key] = items;
                items.forEach(item => totalPrice += Number(item.price));
            } else {
                const product = await Product.findByPk(productId);
                if (product) {
                    componentDetails[key] = product;
                    totalPrice += Number(product.price);
                    // Map to model field (e.g., cpu -> cpuId)
                    buildData[`${key}Id`] = productId;
                }
            }
        }
    }

    // Check compatibility
    const compatibilityResult = checkCompatibility(componentDetails);

    // Evaluate build worth
    const worthEvaluation = evaluateBuild(componentDetails, totalPrice);

    // Create build
    const build = await Build.create({
        ...buildData,
        totalPrice,
        compatibilityStatus: compatibilityResult,
        worthEvaluation
    });

    res.status(201).json({
        success: true,
        message: 'Build saved successfully',
        data: build
    });
});

// @desc    Get user's builds
// @route   GET /api/builds/user/:userId
// @access  Private
export const getUserBuilds = asyncHandler(async (req, res, next) => {
    const builds = await Build.findAll({
        where: { userId: req.params.userId },
        include: [
            { model: Product, as: 'cpu' },
            { model: Product, as: 'motherboard' },
            { model: Product, as: 'gpu' },
            { model: Product, as: 'ram' },
            { model: Product, as: 'storage' },
            { model: Product, as: 'psu' },
            { model: Product, as: 'cabinet' },
            { model: Product, as: 'cooler' }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.json({
        success: true,
        count: builds.length,
        data: builds
    });
});

// @desc    Get specific build
// @route   GET /api/builds/:id
// @access  Private
export const getBuild = asyncHandler(async (req, res, next) => {
    const build = await Build.findByPk(req.params.id, {
        include: [
            { model: Product, as: 'cpu' },
            { model: Product, as: 'motherboard' },
            { model: Product, as: 'gpu' },
            { model: Product, as: 'ram' },
            { model: Product, as: 'storage' },
            { model: Product, as: 'psu' },
            { model: Product, as: 'cabinet' },
            { model: Product, as: 'cooler' }
        ]
    });

    if (!build) {
        return next(new ErrorResponse(`Build not found with id of ${req.params.id}`, 404));
    }

    res.json({
        success: true,
        data: build
    });
});

// @desc    Delete build
// @route   DELETE /api/builds/:id
// @access  Private
export const deleteBuild = asyncHandler(async (req, res, next) => {
    const build = await Build.destroy({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    });

    if (!build) {
        return next(new ErrorResponse(`Build not found with id of ${req.params.id}`, 404));
    }

    res.json({
        success: true,
        message: 'Build deleted successfully'
    });
});

// @desc    Check compatibility (without saving)
// @route   POST /api/builds/check-compatibility
// @access  Public
export const checkBuildCompatibility = asyncHandler(async (req, res, next) => {
    const { components } = req.body;

    // Fetch component details
    const componentDetails = {};
    let totalPrice = 0;

    for (const [key, productId] of Object.entries(components)) {
        if (productId) {
            const product = await Product.findByPk(productId);
            if (product) {
                componentDetails[key] = product;
                totalPrice += Number(product.price);
            }
        }
    }

    const compatibilityResult = checkCompatibility(componentDetails);
    const worthEvaluation = evaluateBuild(componentDetails, totalPrice);

    res.json({
        success: true,
        data: {
            compatibility: compatibilityResult,
            evaluation: worthEvaluation,
            totalPrice
        }
    });
});
