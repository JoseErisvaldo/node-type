import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z.number(),
    name: z.string().min(1, { message: "O nome do cliente é obrigatório" }),
  }),
});

export const addItemOrderSchema = z.object({
  body: z.object({
    order_id: z.string().min(1, { message: "O ID do pedido é obrigatório" }),
    product_id: z.string().min(1, { message: "O ID do produto é obrigatório" }),
    amount: z
      .number()
      .min(1, { message: "A quantidade deve ser maior que zero" }),
  }),
});

export const deleteItemOrderSchema = z.object({
  body: z
    .object({
      item_id: z
        .string()
        .min(1, { message: "O ID do item é obrigatório" })
        .optional(),
    })
    .optional(),
});

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: "Order ID deve ser uma string" })
      .min(1, "O order_id é obrigatório"),
  }),
});
