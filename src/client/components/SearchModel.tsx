import React from "react";
import { addConversation } from "../services";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { useSearchModel } from "../hooks/useSearchModel";
import { useUsers } from "../hooks/useUsers";
import { useConversation } from "../hooks/useConversation";
import Spinner from "./Spinner";

interface SearchModelProps {
  isOpen?: boolean;
}

export default function SearchModel({ isOpen: status }: SearchModelProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { conversations, setConversations } = useConversation();
  const { searchedUsers, userQuery } = useUsers();
  const searchModel = useSearchModel();

  if (!status) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 bg-black/80 flex flex-col h-screen w-screen items-center gap-5">
      <form
        className="flex flex-col p-5 gap-6 max-w-[30rem] w-full bg-custom200 relative rounded mt-10"
        onSubmit={userQuery}
      >
        <button
          type="button"
          onClick={searchModel.close}
          className="absolute right-3 top-3 text-custom300 text-xl"
        >
          <RxCross2 />
        </button>
        <label htmlFor="hint" className="font-bold text-custom300">
          Email or username
        </label>
        <div className="flex">
          <input
            type="text"
            name="hint"
            id="hint"
            autoFocus={searchModel.status}
            className="rounded h-9 flex-1 p-1"
          />
          <button type="submit" className="ml-5 font-bold text-custom600">
            <IoSearch />
          </button>
        </div>
      </form>
      <section className="h-full max-h-[50vh] w-full max-w-[30rem] rounded overflow-y-auto flex flex-col gap-2">
        {searchedUsers
          .filter((user) => {
            for (let i = 0; i < conversations.length; i++) {
              for (let j = 0; j < conversations[i].users.length; j++) {
                if (conversations[i].users[j].email === user.email)
                  return false;
              }
            }

            return true;
          })
          .map((user) => {
            return (
              <div
                key={user.id}
                className="bg-custom200 p-2 text-custom300 flex items-center justify-between"
              >
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                </div>
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setLoading(true);
                    const conversation = await addConversation(
                      localStorage.getItem("mernchat@email") as string,
                      user.email
                    );
                    setLoading(false);
                    setConversations([...conversations, conversation]);
                  }}
                >
                  <button
                    disabled={loading}
                    type="submit"
                    className="text-custom300 text-xl"
                  >
                    {loading ? <Spinner /> : <IoMdAdd />}
                  </button>
                </form>
              </div>
            );
          })}
      </section>
    </div>
  );
}
