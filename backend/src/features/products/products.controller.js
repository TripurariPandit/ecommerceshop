import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    addProduct = async (req, res)=>{
        try {
            const { name, old_price, new_price, category, date, avilable, sizes } = req.body;
            const imageUrl = req.file.filename;
            const product = await this.productRepository.addProduct(name, old_price, new_price, category, date, avilable, imageUrl, sizes);
            return res.status(201).send(product);
        } catch(err){
            console.log(err);
        }
    }
 
    deleteProduct = async (req, res)=>{
        try{
            const result = await this.productRepository.deleteProduct(req.params.id);
            if(result) return res.status(200).send("product deleted successfully");
            return res.status(404).send("product not found");
        } catch(err){
            console.log(err);
        }
    }

    getAllProducts = async (req, res)=>{
        try{
            const products = await this.productRepository.getAllProducts();
            return res.status(200).send(products);
        } catch(err){
            console.log(err);
        }
    }

    getProductById = async (req, res)=>{
        try{
            const {id} = req.params;
            const product = await this.productRepository.getProductById(id);
            return res.status(200).send(product);
        } catch(err){
            console.log(err);
        }
    }

    getNewCollections = async (req, res)=>{
        try{
            const newCollections = await this.productRepository.getNewCollections();
            return res.status(200).send(newCollections);
        } catch(err){
            console.log(err);
        }
    }

    getPopularInWomen = async (req, res)=>{
        try{
            const poularInWomen = await this.productRepository.getPopularInWomen();
            return res.status(200).send(poularInWomen);
        } catch(err){
            console.log(err);
        }
    }

    getRelatedProducts = async (req, res)=>{
        try{
            const {productId} = req.params;
            const relatedProducts = await this.productRepository.getRelatedProducts(productId);
            return res.status(200).send(relatedProducts);
        } catch(err){
            console.log(err);
        }
    }

    getProductByCategory = async (req, res)=>{
        try{
            const {category} = req.query;
            const products = await this.productRepository.getProductByCategory(category);
            return res.status(200).send(products);
        } catch(err){
            console.log(err);
        }
    }

    uploadFile = (req, res) => {
        return res.json({
            success: 1,
            image_url: `http://localhost:3000/images/${req.file.filename}`
        });
    } 
}