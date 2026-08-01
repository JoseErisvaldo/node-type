import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserControlle";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userChema";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

export default router;
