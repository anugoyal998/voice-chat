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
	const socketID = socket.id
	socket.on("join room",async (roomID,user)=> {
		await roomController.addUserToRoom(roomID,user,socketID)
		const part = await roomController.getPartcipants(roomID)
		const filterData = part?.filter(e=> e.user._id !== user._id)
		socket.emit("all users",filterData)
	})  

	socket.on('sending signal',({userToSignal, callerID, signal,user})=> {
		io.to(userToSignal).emit('user joined',{signal,callerID,user})
	})

	socket.on('returning signal',({signal,callerID,user})=> {
		io.to(callerID).emit('receiving returned signal',{signal,id: socketID, user})
	})

	socket.on('user left',async ({user,roomID})=> {
		await roomController.removeUserFromRoom(user,roomID)
	})
	
});

server.listen(PORT, () => {
  console.log("listening on port 5000");
});
