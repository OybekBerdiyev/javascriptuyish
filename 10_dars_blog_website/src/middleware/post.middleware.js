const jwt = require("jsonwebtoken")
const config = require(process.cwd()+"/config/index")
const Io = require(process.cwd()+"/utils/io");
const readOrWrite = new Io(process.cwd()+"/database/user.json")

const verifyUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: "Invalid token" });
  
      const data = jwt.verify(token, config.key);
      req.id = data;
  
      const users = await readOrWrite.read();
      const findUser = users.find((user) => user.id == data);
  
      if (!findUser) {
        return res.status(401).json({ message: "User not found" });
      }
  
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  

module.exports = verifyUser