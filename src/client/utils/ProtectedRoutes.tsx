import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";

const BASE_API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export default function ProtectedRoutes() {
  const location = useLocation();
  const [validation, setValidation] = React.useState<boolean>(false);
  const token = localStorage.getItem("mernchat@token");
  const email = localStorage.getItem("mernchat@email");

  React.useEffect(() => {
    const validateToken = async () => {
      const response = await fetch(`${BASE_API_URL}/api/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token, email: email })
      });

      const { tokenValidation } = await response.json();

      if (tokenValidation) setValidation(true);
      else setValidation(false);
    };

    if (token) validateToken();
    else setValidation(false);
  }, [token, email]);

  if (location.pathname === "/auth") {
    return (
      <React.Fragment>
        {validation ? <Navigate to="/" /> : <Outlet />}
      </React.Fragment>
    );
  } else if (location.pathname === "/") {
    return (
      <React.Fragment>
        {validation ? <Outlet /> : <Navigate to="/auth" />}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    );
  }
}
