import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: any, res: any): Promise<void> {
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ name });

    res.status(201).json(category);
  }
}

export { CreateCategoryController };
