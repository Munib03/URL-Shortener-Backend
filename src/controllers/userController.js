import userServices from "../services/userServices.js";
import { createUserSchema } from "../schemas/userSchema.js";


async function registerUser(req, res) {
  try {
    const inputValidation = await createUserSchema.safeParseAsync(req.body);
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


export default {
  registerUser
}