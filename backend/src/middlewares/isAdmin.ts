import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = req.user_id;

  if (!user) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  const foundUser = await prisma.user.findUnique({
    where: { id: user },
  });

  if (!foundUser || foundUser.role !== "ADMIN") {
    res.status(403).json({ message: "User not permitted" });
    return;
  }

  next();
};
