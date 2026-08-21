import "dotenv/config";
import jwt from 'jsonwebtoken';


async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).json({
        message: "Unauthorized!"
      });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(404).json({
        message: "Unauthorized!"
      });
    }

    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifyToken;

    next();
  }
  catch(error) {
    console.log(error);

    if (error.name === "InvalidTokenError") {
      return res.status(400).json({
        message: "Invalid Token!"
      });
    }

    else if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message: "Expired Token!"
      });
    }

    else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        message: "Invalid Token!"
      });
    }
   
    return res.status(500).json({
      message: "Internel Server Error!"
    });
  }
}


export const ensureUserIsAuthenticated = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: "You must login first!"
    });
  }

  next();
}

export default authMiddleware;