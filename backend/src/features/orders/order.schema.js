import mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        sizes: [{
            size: {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL'],
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }],
    amount: {
        type: Number,
        required: true
    },
    address: { 
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Order shipped"
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    payment: {
        type: Boolean,
        default: false
    }
});

//last modified