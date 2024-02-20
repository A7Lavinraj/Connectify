import db from "../db";
import { Request, Response } from "express";

export default async function getConversationController(
  request: Request,
  response: Response
) {
  try {
    const { email } = request.params;
    const conversations = await db.conversation.findMany({
      where: {
        users: {
          some: {
            email: email
          }
        }
      },
      include: {
        users: true
      }
    });
    return response.status(200).json(conversations);
  } catch (error) {
    console.error("ERROR: getConversationController", error);
    return response.status(500);
  }
}
