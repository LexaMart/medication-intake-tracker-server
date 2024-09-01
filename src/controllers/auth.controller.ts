import { Router } from "express";
import { StatusCodes } from "../utills/constants";
import {
  AuthRegisterBodyDto,
  authRegisterBodyDtoValidator,
} from "../dto/auth/auth-register-body.dto";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import {
  AuthLoginBodyDto,
  authLoginBodyDtoValidator,
} from "../dto/auth/auth-login.body.dto";

export const authRouter = Router();
const prefix = "/auth/";

authRouter.post(
  `${prefix}register`,
  async (req: { body: AuthRegisterBodyDto }, res) => {
    try {
      authRegisterBodyDtoValidator(req.body);

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await userRepository.createUser(
        req.body.email,
        hashedPassword
      );
      res.status(StatusCodes.OK).send({
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({
        error,
      });
    }
  }
);
console.log(`${prefix}register`);

authRouter.post(
  `${prefix}login`,
  async (req: { body: AuthLoginBodyDto }, res) => {
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

      res.status(StatusCodes.OK).send({
        message: "Login successful",
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send({
        error: error,
      });
    }
  }
);
