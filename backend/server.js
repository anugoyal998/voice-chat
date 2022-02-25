require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const Router = require("./routes");
const cors = require("cors");
const dbConnect = require("./database");
const cookieParser = require("cookie-parser");
const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: process.env.FRONTEDN_URL,
    methods: ["GET", "POST"],
  },
});
dbConnect();

app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());
app.use(cors({ origin: [process.env.FRONTEDN_URL], credentials: true }));
app.use("/", Router);
app.use("/storage", express.static("storage"));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "someting went wrong" });
});
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});


const roomController = require("./controllers/rooms-controller")


io.on("connection", (socket) => {
	socket.on("join room",async data=> {
		socket.join(data?.roomID)
		await roomController.addUserToRoom(data?.roomID,data?.user,socket?.id)
		const partcipants = await roomController.getPartcipants(data?.roomID)
		const filterData = partcipants?.filter(e=> e?.user?._id !== data?.user?._id)
		io.to(data?.roomID).emit("all users",filterData)
	})

	socket.on("sending signal",payload=> {
		io.to(payload?.userToSignal).emit("user joined",{signal: payload?.signal, callerID: payload?.callerID, data: payload?.data})
	})

	socket.on("returning signal",payload=> {
		io.to(payload?.callerID).emit('receiving returned signal',{signal: payload?.signal, id: socket?.id, data: payload?.data})
	})
});

server.listen(PORT, () => {
  console.log("listening on port 5000");
});
