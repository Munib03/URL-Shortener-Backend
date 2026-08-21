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


async function updateAURL(urlId, userId, targetURL) {
  const url = await prisma.url.findUnique({
    where: {
      id: urlId,
      userId: userId
    }
  });


  if (!url) {
    const error = new Error(`URL with id [${urlId}] does not exist!`);
    error.statusCode = 404;
    throw error;
  }

  var now = new Date();
  const result = await prisma.url.update({
    where: {
      id: urlId,
      userId: userId
    },
    data: {
      targetURL: targetURL,
      updatedAt: now
    }
  });
  
  return result;
}


export default {
  registerURL,
  getUrlByShortCode,
  getAllURLs,
  deleteAUrl,
  updateAURL
}