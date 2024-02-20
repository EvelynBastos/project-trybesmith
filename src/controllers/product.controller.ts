import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const createProduct = async (req: Request, res: Response) => {
  const { name, price, userId } = req.body;
  const newProduct = await productService.createProduct({ name, price, userId });

  return res.status(mapStatusHTTP.CREATED).json(newProduct);
};

const listProducts = async (req: Request, res: Response) => {
  const getProductList = await productService.listProducts();

  return res.status(mapStatusHTTP.SUCCESSFUL).json(getProductList);
};

export default {
  createProduct,
  listProducts,
};
