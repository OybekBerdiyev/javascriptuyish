const Io = require(process.cwd()+"/utils/io");
const User = require(process.cwd()+"/models/userModel");
const History = require(process.cwd()+"/models/historyModel");
const readOrWrite = new Io(process.cwd()+"/database/user.json")
const readOrWriteHistory = new Io(process.cwd()+"/database/history.json")


const register = async(req,res)=> {
   const {name, balance} = req.body
   
   const users = await readOrWrite.read()
   const findUser = users.find((user)=> user.name === name)
   if (findUser) {
    return res.status(401).json({message: "Name Already exists"})
   }

   
   const id = (users[users.length - 1]?.id || 0) + 1;

   const newUser = new User(id, name, +balance);
   const data = users.length ? [...users, newUser] : [newUser];
   await readOrWrite.write(data);
   res.json({message: "User created"})
}
const moneyTransfer = async(req,res)=>{
  const from = req.id
  const {to, sum} = req.body
  const users = await readOrWrite.read()
  const findFrom = users.find((user)=> user.id == from)
  const findTo = users.find((user)=> user.id == to)
  if (!findTo) {
    return res.status(404).json({message: `NOT FOUND ${from} OR ${to}`})    
  }
  else if (findFrom.balance<sum) {
    return res.status(404).json({message: `${from} balance not enought`}) 
  }
  const history = await readOrWriteHistory.read()
  const newHistory = new History(from, to, +sum);
  const data = history.length ? [...history, newHistory] : [newHistory];
  await readOrWriteHistory.write(data);

  findFrom.balance -= +sum
  findTo.balance += +sum
  await readOrWrite.write(users)
  res.json({message: "Succesfully Transfer"})
}
module.exports = {
    register,
    moneyTransfer
  }