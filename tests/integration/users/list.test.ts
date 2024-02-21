import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { userProductIdsMock, userDataValues } from '../../mocks/users.mock';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('GET /users', function () { 
  beforeEach(function () { sinon.restore(); });
  it('recupera uma lista usuários com seus productIds cadastrados', async function () {
    sinon.stub(UserModel, 'findAll').resolves([userDataValues] as any);
   const httpResponse = await chai.request(app).get('/users');

   expect(httpResponse.status).to.equal(200);
   expect(httpResponse.body).to.deep.equal(userProductIdsMock);
  });
});
