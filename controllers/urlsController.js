import urlsRepository from "../repositories/urlsRepository.js";
import { nanoid } from "nanoid";


export async function createShortenedUrl(req,res){
    const { id } = res.locals.user;
    const { url } = req.body;
    const NUM_OF_CHARS = 8;
    const shortURL = nanoid(NUM_OF_CHARS);
    try {
        await urlsRepository.createShortUrl(url,shortURL,id)
        res.status(201).send({shortURL})
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    
    }
}

export async function deleteUrl (req,res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const result = await urlsRepository.getURLById(id);
        if(result.rowCount === 0) {
            return res.sendStatus(404);
        }
    await urlsRepository.deleteURL(id);
    res.sendStatus(204);
    } catch (error) {
    console.log(error);
    return res.sendStatus(500);

}
}

