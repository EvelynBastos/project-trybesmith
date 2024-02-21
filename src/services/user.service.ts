import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { UserSimplified } from '../types/User';

const getUser = async (): Promise<UserSimplified[]> => {
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel, 
      as: 'productIds', 
      attributes: ['id'],
    }],
  });
  const usersAll = users.map((user) => ({
    username: user.dataValues.username,
    productIds: user.dataValues.productIds?.map((product) => product.id),
  }));
  return usersAll;
};

export default {
  getUser,
};