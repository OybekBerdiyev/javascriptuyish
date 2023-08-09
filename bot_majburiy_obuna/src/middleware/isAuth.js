const Io = require("../utils/io")
const Users = new Io("./database/users.json")
const User = require("../models/user.model")

const isChecked = async(ctx,next)=>{
    const users = await Users.read()
    telegramId = ctx.from.id
    firstname = ctx.from.first_name
    const findUser = users.find((user)=> user.userId==telegramId)
    if(!findUser){
        const newUser = new User(telegramId,firstname)
        const data = users.length ? [...users, newUser]: [newUser]
        await Users.write(data)
    }else if(!findUser.status){
        findUser.status = true
        await Users.write(users)
    }
    next()
}

module.exports = {
    isChecked,
}