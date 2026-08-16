import prismaClient from "../../prisma";

interface FinishOrderProps {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: FinishOrderProps) {
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
          status: true,
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
      throw new Error("Falha ao finalizar a ordem");
    }
  }
}

export { FinishOrderService };
