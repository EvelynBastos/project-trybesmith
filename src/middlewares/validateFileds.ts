import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const validValues = (fieldName: string, value: unknown, lengthMin = 3) => {
  if (!value) {
    return { message: `"${fieldName}" is required`, statusCode: 'BAD_REQUEST' as const };
  }
  if (typeof value !== 'string') {
    return { message: `"${fieldName}" must be a string`, statusCode: 'INVALID_VALUE' as const };
  }
  if (value.length < lengthMin) {
    return {
      message: `"${fieldName}" length must be at least ${lengthMin} characters long`,
      statusCode: 'INVALID_VALUE' as const,
    };
  }
  return null;
};

const validFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;

  const errorName = validValues('name', name);
  if (errorName) {
    const { statusCode } = errorName;
    return res.status(mapStatusHTTP[statusCode]).json({ message: errorName.message });
  }

  const errorPrice = validValues('price', price);
  if (errorPrice) {
    const { statusCode } = errorPrice;
    return res.status(mapStatusHTTP[statusCode]).json({ message: errorPrice.message });
  }

  next();
};

export default validFields;
