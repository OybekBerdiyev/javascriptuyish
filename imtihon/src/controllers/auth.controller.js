const Joi = require("joi");
const cookie = require("cookie-parser")

const Io = require("../utils/Io");
const jwt = require("../utils/jwt");
const Users = new Io("./database/admins.json");


const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const schema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().min(6).required(),
    });

    const {error} = schema.validate({username,password});
    if (error) return res.status(400).json({message: error.message});


    const users = await Users.read();

    const user = users.find((user) => user.username === username);

    if (!user) return res.status(403).json({message: "Username or Password incorrect"});

    if (user.password!= password) return res.status(403).json({message: "Username or Password incorrect"});

    const token = jwt.sign({id: user.id});

    res.status(201).json({message: "Logged in",token: token});

  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};


module.exports = {
  login,
};
