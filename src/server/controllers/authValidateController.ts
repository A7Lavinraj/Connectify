import db from "../db";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export default async function authValidateController(
  request: Request,
  response: Response
) {
  const { token, email } = request.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) return response.status(400);

    const validation = jwt.verify(token, process.env.JWT_SECRET as string);
    if (validation)
      return response.status(200).json({
        tokenValidation: true
      });
    else return response.status(404).json({ tokenValidation: false });
  } catch (error) {
    console.error("ERROR: authValidateController", error);
    return response.status(404).json({ tokenValidation: false });
  }
}
