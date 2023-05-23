import Team from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class LeaderboardService {
  private games = async (id: number, team: string) => {
    const gamesFilter = await Matches.findAll({ where: { inProgress: false } });
    if (team === 'homeTeamId') {
      return gamesFilter.filter((a) => a.homeTeamId === id);
    }
    return gamesFilter.filter((a) => a.awayTeamId === id);
  };

  private victores = async (id: number, team: string) => {
    const games = await this.games(id, team);
    if (team === 'homeTeamId') {
      return games.filter((a) => a.homeTeamGoals > a.awayTeamGoals);
    }
    return games.filter((a) => a.homeTeamGoals < a.awayTeamGoals);
  };

  private draws = async (id: number, team: string) => {
    const games = await Matches.findAll({ where: { inProgress: false } });
    if (team === 'homeTeamId') {
      const matchesFilter = games.filter((a) => a.homeTeamId === id);
      return matchesFilter.filter((a) => a.homeTeamGoals === a.awayTeamGoals);
    }
    const matchesFilter = games.filter((a) => a.awayTeamId === id);
    return matchesFilter.filter((a) => a.homeTeamGoals === a.awayTeamGoals);
  };

  private losses = async (id: number, team: string) => {
    const games = await this.games(id, team);
    if (team === 'homeTeamId') {
      return games.filter((a) => a.homeTeamGoals < a.awayTeamGoals);
    }
    return games.filter((a) => a.homeTeamGoals > a.awayTeamGoals);
  };

  private goalsFavor = async (id: number, team: string) => {
    const games = await this.games(id, team);
    if (team === 'homeTeamId') {
      return games.reduce((a, b) => a + b.homeTeamGoals, 0);
    }
    return games.reduce((a, b) => a + b.awayTeamGoals, 0);
  };

  private goalsOwn = async (id: number, team: string) => {
    const games = await this.games(id, team);
    if (team === 'homeTeamId') {
      return games.reduce((a, b) => a + b.awayTeamGoals, 0);
    }
    return games.reduce((a, b) => a + b.homeTeamGoals, 0);
  };

  private eficiency = async (id: number, team: string) => {
    const games = ((await this.victores(id, team)).length * 3)
      + (await this.draws(id, team)).length;
    const matchesFilter = (await this.games(id, team)).length * 3;
    console.log(games, matchesFilter);
    console.log(((games / matchesFilter) * 100).toFixed(2));
    return ((games / matchesFilter) * 100).toFixed(2);
  };

  public getAll = async (team: string) => {
    const getAllTeams = await Team.findAll();
    const infoTeams = await Promise.all(getAllTeams.map(async (a) => ({ name: a.teamName,
      totalPoints: ((await this.victores(a.id, team)).length * 3)
        + (await this.draws(a.id, team)).length,
      totalGames: (await this.games(a.id, team)).length,
      totalVictories: (await this.victores(a.id, team)).length,
      totalDraws: (await this.draws(a.id, team)).length,
      totalLosses: (await this.losses(a.id, team)).length,
      goalsFavor: (await this.goalsFavor(a.id, team)),
      goalsOwn: (await this.goalsOwn(a.id, team)),
      goalsBalance: (await this.goalsFavor(a.id, team) - await this
        .goalsOwn(a.id, team)),
      efficiency: (await this.eficiency(a.id, team)),
    })));
    const sortTeams = infoTeams.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
    return { type: 200, message: sortTeams };
  };

  table = async () => {
    const gameHome = (await this.getAll('homeTeamId')).message;
    const gameAway = (await this.getAll('awayTeamId')).message;
    return gameHome.map(async (a) => {
      const awayTeam = gameAway.find((b) => b.name === a.name);
      if (!awayTeam) return a;
      return { name: a.name,
        totalPoints: a.totalPoints + awayTeam.totalPoints,
        totalGames: a.totalGames + awayTeam.totalGames,
        totalVictories: a.totalVictories + awayTeam.totalVictories,
        totalDraws: a.totalDraws + awayTeam.totalDraws,
        totalLosses: a.totalLosses + awayTeam.totalLosses,
        goalsFavor: a.goalsFavor + awayTeam.goalsFavor,
        goalsOwn: a.goalsOwn + awayTeam.goalsOwn,
        goalsBalance: a.goalsBalance + awayTeam.goalsBalance,
        efficiency: (((a.totalPoints + awayTeam.totalPoints)
         / ((a.totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2),
      };
    });
  };

  public getTable = async () => {
    const table = await Promise.all(await this.table());
    const sortTable = table.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);
    return { type: 200, message: sortTable };
  };
}
