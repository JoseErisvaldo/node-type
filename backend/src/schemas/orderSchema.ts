import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.number(),
    name: z.string().min(1, { message: "O nome do cliente é obrigatório" }),
  }),
});
