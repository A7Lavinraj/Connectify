import React from "react";
import BottombarItem from "./BottombarItem";
import { AiOutlinePoweroff } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { BiConversation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BottombarItems = [
  {
    id: 1,
    icon: CiSearch,
    href: "/search"
  },
  {
    id: 2,
    icon: BiConversation,
    href: "/conversations"
  }
];

export default function Bottombar() {
  const navigate = useNavigate();

  function logoutHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.removeItem("mernchat@email");
    localStorage.removeItem("mernchat@token");
    navigate("/auth");
  }

  return (
    <div className="lg:hidden grid grid-cols-3 place-items-center text-custom300 py-5 w-full">
      {BottombarItems.map((item) => {
        return (
          <BottombarItem key={item.id} icon={item.icon} href={item.href} />
        );
      })}
      <form onSubmit={logoutHandler}>
        <button type="submit">
          <AiOutlinePoweroff />
        </button>
      </form>
    </div>
  );
}
