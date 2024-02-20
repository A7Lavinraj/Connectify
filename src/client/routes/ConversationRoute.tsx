import React from "react";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import { IoSend } from "react-icons/io5";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Message } from "../types";
import { getMessages, sendMessage } from "../services";

export default function ConversationRoute() {
  const socket = React.useMemo(
    () => io("http://localhost:3000", { transports: ["websocket"] }),
    []
  );
  const { conversationId } = useParams();
  const [messages, setMessages] = React.useState<Message[]>([]);

  async function sendMessageHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const response = await sendMessage(
      data.get("message") as string,
      conversationId as string,
      localStorage.getItem("mernchat@email") as string
    );

    if (response) {
      setMessages((currentMessages) => {
        return [...currentMessages, response];
      });

      socket.emit("send-message", {
        conversationId: conversationId,
        content: data.get("message")
      });
      (event.target as HTMLFormElement).reset();
    }
  }

  React.useEffect(() => {
    async function fetchMessagesOnMount() {
      const fetchedMessages = await getMessages(conversationId as string);

      if (fetchedMessages) {
        setMessages([...fetchedMessages]);
      }
    }

    socket.emit("active", conversationId);
    socket.on("receive-message", fetchMessagesOnMount);
    fetchMessagesOnMount();

    return () => {
      socket.off("receive-message", fetchMessagesOnMount);
    };
  }, [conversationId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-screen-lg w-full mx-auto h-screen flex flex-col justify-end py-5 px-2">
        <section className="mb-10 space-y-2 overflow-y-auto">
          <Messages messages={messages} />
        </section>
        <form
          onSubmit={sendMessageHandler}
          method="POST"
          className="space-x-2 flex justify-center items-center w-full"
        >
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            id="message"
            className="rounded h-14 outline-none border-none text-md px-2 w-full bg-custom200 text-custom400"
          />
          <button
            type="submit"
            className="bg-custom500 text-custom200 rounded px-5 py-2 max-w-32 h-14 hover:bg-custom400"
          >
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
}
