import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default async function registerUserController(
  request: Request,
  response: Response
) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: request.body.email
      }
    });

    if (user) {
      return response.status(409);
    }
  } catch (error) {
    console.error("ERROR: registerUserController", error);
    return response.status(500);
  }

  try {
    const hashed_password = await bcrypt.hash(request.body.password, 12);
    const user = await db.user.create({
      data: {
        name: request.body.username,
        email: request.body.email,
        hashed_password: hashed_password
      }
    });

    if (!user) {
      return response.status(500);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return response.status(201).json({ token: token, email: user.email });
  } catch (error) {
    console.error("ERROR: registerUserController", error);
    return response.status(500);
  }
}
