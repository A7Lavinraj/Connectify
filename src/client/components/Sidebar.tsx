import React from "react";
import ConversationList from "./ConversationList";
import useClickOutside from "../hooks/useClickOutside";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { Conversation } from "../types";
import {
  removeConversation,
  addConversation,
  getConversations
} from "../services";

export default function Sidebar() {
  const navigate = useNavigate();
  const { ref, state, setState } = useClickOutside();
  const [conversations, setConversations] = React.useState<Conversation[]>([]);

  async function addConversationHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const userEmail = localStorage.getItem("mernchat@email") as string;
    const conversationEmail = data.get("email") as string;

    if (conversations) {
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].users[0].email === conversationEmail) {
          toast.error(`${conversationEmail} is already added!`);
          setState(false);
          return;
        }
      }
      if (userEmail === conversationEmail) {
        toast.error("You can't add yourself in conversations!");
        setState(false);
        return;
      }

      const conversation = await addConversation(userEmail, conversationEmail);

      if (conversations) {
        toast.success(`${conversationEmail} added successfully!`);
        setState(false);
      }
      setConversations((currentConversations) => {
        if (currentConversations) {
          return [conversation, ...currentConversations];
        } else {
          return [];
        }
      });
    }
  }

  async function removeConversationHandler(conversationId: string) {
    const response = await removeConversation(conversationId);

    if (response && conversations) {
      toast.success("Conversation removed sucessfully!");
      setConversations([
        ...conversations.filter(
          (conversation) => conversation.id != response.id
        )
      ]);
    } else {
      toast.error("Error occured while remove conversation!");
    }
  }

  async function fetchConversationsOnMount() {
    const email = localStorage.getItem("mernchat@email");

    if (email) {
      const conversations = await getConversations(email);
      setConversations([...conversations]);
    }
  }

  const logoutHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem("mernchat@email");
    localStorage.removeItem("mernchat@token");
    navigate("/auth");
  };

  React.useEffect(() => {
    fetchConversationsOnMount();
  }, []);

  return (
    <aside className="hidden md:flex flex-col min-w-[300px] max-w-[300px] h-screen bg-custom200">
      <Link to="/">
        <h2 className="text-custom400 font-bold text-2xl mt-5 ml-5">
          Connectify
        </h2>
      </Link>
      <div>
        <div ref={ref} className="flex items-center ml-5 mt-5 gap-5 h-8 w-fit">
          {state ? (
            <form onSubmit={addConversationHandler} className="h-full">
              <input
                type="text"
                name="email"
                autoFocus={state}
                className="bg-custom300 text-custom500 border-none h-full w-[180px] p-1 rounded outline-transparent"
              />
            </form>
          ) : (
            <button className="text-2xl text-custom300 hover:text-custom500 transition-colors duration-200 ease-in-out">
              <IoPersonAdd />
            </button>
          )}
        </div>
      </div>
      <section className="mt-5 flex flex-col overflow-y-auto flex-1">
        {conversations?.length ? (
          <ConversationList
            conversations={conversations}
            removeHandler={removeConversationHandler}
          />
        ) : (
          <p className="text-custom300 ml-5 mt-5 text-lg font-bold">
            No Contacts yet
          </p>
        )}
      </section>
      <section>
        <form onSubmit={logoutHandler}>
          <button
            type="submit"
            className="bg-custom500 text-custom200 w-full h-10 font-semibold"
          >
            Logout
          </button>
        </form>
      </section>
    </aside>
  );
}
