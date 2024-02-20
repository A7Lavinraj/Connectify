import * as React from "react";
import { Message } from "../types";
import { twMerge } from "tailwind-merge";

export default function Messages({ messages }: { messages: Message[] }) {
  const email = localStorage.getItem("mernchat@email");

  return (
    <React.Fragment>
      {messages.map((message) => {
        return (
          <section
            key={message.id}
            className={twMerge(
              "w-fit p-2 rounded",
              email === message.email
                ? "bg-custom400 text-custom200 ml-auto"
                : "bg-custom200 text-custom400"
            )}
          >
            <p>{message.content}</p>
          </section>
        );
      })}
    </React.Fragment>
  );
}
