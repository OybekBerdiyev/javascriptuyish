const jwt = require("jsonwebtoken")
const config = require(process.cwd()+"/config/index")

const Io = require(process.cwd()+"/utils/io");
const readOrWrite = new Io(process.cwd()+"/database/user.json")
const User = require("../models/userModel");
const bcrypt = require("bcrypt")


const register = async(req,res)=> {
   const {name, username, password} = req.body
   const users = await readOrWrite.read()
   const findUser = users.find((user)=> user.username === username)
   if (findUser) {
    return res.status(401).json({message: "Username Already exists"})
   }
   const hashedPass = await bcrypt.hash(password, 12);
   const id = (users[users.length - 1]?.id || 0) + 1;
   const newUser = new User(id,name, username, hashedPass);
   const data = users.length ? [...users, newUser] : [newUser];
    await readOrWrite.write(data);
   const token = jwt.sign(newUser.id,config.key)
   res.json({message: "User created" , id: token})
}

const login = async(req,res) => {
    const {username, password} = req.body
   
    const users = await readOrWrite.read()
    const findUser = users.find((user)=> user.username === username)
    if (!findUser) {
      return res.status(401).json({message: "Username or password incorrect"})
    }
    const compaire = await bcrypt.compare(password, findUser.password)
    if(!compaire) return res.status(401).json({message: "Username or password incorrect"})
    const token = jwt.sign(findUser.id,config.key)
    res.json({message: "You are logged in", token:token})
}

module.exports = {
    register,
    login
}