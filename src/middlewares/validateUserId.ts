import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import ProductModel from '../database/models/product.model';

const validUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(mapStatusHTTP.BAD_REQUEST).json({ message: '"userId" is required' });
  }

  const user = await ProductModel.findByPk(userId);

  if (!user) {
    return res.status(mapStatusHTTP.INVALID_VALUE).json({ message: '"userId" not found' });
  }
  if (typeof userId !== 'number') {
    return res.status(mapStatusHTTP.INVALID_VALUE).json({ message: '"userId" must be a number' });
  }

  next();
};

export default validUserId;