import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps {
  product_id: string;
}

class DeleteProductService {
  async execute({ product_id }: DeleteProductServiceProps) {
    try {
      await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          disabled: true,
          updatedAt: new Date(),
        },
      });

      return { message: "Product deleted successfully" };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete product");
    }
  }
}

export { DeleteProductService };
