import { Conversation } from "../types";
import { create } from "zustand";
import { getConversations } from "../services";

interface ConversationStore {
  conversations: Conversation[];
  setConversations: (list: Conversation[]) => void;
}

export const useConversation = create<ConversationStore>((set) => {
  let _conversations: Conversation[] = [];

  async function fetchConversations() {
    _conversations = await getConversations(
      localStorage.getItem("mernchat@email") as string
    );

    set({ conversations: _conversations });
  }

  fetchConversations();
  return {
    conversations: [],
    setConversations: (list: Conversation[]) => set({ conversations: list })
  };
});
