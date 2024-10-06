import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { productSchema } from "./product.schema.js";

const productModel = mongoose.model('Products', productSchema);

export default class ProductRepository {
    async addProduct(name, old_price, new_price, category, date, avilable, imageUrl, sizes) {
        try {
            const product = await productModel.findOne({ name: name });
            if (!product) {
                const newProduct = new productModel({ name, old_price, new_price, category, date, avilable, imageUrl, sizes });
                await newProduct.save();
                return newProduct;
            } else {
                
                for (const { size, quantity } of sizes) {
                    const updatedProduct = await productModel.updateOne({ 'sizes.size': size }, {
                        $inc: {
                            'sizes.$.quantity': quantity
                        }
                    }, 
                    // {
                    //     upsert: true if i am using this is not working
                    // }
                    );
                    if (updatedProduct.matchedCount === 0) {
                        await productModel.updateOne({ name: name }, {
                                $push: { sizes: { size: size, quantity: quantity } }
                            }
                        );
                    }
                }
                return product;  
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.findOneAndDelete({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (err) {
            console.log(err);
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (err) {
            console.log(err)
        }
    }

    async getNewCollections() {
        try {
            const newCollections = await productModel.find({}).find({}).sort({ date: -1 }).limit(8);;
            return newCollections;
        } catch (err) {
            console.log(err);
        }
    }

    async getPopularInWomen() {
        try {
            const poularInWomen = await productModel.find({ category: "women" }).limit(4);
            return poularInWomen;
        } catch (err) {
            console.log(err);
        }
    }

    async getRelatedProducts(productId) {
        try {
            const product = await productModel.findById(productId);
            if (!product) {
                return JSON.stringify({ message: "Product not found" });
            }
            const relatedProducts = await productModel.find({
                category: product.category,
                _id: { $ne: new ObjectId(productId) }
            }).limit(4);
            return relatedProducts;
        } catch (err) {
            console.log(err);
        }
    }

    async getProductByCategory(category) {
        try {
            const products = await productModel.find({ category: category });
            return products;
        } catch (err) {
            console.log(err);
        }
    }
} 