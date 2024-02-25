import React from "react";
import { RxCross2 } from "react-icons/rx";

interface ConversationProps {
  name: string;
  conversationId: string;
  removeConversationHandler: (conversationId: string) => void;
}

export default function conversationItem({
  name,
  conversationId,
  removeConversationHandler
}: ConversationProps) {
  function submitHandler() {
    removeConversationHandler(conversationId);
  }

  return (
    <div>
      <p>{name}</p>
      <form onSubmit={submitHandler}>
        <button type="submit">
          <RxCross2 />
        </button>
      </form>
    </div>
  );
}
