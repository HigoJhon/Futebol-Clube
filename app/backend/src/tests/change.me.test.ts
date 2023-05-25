import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

// import { app } from '../app';
import { Response } from 'superagent';
import teamModel from '../database/models/Teams';
import TeamsService from '../service/TeamsService';
import TeamsController from '../controller/TeamsController';

import LoginModel from '../database/models/Users';
import LoginService from '../service/LoginService';
import LoginController from '../controller/LoginConntroller';

chai.use(chaiHttp);

const { expect } = chai;

const _teamsService = new TeamsService();
const _teamsController = new TeamsController();

const _loginService = new LoginService();
const _loginController = new LoginController();

describe('Desenvolvendo test para a rota de Teams', () => {
    afterEach(() => sinon.restore());
  it('buscando todos os times de service', async () => {
    sinon.stub(teamModel, 'findAll').resolves([]);

    _teamsService.getAll();
  });

  it('buscando times por Id', async () => {
    const id = 1;
    sinon.stub(teamModel, 'findOne').resolves();

    _teamsService.getById(id);
  });

  it('buscando todos os times de controller', async () => {
    const req: any = {};
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(teamModel, 'findAll').resolves([]);

    await _teamsController.getAll(req, res);
  }
  );
});

describe('Desenvolvendo test para a rota de Login', () => {
  afterEach(() => sinon.restore());
  it('testando o getAll de login', async () => {
    const req: any = {};
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(LoginModel, 'findOne').resolves();

    await _loginController.get(req, res);
  });

  it('testando o post de login', async () => {
    const req: any = {};
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(LoginModel, 'findOne').resolves();

    await _loginController.post(req, res);
  });

  it('testando o getAll de login na service', async () => {
    const req: any = {};
    const res: any = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    sinon.stub(LoginModel, 'findOne').resolves();

    _loginService.get(req);
  });
})