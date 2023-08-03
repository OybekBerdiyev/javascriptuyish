const bcrypt = require("bcrypt");
const Joi = require("joi");

const Io = require("../utils/io");
const Users = new Io(process.cwd()+"/src/database/users.json");
const User = require("../models/User.model");
const jwt = require("../utils/jwt");

const cookie = require("cookie-parser")


const userlogin = async (req, res) => {
  try {
    const {email, password} = req.body;

    const emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;

    const schema = Joi.object({
      email: Joi.string().regex(emailRegex).min(10).max(30).required(),
      password: Joi.string().min(6).required(),
    });

    const {error} = schema.validate({email,password});

    if (error) return res.redirect("http://localhost:4000/login");
    const users = await Users.read();    

    const user = users.find((user) => user.email === email);

    if (!user) return res.redirect("http://localhost:4000/login");

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return res.redirect("login");

    const token = jwt.sign({id: user.id});

    res.cookie("token",token)
    res.redirect("http://localhost:4000")
  } catch (error) {
  
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const userregister = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    const {imageName} = req;

    const emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;


    const schema = Joi.object({
      firstName: Joi.string().min(3).max(32).required(),
      lastName: Joi.string().min(3).max(32).required(),
      email: Joi.string().regex(emailRegex).min(10).max(30).required(),
      password: Joi.string().min(6).required(),
    });

    const {error} = schema.validate({
      firstName,
      lastName,
      email,
      password,
    });

    if (error) return res.redirect("http://localhost:4000/register");
    
    const users = await Users.read();

    const user = users.find((user) => user.email === email);

    if (user)
      return res.redirect("http://localhost:4000/register");

    const id = (users[users.length - 1]?.id || 0) + 1;
    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User(id, firstName, lastName, email, hashedPass,imageName);

    const data = users.length ? [...users, newUser] : [newUser];

    await Users.write(data);

    const token = jwt.sign({id: newUser.id});
    res.cookie("token",token)
    res.redirect("http://localhost:4000");
    // res.status(201).json({message: "Success", data: token});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
    console.log(error.message);
  }
};

module.exports = {
  userlogin,
  userregister,
};
