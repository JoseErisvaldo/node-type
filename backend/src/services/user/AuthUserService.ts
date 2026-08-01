import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../../prisma";

const secretKey = process.env.JWT_SECRET || "default_secret_key";

class AuthUserService {
  async execute(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new Error("Email ou senha incorretos!");
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos!");
    }
    const token = jwt.sign(
      { name: userExists.name, email: userExists.email, role: userExists.role },
      secretKey,
      {
        subject: userExists.id,
        expiresIn: "5m",
      },
    );

    return { message: "Login realizado com sucesso!", token };
  }
}

export { AuthUserService };
