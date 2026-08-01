import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" }),
  }),
});
