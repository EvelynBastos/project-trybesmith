import { expect } from 'chai';
import sinon from 'sinon';
import loginService from '../../../src/services/login.service';
import { invalidLogin, validLogin, validToUser, withoutPasswordLogin, withoutUsernameLogin } from '../../mocks/login.mock';
import { Login } from '../../../src/types/Login';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('retorna um erro se o usuário não for encontrado', async function () {
    const { status, data } = await loginService.LoginVerify(withoutUsernameLogin as Login);

    expect(status).to.equal('BAD_REQUEST');
    expect(data).not.to.have.key('token');
    expect(data).to.deep.equal({ message: '"username" and "password" are required' });
  });
  it('retorna um erro se a senha estiver incorreta', async function () {
    const { status, data } = await loginService.LoginVerify(withoutPasswordLogin as Login);

    expect(status).to.equal('BAD_REQUEST');
    expect(data).not.to.have.key('token');
    expect(data).to.deep.equal({ message: '"username" and "password" are required' });
  });
  it('retorna erro quando a senha estiver inválida', async function () {
    const findReturn = UserModel.build(validToUser);
    sinon.stub(UserModel, 'findOne').resolves(findReturn);
    
    const { status, data } = await loginService.LoginVerify(invalidLogin as Login);

    expect(status).to.equal('UNAUTHORIZED');
    expect(data).not.to.have.key('token ');
    expect(data).to.deep.equal({ message: 'Username or password invalid' });
  });
  it('retorna um token quando o login for válido', async function () {
    const findReturn = UserModel.build(validToUser);
    sinon.stub(UserModel, 'findOne').resolves(findReturn);

    const { status, data } = await loginService.LoginVerify(validLogin as Login);

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.have.key('token');
  });
});
