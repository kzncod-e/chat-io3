if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

//import controller
const userController = require("./controllers/userController");
const roomController = require("./controllers/roomController");
const messageController = require("./controllers/messageController");
const authentication = require("./middlewares/authentication");
const upload = require("./utils/multer");
// const upload = require("../")

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api route
app.post("/register", userController.register);
app.post("/login", userController.login);

app.get("/rooms", roomController.readRoom);
app.post("/rooms", roomController.addRoom);
app.get("/rooms/:id", roomController.readRoomDetail);

app.get("/chat/:roomId", messageController.readMessage);
app.use(authentication);
app.post("/chat/:roomId", upload, messageController.createMessage);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("welcome", "haalo");

  socket.on("join:room", (roomId) => {
    socket.join(roomId);
    console.log(roomId);
  });

  socket.on("message:new", ({ roomId, message }) => {
    if (roomId && message) {
      // Emit the new message to all clients in the specified roomId
      io.to(roomId).emit("message:update", {
        from: socket.handshake.auth.username || "Anonymous",
        message,
      });
      console.log(
        `Message from ${
          socket.handshake.auth.username || "Anonymous"
        } in roomId ${roomId}:ld;fmdsl; ${message}`
      );
    } else {
      console.log("Invalid message data received:", { roomId, message });
    }
  });

  if (socket.handshake.auth) {
    console.log("username :" + socket.handshake.auth.username);
  }
  return () => {
    socket.off("message:update");
    socket.disconnect();
  };
  // socket.on("")
});

// socket.on("message:new")

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
