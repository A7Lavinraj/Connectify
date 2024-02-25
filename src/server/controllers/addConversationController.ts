import db from "../db";
import { Request, Response } from "express";

export default async function addConversationController(
  request: Request,
  response: Response
) {
  const { userEmail, conversationEmail } = request.body;

  try {
    const user = await db.user.findUnique({
      where: {
        email: conversationEmail
      }
    });

    if (!user) {
      console.error("ERROR user not found!");
      return response.status(404);
    }

    const users = await db.user.findMany({
      where: {
        OR: [{ email: userEmail }, { email: conversationEmail }]
      }
    });

    const conversation = await db.conversation.create({
      data: {
        users: {
          connect: users.map((user) => {
            return {
              id: user.id
            };
          })
        }
      },
      include: {
        users: true
      }
    });

    if (!conversation) {
      console.log("ERROR conversation not found!");
      return response.status(500);
    }
    return response.status(201).json(conversation);
  } catch (error) {
    console.error("ERROR addConversationController");
    return response.status(500);
  }
}
