import React from "react";
import ConversationItem from "./ConversationItem";
import { useLocation } from "react-router-dom";
import { Conversation } from "../types";

export default function ContactList({
  conversations,
  removeHandler
}: {
  conversations: Conversation[];
  removeHandler: (conversationId: string) => void;
}) {
  const { pathname } = useLocation();
  const userEmail = localStorage.getItem("mernchat@email");

  const _conversations = conversations.map((conversation) => {
    return {
      id: conversation.id,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      user: conversation.users.filter((user) => user.email !== userEmail)[0]
    };
  });

  return (
    <React.Fragment>
      {_conversations.map((conversation) => {
        return (
          <ConversationItem
            key={conversation.id}
            username={conversation.user.name}
            email={conversation.user.email}
            conversationId={conversation.id}
            removeHandler={removeHandler}
            href={`/conversation/${conversation.id}`}
            active={pathname === `/conversation/${conversation.id}`}
          />
        );
      })}
    </React.Fragment>
  );
}
