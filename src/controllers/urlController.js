import urlServices from "../services/urlServices.js";
import { shortenPostRequestBodySchema } from "../schemas/urlSchema.js";


async function registerURL(req, res) {
  try {
    const userId = req.user.id;
    const inputValidation = await shortenPostRequestBodySchema.safeParseAsync(req.body);
    if (inputValidation.error) {
      return res.status(400).json({
        message: inputValidation.error.format()
      });
    }

    const { targetURL } = inputValidation.data;
    
    const result = await urlServices.registerURL(targetURL, userId);

    return res.status(200).json({
      message: "URL is registered successfully!",
      url: result
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


async function getUrlByShortCode(req, res) {
  try {
    const shortCode = req.params.shortCode;
    if (!shortCode) {
      return res.status(400).json({
        message: "Please provide the shortcode!"
      });
    }

    const url = await urlServices.getUrlByShortCode(shortCode);
    if (!url) {
      return res.status(404).json({
        message: `URL with this shortcode does not exist!`
      });
    }

    return res.redirect(url.targetURL);
  }
  catch(error) {
    console.log(error);

    return res.status(500).json({
      message: "Internel Server Error!"
    });
  }
}


async function getAllURLs(req, res) {
  try {
    const userId = req.user.id;

    const urls = await urlServices.getAllURLs(userId);
    if (!urls) {
      return res.status(400).json({
        message: "No URL found for this user!"
      });
    }

    return res.status(200).json({
      urls: urls
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
  registerURL,
  getUrlByShortCode,
  getAllURLs
}