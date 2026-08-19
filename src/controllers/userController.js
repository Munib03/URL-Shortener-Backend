import userServices from "../services/userServices.js";
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from "../schemas/userSchema.js";


async function registerUser(req, res) {
  try {
    const inputValidation = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if (inputValidation.error) {
      return res.status(400).json({
        message: inputValidation.error.format()
      });
    }

    const { firstName, lastName, email, password } = inputValidation.data;

    const user = await userServices.registerUser(firstName, lastName, email, password);

    return res.status(201).json({
      message: "User is registered successfully!",
      user: user
    });
  }
  catch(error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode 
      ? error.message 
      : "Internel Server Error!"
    });
  }
}


async function loginUser(req, res) {
  try {
    const inputValidation = await loginPostRequestBodySchema.safeParseAsync(req.body);
    if (inputValidation.error) {
      return res.status(400).json({
        message: inputValidation.error.format()
      });
    }

    const { email, password } = inputValidation.data;
    const token = await userServices.loginUser(email, password);

    return res.status(200).json({
      message: "Logged-in successfully!",
      token: token
    })
  }
  catch(error) {
    console.log(error);
    
    return res.status(error.statusCode || 500).json( {
      message: error.statusCode 
               ? error.message
               : "Internel Server Error!"
    });
  }
}



export default {
  registerUser,
  loginUser
}