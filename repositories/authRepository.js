import db from "../config/db.js";
import bcrypt from "bcrypt";

async function getUserByEmail(email){
    return db.query(`
    SELECT * 
    FROM users
    WHERE email = $1`,[email])
}

async function createUser(name,email,password){
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(password,SALT)
    return db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)`,[name,email,hashedPassword])
}

const authRepository = {
    getUserByEmail,
    createUser  
}

export default authRepository