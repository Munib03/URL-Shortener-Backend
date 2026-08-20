import prisma from "../utils/prisma.js";
import hashIt from "../utils/hashTheString.js";
import generateJWT from "../utils/generateJWT.js";
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


async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    const error = new Error(`Invalid Password or email!`);
    error.statusCode = 404;
    throw error;
  }

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    const error = new Error("Incorrect Password or email!");
    error.statusCode = 400;
    throw error
  };

  const token = generateJWT(payload);

  return token;
}

export default {
  registerUser,
  loginUser
}