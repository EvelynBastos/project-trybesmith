import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userService from '../../../src/services/user.service';
import userController from '../../../src/controllers/user.controller';
import { userProductIdsMock } from '../../mocks/users.mock';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('recupera lista de usuários com seus productIds cadastrados', async function () {
    sinon.stub(userService, 'getUser').resolves(userProductIdsMock);

    await userController.getUserController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(userProductIdsMock);
  });
});
