import { Router } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

export default router;
