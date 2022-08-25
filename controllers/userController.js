import userRepository from "../repositories/userRepository.js";
import urlsRepository from "../repositories/urlsRepository.js";

export async function getRanking(req, res) {
    try {
      const result = await userRepository.getUrlsRankingByUser();
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
  }

export async function getUserById(req,res){
  const {user} = res.locals;
  const {id} = req.params;
  if(id != user.id ) {
    return res.sendStatus(401); 
  }
  try {
    const urlsResult = await urlsRepository.getUrlsByUser(id);
    const userUrls = urlsResult.rows;

    const visitResult = await urlsRepository.getVisitCountByUser(id);
    const [visitCount] = visitResult.rows;

    res.send({
      id: user.id,
      name: user.name,
      visitCount: visitCount.sum || 0,
      shortenedUrls: userUrls
    });

  } catch (error){
    console.log(error);
    return res.sendStatus(500); 
  }
}


