import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAdmin } from "./middlewares/isAdmin";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { validateSchema } from "./middlewares/validateSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import {
  addItemOrderSchema,
  deleteItemOrderSchema,
  detailOrderSchema,
} from "./schemas/orderSchema";
import {
  createProductSchema,
  listProductsByCategorySchema,
  listProductSchema,
} from "./schemas/productSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { createOrderSchema } from "./schemas/orderSchema";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrdersController } from "./controllers/order/ListOrderController";
import { AddItemOrderController } from "./controllers/order/AddItemOrderController";
import { DeleteItemOrderController } from "./controllers/order/DeleteItemOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";

const router = Router();
const upload = multer(uploadConfig);

// Rotas users
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

router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Category
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas Products
router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductSchema),
  new ListProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductsByCategorySchema),
  new ListProductsByCategoryController().handle,
);

// Orders
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

router.get("/orders", isAuthenticated, new ListOrdersController().handle);

router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemOrderSchema),
  new AddItemOrderController().handle,
);

router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(deleteItemOrderSchema),
  new DeleteItemOrderController().handle,
);

router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle,
);

export { router };
