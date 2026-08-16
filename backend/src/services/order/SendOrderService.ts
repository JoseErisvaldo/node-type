import prismaClient from "../../prisma";

interface SendOrderProps {
  order_id: string;
  name: string;
}

class SendOrderService {
  async execute({ order_id, name }: SendOrderProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      });

      if (!order) {
        throw new Error("Ordem não encontrada");
      }

      await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name: name,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return order;
    } catch (err) {
      throw new Error("Falha ao enviar a ordem");
    }
  }
}

export { SendOrderService };
