import cors from "cors";
import "dotenv/config";
import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (
    err: Error,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
