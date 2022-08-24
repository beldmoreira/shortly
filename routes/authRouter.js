import { Router } from "express";
import joiValidation from "../middlewares/joiValidation.js"
import authSchema from  "../schemas/authSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import { createUser, login } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post(`/signup`,joiValidation(authSchema),createUser)
authRouter.post(`/signin`,joiValidation(loginSchema), login)

export default authRouter;