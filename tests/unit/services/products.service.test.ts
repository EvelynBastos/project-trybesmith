import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import { listProductsMock, productCreatedSucessMock } from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('retorna um produto criado', async function () {
    const createProductReturn = ProductModel.build(productCreatedSucessMock);
    sinon.stub(ProductModel, 'create').resolves(createProductReturn);
    
    const serviceResponse = await productService.createProduct(productCreatedSucessMock);

    expect(serviceResponse).to.be.deep.equal(productCreatedSucessMock);
  });

  it('retorna lista de todos os produtos', async function () {
    const listProductsMockReturn = ProductModel.bulkBuild(listProductsMock);
    sinon.stub(ProductModel, 'findAll').resolves(listProductsMockReturn);

    const serviceResponse = await productService.listProducts();

    expect(serviceResponse).to.be.deep.equal(listProductsMock);
  });
});
