import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../../../src/services/user.service';
import { userProductIdsMock } from '../../mocks/users.mock';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('recupera uma lista de usuários com seus productIds cadastrados', async function () {
    sinon.stub(userService, 'getUser').resolves(userProductIdsMock as any);
    
    const serviceResponse = await userService.getUser();

    expect(serviceResponse).to.deep.equal(userProductIdsMock);
  });
});
