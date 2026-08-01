import { Request, Response } from "express";

class CreateUserService {
  async execute(req: Request, res: Response) {
    console.log("executando o service!");

    return "Usuario criado";
  }
}

export { CreateUserService };
