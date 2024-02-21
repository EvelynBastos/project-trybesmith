import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import { productCreatedSucessMock, productMock } from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(async function () { sinon.restore(); });

  it('verifica se o produto foi criado com sucesso', async function () {
    // Arrange
    const httpResquestBody = productMock;
    const productCreatedReturn = ProductModel.build(productCreatedSucessMock);
    sinon.stub(ProductModel, 'create').resolves(productCreatedReturn);

    // Act
    const httpResponse = await chai.request(app)
      .post('/products')
      .send(httpResquestBody);
    
    // Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productCreatedSucessMock);
  });
});