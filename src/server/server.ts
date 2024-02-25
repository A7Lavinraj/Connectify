import express from "express";
import cors from "cors";
import http from "http";
import getConversationController from "./controllers/getConversationController";
import getMessages from "./controllers/getMessages";
import getUsersController from "./controllers/getUsersController";
import addConversationController from "./controllers/addConversationController";
import authValidateController from "./controllers/authValidateController";
import loginUserController from "./controllers/loginUserController";
import registerUserController from "./controllers/registerUserController";
import sendMessageController from "./controllers/sendMessageController";
import removeConversationController from "./controllers/removeConversationController";
import { Socket, Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());

io.on("connection", (socket: Socket) => {
  socket.emit(`A socket with id: ${socket.id} is connected`);

  socket.on("active", (conversationId: string) => {
    socket.join(conversationId);
  });
  socket.on(
    "send-message",
    ({
      conversationId,
      content
    }: {
      conversationId: string;
      content: string;
    }) => {
      socket.to(conversationId).emit("receive-message", content);
    }
  );
});

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}

app.get("/api/conversation/:email", getConversationController);
app.get("/api/messages/:conversationId", getMessages);
app.get("/api/users/:email", getUsersController);
app.post("/api/conversation", addConversationController);
app.post("/api/auth/validate", authValidateController);
app.post("/api/auth/login", loginUserController);
app.post("/api/auth/register", registerUserController);
app.post("/api/messages", sendMessageController);
app.delete("/api/conversation/:conversationId", removeConversationController);

if (process.env.NODE_ENV === "production") {
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: "public" });
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on PORT:${PORT}`);
});
