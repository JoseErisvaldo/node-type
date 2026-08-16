import prismaClient from "../../prisma";

interface AddItemOrderRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemOrderService {
  async execute({ order_id, product_id, amount }: AddItemOrderRequest) {
    try {
      const orderExists = await prismaClient.order.findUnique({
        where: {
          id: order_id,
        },
      });

      if (!orderExists) {
        throw new Error("Pedido não encontrado");
      }

      const productExists = await prismaClient.product.findUnique({
        where: {
          id: product_id,
          disabled: false,
        },
      });

      if (!productExists) {
        throw new Error("Produto não encontrado");
      }

      const item = await prismaClient.item.create({
        data: {
          order_id: order_id,
          product_id: product_id,
          amount: amount,
        },
        select: {
          id: true,
          amount: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (err) {
      throw new Error("Falha ao adicionar item ao pedido");
    }
  }
}

export { AddItemOrderService };
