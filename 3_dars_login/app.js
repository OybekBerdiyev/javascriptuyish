const http = require("http");
const bodyParser = require("./utils/bodyParser");
const Io = require("./utils/io");
const Users = new Io("./database/users.json");
const User = require("./models/users");
const { json } = require("stream/consumers");

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/auth/login") {
    req.body = await bodyParser(req);
    const { username, password } = req.body;


    const users = await Users.read();
    const findUser = users.find((user) => user.username === username);
    const findPass = users.find((user) => user.password === password);
    if (findUser && findPass) {
        res.writeHead(201,{'Content-type':'application/json'})
        res.end(JSON.stringify({message:"Kirildi"}))        
    }else{
        res.writeHead(201,{'Content-type':'application/json'})
        res.end(JSON.stringify({message:"Username yoki parol noto'g'ri"}))        
    }


  } else if (req.method === "POST" && req.url === "/auth/register") {
    req.body = await bodyParser(req);
    const { username, password } = req.body;


    const users = await Users.read();
    const findUser = users.find((user) => user.username === username);

    if (findUser) {
      res.statusCode = 403;
      res.end("Username already exists");
    } else {
      const id = (users[users.length - 1]?.id || 0) + 1;
      const newUser = new User(id, username, password);
      
      const result = users.length ? [users,newUser] : [newUser]
      await Users.write(result)

      res.writeHead(201,{'Content-type':'application/json'})
      res.end(JSON.stringify({message:"success"}))
    }
  }
}).listen(3000, "localhost", () => {
  console.log("Server ulandi");
});
