import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { invalidLogin, token, validLogin, withoutUsernameLogin } from '../../mocks/login.mock';
import { ServiceResponse } from '../../../src/types/Login';
import { Token } from '../../../src/types/Token';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('retorna um erro quando um nome de usuário não é fornecido', async function () {
    req.body = withoutUsernameLogin;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'BAD_REQUEST',
      data: { message: '"username" and "password" are required' },
    }
    sinon.stub(loginService, 'LoginVerify').resolves(serviceResponse);
    
    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });
  it('retorna um erro quando a senha não é fornecida', async function () {
    req.body = invalidLogin;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: { message: 'Username and password invalid' },
    }
    sinon.stub(loginService, 'LoginVerify').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Username and password invalid' });
  });
  it('retorna um token de login quando as credenciais são válidas', async function () {
    req.body = validLogin;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'SUCCESSFUL',
      data: token,
    }
    sinon.stub(loginService, 'LoginVerify').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(token);
  });
});
