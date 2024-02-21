import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { productCreatedSucessMock, productMock } from '../../mocks/product.mock';
import productController from '../../../src/controllers/product.controller';
import productService from '../../../src/services/product.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('retorna o produto criado com status 201', async function () {
    req.body = productMock;
    
    sinon.stub(productService, 'createProduct').resolves(productCreatedSucessMock);

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreatedSucessMock);
  });
});
