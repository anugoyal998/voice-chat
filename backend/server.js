require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const Router = require("./routes");
const cors = require("cors");
const dbConnect = require("./database");
const cookieParser = require("cookie-parser");
const server = require("http").createServer(app);
const ACTIONS = require("./actions");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEDN_URL,
    method: ["GET", "POST"],
  },
});
dbConnect();

app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());
app.use(cors({ origin: [process.env.FRONTEDN_URL], credentials: true }));
app.use("/", Router);
app.use("/storage", express.static("storage"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// sockets
const socketUserMapping = {};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {});
    });
    socket.emit(ACTIONS.ADD_PEER, {});
    socket.join(roomId);
  });
});

server.listen(PORT, () => {
  console.log("listening on port 5000");
});
