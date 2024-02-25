import React from "react";
import Sidebar from "./components/Sidebar";
import Bottombar from "./components/Bottombar";
import SearchModel from "./components/SearchModel";
import { useSearchModel } from "./hooks/useSearchModel";
import { Toaster } from "react-hot-toast";

export default function App() {
  const searchModel = useSearchModel();
  return (
    <div className="flex lg:flex-row flex-col h-screen items-center">
      <Toaster />
      <Sidebar />
      <main className="w-full lg:h-auto flex-1 flex flex-col items-center justify-center">
        <h1 className="text-custom300 text-center font-bold text-2xl">
          Connectify
        </h1>
        <p className="text-custom300 text-center text-lg mt-5">
          A real time chat application in Mern stack
        </p>
        <SearchModel status={searchModel.status} />
      </main>
      <Bottombar />
    </div>
  );
}
