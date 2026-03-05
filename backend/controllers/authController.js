import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return next(new ErrorResponse('Please provide username, email and password', 400));
    }

    if (password.length < 6) {
        return next(new ErrorResponse('Password must be at least 6 characters', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [{ email }, { username }]
        }
    });

    if (existingUser) {
        return next(new ErrorResponse('User already exists with this email or username', 400));
    }

    // Create user (Password hashing is handled by User model hooks)
    const user = await User.create({
        username,
        email,
        password
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    // Find user by email OR username
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email }, { username: email }] // Treat the input as either email or username
        }
    });

    if (!user) {
        console.log(`Login attempt failed: User not found for ${email}`);
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check password (using model prototype method)
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        console.log(`Login attempt failed: Invalid password for ${email}`);
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
});
