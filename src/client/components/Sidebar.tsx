import React from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CgRemoveR } from "react-icons/cg";
import { getConversations, removeConversation } from "../services";
import { Conversation } from "../types";
import { twMerge } from "tailwind-merge";
import { useSearchModel } from "../hooks/useSearchModel";

export default function Sidebar() {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchModel = useSearchModel();

  const logoutHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem("mernchat@email");
    localStorage.removeItem("mernchat@token");
    navigate("/auth");
  };

  React.useEffect(() => {
    async function fetchConversationOnMount() {
      const _conversations = await getConversations(
        localStorage.getItem("mernchat@email") as string
      );
      setConversations([..._conversations]);
    }

    fetchConversationOnMount();
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-[300px] h-screen bg-custom200 justify-between">
      <div className=" pl-5 py-5">
        <Link to="/">
          <h2 className="text-custom400 font-bold text-2xl">Connectify</h2>
        </Link>
        <button
          onClick={searchModel.open}
          className="flex gap-2 text-custom300 items-center mt-10"
        >
          <CiSearch />
          <p>Search</p>
        </button>
      </div>
      <section className="mt-10 flex-1 px-5 my-5 overflow-y-auto flex flex-col gap-5">
        {conversations.map((conversation) => {
          const user = conversation.users.find(
            (user) => user.email !== localStorage.getItem("mernchat@email")
          );
          return (
            <div
              key={conversation.id}
              className={twMerge(
                "text-custom300 flex items-center justify-between",
                location.pathname === `/conversation/${conversation.id}` &&
                  "text-custom400"
              )}
            >
              <Link to={`/conversation/${conversation.id}`} className="flex-1">
                <div className="flex-1">
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                </div>
              </Link>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const _conversation = await removeConversation(
                    conversation.id
                  );
                  if (_conversation) {
                    toast.success(`${user?.name} removed`);
                  } else {
                    toast.error("Error occurred");
                  }

                  setConversations([
                    ...conversations.filter(
                      (con) => con.id !== _conversation.id
                    )
                  ]);
                }}
              >
                <button type="submit" className="text-red-500 text-xl">
                  <CgRemoveR />
                </button>
              </form>
            </div>
          );
        })}
      </section>
      <section>
        <form onSubmit={logoutHandler}>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 text-custom600 bg-red-900 w-full h-10"
          >
            Logout
          </button>
        </form>
      </section>
    </aside>
  );
}
