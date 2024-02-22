import { Router } from 'express';
import productController from '../controllers/product.controller';
import validFields from '../middlewares/validateFileds';
import validUserId from '../middlewares/validateUserId';

const route = Router();

route.get('/', productController.listProducts);
route.post(
  '/', 
  validUserId,
  validFields, 
  productController.createProduct,
);

export default route;