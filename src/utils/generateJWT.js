import jwt from "jsonwebtoken";
import "dotenv/config";


function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "10m"});

  return token;
}


export default generateJWT;