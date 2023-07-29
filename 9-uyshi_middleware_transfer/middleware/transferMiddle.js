const Io = require("../utils/io")
const readOrWrite = new Io("./database/user.json")

const middleUser = async(req, res, next) => {
    const fromId = req.headers.authorization;
    const users = await readOrWrite.read()
    const findId = users.find((user)=> user.id == fromId)
    if (findId) {
        req.id = fromId
        next()
    }else{
        res.status(404).json({message: "From id not found"})
    }
}

module.exports = middleUser