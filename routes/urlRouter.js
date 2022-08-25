import { Router } from "express";
import joiValidation from "../middlewares/joiValidation.js";
import {validateToken} from "../middlewares/authValidation.js"
import urlSchema from "../schemas/urlSchema.js";
import { createShortenedUrl, deleteUrl, getUrlById, openShortUrl } from "../controllers/urlsController.js";

const urlRouter = Router ();

urlRouter.post("/urls/shorten", joiValidation(urlSchema),validateToken,createShortenedUrl)
urlRouter.get("/urls/:id",getUrlById)
urlRouter.get("/urls/open/:shortUrl",openShortUrl)
urlRouter.delete("/urls/:id", validateToken,deleteUrl)

export default urlRouter;




