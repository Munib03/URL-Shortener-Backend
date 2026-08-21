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


async function deleteAUrl(urlId, userId) {
  const checkForExistanceOfURL = await prisma.url.findUnique({
    where: {
      id: urlId,
      userId: userId
    }
  });

  if (!checkForExistanceOfURL) {
    const error = new Error(`Url with ID [${urlId}] does not exist!`);
    error.statusCode = 404;
    throw error;
  }

  const result = await prisma.url.delete({
    where: {
      id: urlId,
      userId: userId
    }
  });

  return result;
}


export default {
  registerURL,
  getUrlByShortCode,
  getAllURLs,
  deleteAUrl
}