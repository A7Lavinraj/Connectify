import db from "../db";
import { Request, Response } from "express";

export default async function getMessages(
  request: Request,
  response: Response
) {
  const { conversationId } = request.params;

  if (!conversationId) {
    return response.status(400);
  }

  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId
      }
    });

    return response.status(200).json(messages);
  } catch (error) {
    console.error("ERROR: getMessagesController", error);
    return response.status(500);
  }
}
