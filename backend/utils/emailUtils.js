import nodemailer from 'nodemailer';

export const sendOrderConfirmation = async (order) => {
    // Basic setup for testing, user should provide real credentials in .env
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'dummy_email@gmail.com',
            pass: process.env.EMAIL_PASS || 'dummy_password'
        }
    });

    const mailOptions = {
        from: '"Build My PC" <noreply@buildmypc.com>',
        to: order.shippingAddress.email,
        subject: `Order Confirmation - ${order._id}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h1 style="color: #3b82f6;">Build My PC</h1>
                <h2>Thank you for your order!</h2>
                <p>Hello ${order.shippingAddress.fullName},</p>
                <p>Your order has been successfully placed and is now being processed.</p>
                <hr />
                <h3>Order Summary</h3>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Total Amount:</strong> ₹${order.totalPrice.toLocaleString()}</p>
                <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
                <hr />
                <p>We will notify you once your order is shipped.</p>
            </div>
        `
    };

    try {
        // Only attempt to send if credentials are provided
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Order confirmation email sent');
        } else {
            console.log('Skipping email confirmation as credentials are not provided');
        }
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};
