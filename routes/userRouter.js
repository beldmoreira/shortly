import { Router } from "express";
import joiValidation from "../middlewares/joiValidation.js"
import authSchema from  "../schemas/authSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router()

authRouter.post(`/signup`,joiValidation(authSchema))
authRouter.post(`/signin`,joiValidation(loginSchema))

export default authRouter;