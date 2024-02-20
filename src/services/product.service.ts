import ProductModel, 
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';

const createProduct = async (product: ProductInputtableTypes): Promise<Product> => {
  const { name, price, userId } = product;
  const { dataValues } = await ProductModel.create({ name, price, userId });

  return dataValues;
};

const listProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product: ProductSequelizeModel) => product.dataValues);
};

export default {
  createProduct,
  listProducts,
};
