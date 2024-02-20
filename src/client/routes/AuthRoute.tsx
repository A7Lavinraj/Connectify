import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

type Form = "LOGIN" | "REGISTER";

export default function AuthPage() {
  const [form, setForm] = React.useState<Form>("LOGIN");

  function toggleFormState() {
    if (form === "LOGIN") setForm("REGISTER");
    else setForm("LOGIN");
  }

  return (
    <div className="min-w-screen min-h-screen flex flex-col gap-2 items-center justify-center">
      {form === "LOGIN" ? (
        <React.Fragment>
          <LoginForm />
          <p className="text-custom600 text-lg" onClick={toggleFormState}>
            New to chat-app?{" "}
            <span className="text-custom500 cursor-pointer">register</span>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RegisterForm />
          <p className="text-custom600 text-lg" onClick={toggleFormState}>
            Already a user?{" "}
            <span className="text-custom500 cursor-pointer">login</span>
          </p>
        </React.Fragment>
      )}
    </div>
  );
}
