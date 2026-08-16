import prismaClient from "../../prisma";

interface DeleteItemOrderProps {
  item_id: string;
}

class DeleteItemOrderService {
  async execute({ item_id }: DeleteItemOrderProps) {
    try {
      const itemExists = await prismaClient.item.findFirst({
        where: {
          id: item_id,
        },
      });

      if (!itemExists) {
        throw new Error("Item não encontrado!");
      }

      const item = await prismaClient.item.delete({
        where: {
          id: item_id,
        },
      });

      return item;
    } catch (error) {
      throw new Error("Erro ao deletar o item do pedido");
    }
  }
}

export { DeleteItemOrderService };
