import { create } from "zustand";
import { getUsers } from "../services";
import { User } from "../types";

interface UsersStore {
  users: User[];
  searchedUsers: User[];
  setSearchedUsers: (list: User[]) => void;
  userQuery: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const useUsers = create<UsersStore>((set) => {
  let users: User[] = [];

  (async () => {
    users = await getUsers(localStorage.getItem("mernchat@email") as string);
    set({
      users: users?.filter(
        (user) => user.email !== localStorage.getItem("mernchat@email")
      )
    });
  })();

  return {
    users: users,
    searchedUsers: [],
    setSearchedUsers: (list) => {
      set({ searchedUsers: list });
    },
    userQuery: (event) => {
      event.preventDefault();
      const data = new FormData(event.target as HTMLFormElement);
      set({
        searchedUsers: users?.filter((user) => {
          return (
            user.email.includes(data.get("hint") as string) ||
            user.name.includes(data.get("hint") as string)
          );
        })
      });
    }
  };
});
