const getAll = `SELECT team.team_name AS name,
    CAST(SUM(points) AS UNSIGNED) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(points = 3) AS totalVictories,
    SUM(points = 1) AS totalDraws,
    SUM(points = 0) AS totalLosses,
    CAST(SUM(goals_favor) AS UNSIGNED) AS goalsFavor,
    CAST(SUM(goals_own) AS UNSIGNED) AS goalsOwn,
    CAST(SUM(goals_favor) - SUM(goals_own) AS SIGNED) AS goalsBalance,
    ROUND((SUM(points) / (COUNT(*) * 3)) * 100, 2) AS efficiency
FROM (
    SELECT m.home_team_id AS team_id,
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END AS points,
        m.home_team_goals AS goals_favor,
        m.away_team_goals AS goals_own
    FROM matches AS m
    WHERE m.in_progress = 0
    UNION ALL
    SELECT m.away_team_id AS team_id,
        CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
        END AS points,
        m.away_team_goals AS goals_favor,
        m.home_team_goals AS goals_own
    FROM matches AS m
    WHERE m.in_progress = 0
) AS matches
INNER JOIN teams AS team
    ON matches.team_id = team.id
GROUP BY team.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, name ASC;`;

export default getAll;
