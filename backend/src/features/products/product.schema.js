import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avilable: {
        type: Boolean,
        default: true
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