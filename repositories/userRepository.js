import db from "../config/db.js";

async function getUserById(id){
    return db.query(`
    SELECT * 
    FROM users 
    WHERE id = $1`, [id])
}

async function getUserAndLinksById() {
    return db.query(`
    SELECT u.id, u."shortUrl", u.url, u."visitCount"
    FROM urls u
    JOIN users usr ON u."userId" = usr.id
    WHERE usr.id = $1`, [id]);
}

async function getUrlsRankingByUser() {
    return db.query(`
    SELECT usr.id, usr.name, COUNT(u.id) as "linksCount", SUM(u."visitCount") as "visitCount"
    FROM urls u
    JOIN users usr ON u."userId" = usr.id
    GROUP BY usr.id
    ORDER BY "visitCount" DESC
    LIMIT 10
  `);
}

const userRepository = {
    getUserById,
    getUserAndLinksById,
    getUrlsRankingByUser
}

export default userRepository;