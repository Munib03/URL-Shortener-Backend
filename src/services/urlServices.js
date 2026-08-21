import prisma from "../utils/prisma.js";
import { nanoid } from "nanoid";


async function registerURL(targetURL, userId) {
  const shortCode = nanoid(8);
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


async function getUrlByShortCode(shortCode) {
  const url = await prisma.url.findUnique({
    where: {
      shortCode: shortCode
    },
    select: {
      targetURL: true
    }
  });

  return url;
}


async function getAllURLs(userId) {
  const urls = await prisma.url.findMany({
    where: {
      userId: userId
    },
    omit: {
      userId: true, 
      updatedAt: true
    }
  });

  return urls;
} 


export default {
  registerURL,
  getUrlByShortCode,
  getAllURLs
}