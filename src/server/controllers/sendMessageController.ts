import db from "../db";
import { Request, Response } from "express";

export default async function sendMessageController(
  request: Request,
  response: Response
) {
  try {
    const message = await db.message.create({
      data: {
        content: request.body.content,
        email: request.body.email,
        conversationId: request.body.conversationId
      }
    });

    return response.status(201).json(message);
  } catch (error) {
    console.error("ERROR: sendMessageController", error);
    return response.status(500);
  }
}
