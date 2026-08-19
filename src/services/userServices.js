import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";


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

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
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