import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default async function loginUserController(
  request: Request,
  response: Response
) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: request.body.email
      }
    });

    const result = await bcrypt.compare(
      request.body.password,
      user?.hashed_password as string
    );

    if (!user || !result) {
      return response.status(404);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    return response.status(200).json({ token: token, email: user.email });
  } catch (error) {
    console.error("ERROR: loginUserController", error);
    return response.status(500);
  }
}
