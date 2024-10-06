import express from 'express';
import ProductController from './products.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const router = express.Router();

const productController = new ProductController();

router.post('/upload', upload.single('imageUrl'), productController.uploadFile);

router.post('/', upload.single('imageUrl'), productController.addProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/', productController.getAllProducts);

router.get("/newcollections", productController.getNewCollections);

router.get('/popularinwomen', productController.getPopularInWomen);

router.get('/relatedproduct/:productId', productController.getRelatedProducts);

router.get('/category', productController.getProductByCategory);

router.get("/:id", productController.getProductById);

export default router;  