import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { userProductIdsMock } from '../../mocks/users.mock';

chai.use(chaiHttp);

describe('GET /users', function () { 
  beforeEach(function () { sinon.restore(); });
  it('recupera uma lista de todos os usuários com seus productIds cadastrados', async function () {
   const httpResponse = await chai.request(app).get('/users');

   expect(httpResponse.status).to.equal(200);
   expect(httpResponse.body).to.deep.equal(userProductIdsMock);
  });
});
