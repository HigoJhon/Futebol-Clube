const getAway = `SELECT TRYBE_FUTEBOL_CLUBE.teams.team_name AS name,
CAST(SUM(points) AS UNSIGNED) AS totalPoints,
COUNT(*) AS totalGames,
COUNT(CASE WHEN points = 3 THEN 1 END) AS totalVictories,
COUNT(CASE WHEN points = 1 THEN 1 END) AS totalDraws,
COUNT(CASE WHEN points = 0 THEN 1 END) AS totalLosses,
CAST(SUM(goals_favor) AS UNSIGNED) AS goalsFavor,
CAST(SUM(goals_own) AS UNSIGNED) AS goalsOwn,
SUM(goals_favor) - SUM(goals_own) AS goalsBalance,
ROUND((SUM(points) / (COUNT(*) * 3)) * 100, 2) AS efficiency
FROM (
    SELECT away_team_id AS team_id,
        CASE
            WHEN away_team_goals > home_team_goals THEN 3
            WHEN away_team_goals = home_team_goals THEN 1
            ELSE 0
        END AS points,
        away_team_goals AS goals_favor,
        home_team_goals AS goals_own
    FROM TRYBE_FUTEBOL_CLUBE.matches
    WHERE TRYBE_FUTEBOL_CLUBE.matches.in_progress = 0
) AS matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
ON matches.team_id = TRYBE_FUTEBOL_CLUBE.teams.id
GROUP BY TRYBE_FUTEBOL_CLUBE.teams.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, name ASC;`;

export default getAway;
