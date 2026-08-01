import { DetailUserService } from "../../services/user/DetailUserService";
import { Request, Response } from "express";

class DetailUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const user_id = req.user_id;

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(user_id as string);

    res.json(user);
  }
}
export { DetailUserController };
