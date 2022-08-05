import joi from "joi";

const authSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.any().equal(joi.ref("password")) 
  });

   
  
export default authSchema



