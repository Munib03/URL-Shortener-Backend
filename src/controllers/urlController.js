import urlServices from "../services/urlServices.js";
import { shortenPostRequestBodySchema } from "../schemas/urlSchema.js";


async function registerURL(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        message: "Invalid Token or Someting went wrong!"
      });
    }

    const inputValidation = await shortenPostRequestBodySchema.safeParseAsync(req.body);
    if (inputValidation.error) {
      return res.status(400).json({
        message: inputValidation.error.format()
      });
    }

    const { targetURL, shortCode } = inputValidation.data;
    
    const result = await urlServices.registerURL(targetURL, shortCode, userId);

    return res.status(200).json({
      message: "URL is registered successfully!",
      url: result
    });
  }
  catch(error) {
    console.log(error);

    return res.status(500).json({
      message: "Internel Server Error!"
    });
  }
}


export default {
  registerURL
}