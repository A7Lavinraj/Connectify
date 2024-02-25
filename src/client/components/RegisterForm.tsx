import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function RegisterForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const RegisterHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    setLoading(true);

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.get("username") as string,
        email: data.get("email") as string,
        password: data.get("password") as string
      })
    });

    setLoading(false);

    if (response.ok) {
      const { token, email } = await response.json();

      localStorage.setItem("mernchat@token", token);
      localStorage.setItem("mernchat@email", email);

      navigate("/");
    }
  };

  return (
    <form
      onSubmit={RegisterHandler}
      className="flex flex-col items-center justify-center gap-5 min-w-[30rem]"
    >
      <div className="flex flex-col items-start gap-2 w-full">
        <label htmlFor="username" className="font-bold text-lg text-custom600">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          className="h-10 rounded p-2 w-full bg-custom200 text-custom400"
        />
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label htmlFor="email" className="font-bold text-lg text-custom600">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          required
          className="h-10 rounded p-2 w-full bg-custom200 text-custom400"
        />
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label htmlFor="password" className="font-bold text-lg text-custom600">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="h-10 rounded p-2 w-full bg-custom200 text-custom400"
        />
      </div>
      <button
        type="submit"
        className="bg-custom500 text-custom200 p-2 rounded w-full flex items-center justify-center"
      >
        {loading ? <Spinner color="bg-custom500" /> : <span>Register</span>}
      </button>
    </form>
  );
}
