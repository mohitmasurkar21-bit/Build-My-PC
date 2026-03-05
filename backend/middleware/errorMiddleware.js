import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        const message = err.errors.map(e => e.message).join(', ');
        error = new ErrorResponse(message || 'Duplicate field value entered', 400);
    }

    // Sequelize validation error
    if (err.name === 'SequelizeValidationError') {
        const message = err.errors.map(e => e.message).join(', ');
        error = new ErrorResponse(message, 400);
    }

    // Sequelize database error (e.g., invalid UUID or syntax)
    if (err.name === 'SequelizeDatabaseError') {
        const message = 'Database error occurred';
        error = new ErrorResponse(message, 500);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

export default errorHandler;
