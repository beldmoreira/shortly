import sessionsRepository from "../repositories/sessionsRepository.js";
import userRepository from "../repositories/userRepository.js";


export async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401); 
    }
  
    try {
      const { rows:sessions } = await sessionsRepository.getSessionByToken(token);
      const [session] = sessions;
      if (!session) {
        return res.sendStatus(401);
      }
  
      const { rows: users } = await userRepository.getUserById(session.userId);
      const [user] = users;
      if (!user) {
        return res.sendStatus(401); 
      }
    
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }  
  }