import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { getOrder } from "./helper.js";

const PORT = 5000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send("Hello.........")
})

io.on('connection', async (socket) => {
    console.log("User connected", socket.id);

    const getOrderData = await getOrder();
    console.log("this order data", getOrderData);
    socket.emit("getOrders", getOrderData);

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

