import sessionsRepository from "../repositories/sessionsRepository";
import authRepository from "../repositories/authRepository";


export async function validateToken(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.send(401).status("No token."); 
    }
  
    try {
      const { rows:sessions } = await sessionsRepository.getSessionByToken(token);
      const [session] = sessions;
      if (!session) {
        return res.send(401).send("Session was not found."); 
      }
  
      const { rows: users } = await authRepository.getUserById(session.userId);
      const [user] = users;
      if (!user) {
        return res.send(401).send("User was not found."); 
      }
    
      res.locals.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }  
  }