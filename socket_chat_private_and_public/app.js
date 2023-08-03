const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/views");

app.get("/", (req, res) => {
    res.render("chat");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const connectedUsers = [];

io.on("connection", (socket) => {
    socket.on("name", (data) => {
        const user = { id: socket.id, name: data.name };
        connectedUsers.push(user);
        io.emit("users", { users: getConnectedUserNames() });
    });

    socket.on("all",(data)=>{
        const fromUser = connectedUsers.find((user) => user.id === socket.id);
        const {text} = data
        io.emit("allres",{user: fromUser,text})
    })

    socket.on("message", (data) => {
        const { text, to } = data;
        const fromUser = connectedUsers.find((user) => user.id === socket.id);
        const toUser = connectedUsers.find((user) => user.id === to);
        if (toUser) {
            io.to(toUser.id).emit("message", { user: fromUser, text });
        }
    });

    socket.on("disconnect", function () {
        const index = connectedUsers.findIndex((user) => user.id === socket.id);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
        io.emit("users", { users: getConnectedUserNames() });
    });
});

function getConnectedUserNames() {
    return connectedUsers.map((user) => ({ id: user.id, name: user.name }));
}

server.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
