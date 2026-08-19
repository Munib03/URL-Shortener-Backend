import prisma from "../utils/prisma.js";
import hashIt from "../utils/hashTheString.js";


async function registerUser(firstName, lastName, email, password) {
  const existing = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (existing) {
    const error = new Error(`User with email [${email}] already exists!`);
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashIt(password);
  const user = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    },
    omit: {
      password: true,
      updatedAt: true
    }
  });

  return user;
}


export default {
  registerUser
}