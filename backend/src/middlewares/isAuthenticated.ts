import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

const secret = process.env.JWT_SECRET as string;

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: "Token not provided",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = jwt.verify(token!, secret) as PayLoad;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}
