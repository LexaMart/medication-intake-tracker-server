import { Router } from "express";
import { StatusCodes } from "../utills/constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository";
import { authRegisterBodyDtoValidator } from "../dto/auth/auth-register-body.dto";
import { authLoginBodyDtoValidator } from "../dto/auth/auth-login.body.dto";

export const authRouter = Router();
const prefix = "/auth/";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1h";

function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

authRouter.post(`${prefix}register`, async (req, res) => {
  try {
    authRegisterBodyDtoValidator(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await userRepository.createUser(
      req.body.email,
      hashedPassword
    );

    const token = generateToken(user.id);

    res.status(StatusCodes.OK).send({
      email: user.email,
      token: token,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message,
    });
  }
});

authRouter.post(`${prefix}login`, async (req, res) => {
  try {
    authLoginBodyDtoValidator(req.body);

    const user = await userRepository.getUserByEmail(req.body.email);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        error: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    res.status(StatusCodes.OK).send({
      message: "Login successful",
      id: user.id,
      email: user.email,
      token: token,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: error.message,
    });
  }
});
