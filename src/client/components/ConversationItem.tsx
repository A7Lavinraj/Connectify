import React from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";

interface ContactProps {
  username: string;
  email: string;
  conversationId: string;
  removeHandler: (coversationId: string) => void;
  href: string;
  active?: boolean;
}

export default function Contact({
  username,
  email,
  conversationId,
  removeHandler,
  href,
  active
}: ContactProps) {
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    removeHandler(conversationId);
  }

  return (
    <div className="flex items-center justify-between p-4 group">
      <Link to={href}>
        <div className="flex flex-col">
          <h2
            className={twMerge(
              "font-semibold",
              active ? "text-custom500" : "text-custom300"
            )}
          >
            {username}
          </h2>
          <p className={twMerge(active ? "text-custom400" : "text-custom300")}>
            {email}
          </p>
        </div>
      </Link>
      <form onSubmit={submitHandler}>
        <button
          type="submit"
          className="group-hover:visible invisible bg-red-400 text-custom600 rounded p-1"
        >
          <IoMdRemove />
        </button>
      </form>
    </div>
  );
}
