import React from "react";
import { addConversation, getConversations, getUsers } from "../services";
import { Conversation, User } from "../types";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { useSearchModel } from "../hooks/useSearchModel";

interface SearchModelProps {
  status?: boolean;
}

export default function SearchModel({ status }: SearchModelProps) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [results, setResults] = React.useState<User[]>([]);
  const searchModel = useSearchModel();

  function searchResults(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    setResults([
      ...users.filter((result) => {
        return (
          result.name.includes(data.get("hint") as string) ||
          result.email.includes(data.get("hint") as string)
        );
      })
    ]);
  }

  function isContain(user: User, list: Array<User | undefined>) {
    for (let i = 0; i < list.length; i++)
      if (list[i]?.email === user.email) return true;

    return false;
  }

  React.useEffect(() => {
    async function fetchOnMount() {
      const [users, _conversations]: [
        users: User[],
        _conversations: Conversation[]
      ] = await Promise.all([
        getUsers(localStorage.getItem("mernchat@email") as string),
        getConversations(localStorage.getItem("mernchat@email") as string)
      ]);
      let friends: Array<User | undefined> = [];
      _conversations.forEach((conversation) => {
        friends.push(
          conversation.users.find(
            (user) =>
              user.email !== (localStorage.getItem("mernchat@email") as string)
          )
        );
      });
      setUsers([
        ...users.filter((user) => {
          return !isContain(user, friends);
        })
      ]);
    }
    fetchOnMount();
  }, []);

  if (!status) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 bg-black/80 flex flex-col h-screen w-screen items-center gap-5">
      <form
        className="flex flex-col p-5 gap-6 max-w-[30rem] w-full bg-custom200 relative rounded mt-10"
        onSubmit={searchResults}
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
        {results.map((result) => {
          return (
            <div
              key={result.id}
              className="bg-custom200 p-2 text-custom300 flex items-center justify-between"
            >
              <div>
                <h2>{result.name}</h2>
                <p>{result.email}</p>
              </div>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  await addConversation(
                    localStorage.getItem("mernchat@email") as string,
                    result.email
                  );
                }}
              >
                <button type="submit" className="text-custom400">
                  <IoMdAdd />
                </button>
              </form>
            </div>
          );
        })}
      </section>
    </div>
  );
}
