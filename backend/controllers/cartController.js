import { Cart, Product } from '../models/index.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';

// Helper: populate the JSON items array with product details
const populateCartItems = async (items) => {
    if (!items || items.length === 0) return [];

    const productIds = items.map(item => item.productId);
    const products = await Product.findAll({
        where: { id: productIds }
    });

    const productMap = {};
    products.forEach(p => {
        productMap[p.id] = p;
    });

    return items.map(item => ({
        ...item,
        product: productMap[item.productId] || null
    })).filter(item => item.product !== null);
};

// Helper: calculate total from a populated items array
const calcTotal = (items) =>
    (items || []).reduce(
        (total, item) => total + (Number(item?.product?.price) || 0) * (item?.quantity || 1),
        0
    );

// @desc    Get user's cart
// @route   GET /api/cart/:userId
// @access  Private
export const getCart = asyncHandler(async (req, res, next) => {
    let cart = await Cart.findOne({ where: { userId: req.params.userId } });

    if (!cart) {
        cart = await Cart.create({ userId: req.params.userId, items: [], totalPrice: 0 });
    }

    const populatedItems = await populateCartItems(cart.items);
    const totalPrice = calcTotal(populatedItems);

    // If items changed due to sanitation (products deleted) or total mismatch
    if (populatedItems.length !== cart.items.length || Number(cart.totalPrice) !== totalPrice) {
        cart.items = populatedItems.map(item => ({ productId: item.productId, quantity: item.quantity }));
        cart.totalPrice = totalPrice;
        await cart.save();
    }

    // Prepare response with populated items
    const responseData = cart.toJSON();
    responseData.items = populatedItems;

    res.json({
        success: true,
        data: responseData
    });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res, next) => {
    const { userId, productId: singleProductId, productIds, quantity = 1 } = req.body;

    if (!userId || (!singleProductId && !productIds)) {
        return next(new ErrorResponse('userId and (productId or productIds) are required', 400));
    }

    const idsToAdd = productIds || [singleProductId];

    // Filter out any null/undefined values
    const validIds = idsToAdd.filter(id => id);
    if (validIds.length === 0) {
        return next(new ErrorResponse('No valid productIds provided', 400));
    }

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        cart = await Cart.create({ userId, items: [], totalPrice: 0 });
    }

    // Ensure we have an array to work with
    const currentItems = Array.isArray(cart.items) ? cart.items : [];
    const newItems = [...currentItems];

    for (const id of validIds) {
        const product = await Product.findByPk(id);
        if (!product) {
            console.warn(`Product not found during cart add: ${id}`);
            continue;
        }

        const existingItemIndex = newItems.findIndex(
            item => String(item.productId) === String(id)
        );

        if (existingItemIndex > -1) {
            newItems[existingItemIndex].quantity += Number(quantity);
        } else {
            newItems.push({ productId: id, quantity: Number(quantity) });
        }
    }

    const populatedItems = await populateCartItems(newItems);
    const totalPrice = calcTotal(populatedItems);

    // Standardize items back to DB format (only productId and quantity)
    cart.items = populatedItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    cart.totalPrice = totalPrice;

    // CRITICAL: Explicitly mark JSON field as changed for Sequelize
    cart.changed('items', true);
    await cart.save();

    const responseData = cart.toJSON();
    responseData.items = populatedItems;

    res.json({
        success: true,
        message: validIds.length > 1 ? 'Build added to cart successfully' : 'Product added to cart successfully',
        data: responseData
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  Private
export const updateQuantity = asyncHandler(async (req, res, next) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
        return next(new ErrorResponse('userId, productId and quantity are required', 400));
    }

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        return next(new ErrorResponse('Cart not found', 404));
    }

    const newItems = [...(cart.items || [])];
    const itemIndex = newItems.findIndex(
        item => String(item.productId) === String(productId)
    );

    if (itemIndex === -1) {
        return next(new ErrorResponse('Item not found in cart', 404));
    }

    newItems[itemIndex].quantity = Number(quantity);

    if (newItems[itemIndex].quantity <= 0) {
        newItems.splice(itemIndex, 1);
    }

    const populatedItems = await populateCartItems(newItems);
    const totalPrice = calcTotal(populatedItems);

    cart.items = populatedItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    cart.totalPrice = totalPrice;
    cart.changed('items', true);
    await cart.save();

    const responseData = cart.toJSON();
    responseData.items = populatedItems;

    res.json({
        success: true,
        message: 'Quantity updated',
        data: responseData
    });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId/item/:productId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res, next) => {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        return next(new ErrorResponse('Cart not found', 404));
    }

    const currentItems = Array.isArray(cart.items) ? cart.items : [];
    const newItems = currentItems.filter(
        item => String(item.productId) !== String(productId)
    );

    const populatedItems = await populateCartItems(newItems);
    const totalPrice = calcTotal(populatedItems);

    cart.items = populatedItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    cart.totalPrice = totalPrice;
    cart.changed('items', true); // Explicitly mark JSON field as changed for Sequelize
    await cart.save();

    const responseData = cart.toJSON();
    responseData.items = populatedItems;

    res.json({
        success: true,
        message: 'Item removed from cart',
        data: responseData
    });
});

// @desc    Clear cart
// @route   DELETE /api/cart/:userId
// @access  Private
export const clearCart = asyncHandler(async (req, res, next) => {
    const [updated] = await Cart.update(
        { items: [], totalPrice: 0 },
        { where: { userId: req.params.userId } }
    );

    if (!updated) {
        return next(new ErrorResponse('Cart not found', 404));
    }

    res.json({
        success: true,
        message: 'Cart cleared successfully'
    });
});
