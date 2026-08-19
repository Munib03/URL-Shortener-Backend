import bcrypt from "bcrypt";


async function hashIt(str) {
  const hashedStr = await bcrypt.hash(str, 10);

  return hashedStr;
}


export default hashIt;