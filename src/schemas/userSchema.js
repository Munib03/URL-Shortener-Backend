import { z } from "zod";


export const signupPostRequestBodySchema = z.object({
  firstName: z 
      .string()
      .min(3, "Firstname must be atleast 3 character!")
      .max(55, "Firstname cannot exceed 55 character!"),
  lastName: z
      .string()
      .min(3, "Firstname must be atleast 3 character!")
      .max(55, "Firstname cannot exceed 55 character!"),

  email: z
      .string()
      .email("Invalid email!"),


  password: z 
      .string()
      .min(8, "Password must be atleast 8 character!")
});


export const loginPostRequestBodySchema = z.object({
    email: z 
        .string()
        .email(),
    password: z 
        .string()
        .min(8, "Password must be atleast 8 characters!")
});