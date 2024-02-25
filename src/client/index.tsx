import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import AuthPage from "./routes/AuthRoute";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ConversationRoute from "./routes/ConversationRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

if (process.env.NODE_ENV === "development") {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);
root.render(
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route Component={ProtectedRoutes}>
          <Route index Component={App} />
          <Route path="/auth" Component={AuthPage} />
          <Route
            path="/conversation/:conversationId"
            Component={ConversationRoute}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Fragment>
);
