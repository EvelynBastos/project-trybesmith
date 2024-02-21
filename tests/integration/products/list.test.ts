import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import { listProductsMock } from '../../mocks/product.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('verifica se a lista de produtos foi retornada com sucesso', async function () {
    const listProductsMockReturn = ProductModel.bulkBuild(listProductsMock);
    sinon.stub(ProductModel, 'findAll').resolves(listProductsMockReturn);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(listProductsMock);
  });
});
