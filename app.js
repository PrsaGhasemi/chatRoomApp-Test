const http = require('http');

const express = require('express');
const { Server } = require('socket.io');

const app = express()
const server = http.createServer(app)
const io = new Server(server) 

//StaticFiles
app.use(express.static("public"));

const PORT = process.env.PORT || 3000


server.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
})


//WebSocket Creator
users = {}
io.on("connection" , (socket) => {
    //console.log(socket);
//Listening
    socket.on("login", (nickname) => {
        console.log(`${nickname} connected`);
        users[socket.id] = nickname;
        io.sockets.emit("online", users)
    })
    socket.on("disconnect" , () => {
        console.log(`user is disconnected`);
        delete users[socket.id]
        io.sockets.emit("online", users)
    });
    socket.on("chatProcces" , (data) => {
         io.sockets.emit("chatProcces" , data)
    });
    socket.on("typing", (data) => {
        socket.broadcast.emit("typing" ,data)})
})
