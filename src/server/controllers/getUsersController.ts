import db from "../db";
import { Request, Response } from "express";

export default async function getUsersController(
  request: Request,
  response: Response
) {
  const { email } = request.params;

  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          email: email
        }
      }
    });

    if (!users) {
      response.status(404);
    }

    return response.status(200).json(users);
  } catch (error) {
    console.error("ERROR getUsersController", error);
    return response.status(500);
  }
}
