import { Request, Response } from "express";
import db from "../db";

export default async function removeConversationController(
  request: Request,
  response: Response
) {
  const { conversationId } = request.params;

  try {
    const currentConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!currentConversation) {
      return response.status(404);
    }

    for (const user of currentConversation.users) {
      await db.user.update({
        where: { id: user.id },
        data: {
          conversations: {
            disconnect: { id: conversationId }
          }
        }
      });
    }

    const deletedConversation = await db.conversation.delete({
      where: { id: conversationId }
    });

    return response.status(200).json(deletedConversation);
  } catch (error) {
    console.error("ERROR removeConversationController", error);
    return response.status(500);
  }
}
