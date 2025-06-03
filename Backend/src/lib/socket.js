import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
       // methods: ["GET", "POST"],
      //  credentials: true,
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]  || null; // Return the socket ID for the given userId or null if not found
}
// used to store online users
const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId; 
    if (userId) {
        userSocketMap[userId] = socket.id; 
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit online users to all clients

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId]; // Remove user from online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users to all clients
    });

    // You can add more event listeners here
});



export {io, app, server};