import { Router } from 'express';
import productController from '../controllers/product.controller';

const route = Router();

route.post('/', productController.createProduct);

export default route;