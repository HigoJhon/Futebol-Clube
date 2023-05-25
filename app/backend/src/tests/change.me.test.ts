import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

// import { app } from '../app';
import teamModel from '../database/models/Teams';
import { Response } from 'superagent';
import TeamsService from '../service/TeamsService';
import TeamsController from '../controller/TeamsController';

chai.use(chaiHttp);

const { expect } = chai;

const _teamsService = new TeamsService();
const _teamsController = new TeamsController();

describe('Desenvolvendo test para a rota de Teams', () => {
    afterEach(() => sinon.restore());
  it('buscando todos os times de service', async () => {
    sinon.stub(teamModel, 'findAll').resolves([]);

    _teamsService.getAll();
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