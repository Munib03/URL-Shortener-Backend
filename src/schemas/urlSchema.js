import { z } from "zod";


export const shortenPostRequestBodySchema = z.object({
    targetURL: z 
        .string()
        .url(),
    shortCode: z 
        .string()
});