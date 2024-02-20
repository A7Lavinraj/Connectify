import React from "react";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex items-center">
      <Toaster />
      <Sidebar />
      <main className="w-full">
        <h1 className="text-custom500 text-center font-bold text-2xl">
          Connectify
        </h1>
        <p className="text-custom300 text-center text-lg mt-5">
          A real time chat application in Mern stack
        </p>
      </main>
    </div>
  );
}
