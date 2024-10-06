import mongoose from 'mongoose';

export const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    sizes: [
        {
            size: { 
                type: String, 
                enum: ['XS', 'S', 'M', 'L', 'XL'], 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            }
        }  
    ],
});