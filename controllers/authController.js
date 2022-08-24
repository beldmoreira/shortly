import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import sessionsRepository from "../repositories/sessionsRepository.js";
import authRepository from "../repositories/authRepository.js";

export async function login(req, res) {
    const { email, password } = req.body;
    const { rows: users } = await authRepository.getUserByEmail(email);
    const [user] = users;
    if (!user) {
      return res.sendStatus(401);
    }
  
    if (bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await sessionsRepository.createSession(token, user.id);
      return res.send(token);
    }
    res.sendStatus(401);
  }

  export async function createUser(req, res) {
    const user = req.body;
  
    try {
      const existingUsers = authRepository.getUserByEmail(user.email)
      if (existingUsers.rowCount > 0) {
        return res.sendStatus(409); 
      }
  
      const {name, email, password} = user;
      await authRepository.createUser(name, email, password);
  
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
