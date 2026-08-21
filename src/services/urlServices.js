import prisma from "../utils/prisma.js";


async function registerURL(targetURL, shortCode, userId) {
  const result = await prisma.url.create({
    data: {
      targetURL: targetURL,
      shortCode: shortCode,
      userId: userId
    },
    omit: {
      userId: true,
      updatedAt: true
    }
  });

  
  return result;
}



export default {
  registerURL
}