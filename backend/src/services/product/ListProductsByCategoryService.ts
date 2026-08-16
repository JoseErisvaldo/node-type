import prismaClient from "../../prisma/index";

interface ListProductsByCategoryServiceProps {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ListProductsByCategoryServiceProps) {
    try {
      const category = await prismaClient.category.findUnique({
        where: {
          id: category_id,
        },
      });

      if (!category) {
        throw new Error("Categoria nao encontrada!");
      }

      const products = await prismaClient.product.findMany({
        where: {
          category_id: category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return products;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          `Falha ao buscar categorias dos produtos: ${err.message}`,
        );
      }
      throw new Error("Falha ao buscar categorias dos produtos");
    }
  }
}

export { ListProductsByCategoryService };
