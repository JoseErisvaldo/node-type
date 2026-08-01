import prismaClient from "../../prisma";

interface CreateCategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CreateCategoryRequest): Promise<{
    id: string;
    name: string;
    createdAt: Date;
  }> {
    try {
      const category = await prismaClient.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error("Failed to create category");
    }
  }
}

export { CreateCategoryService };
