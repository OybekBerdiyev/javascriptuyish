const Joi = require("joi");

const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt");
const {knex} =  require("../utils/knex")



const register = async(req,res)=> {
  const {name,email,password} = req.body
  try {
    const schema = Joi.object({
            name: Joi.string().max(64).required(),
            email: Joi.string().max(64).required(),
            password: Joi.string().required(),
          });
          
          const validation = schema.validate({name,email,password});
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
          }
        const user = await knex('users').select('*').where({email}).first()
        
        if(user) return res.status(400).json({message: "email Already exists"})
        const HashedPass = await bcrypt.hash(password, 12);
        const [users] = await knex("users")
        .insert({name,email, password: HashedPass})
        .returning("user_id");

    const token = jwt.sign({id: users.user_id});
    res.status(201).json({message: "Registered",token: token});
    } catch (error) {
      console.log(error.message);
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await knex('users').select('*').where({ email, isactive: true }).first();
      
      if (!user) {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
  
      const compare = await bcrypt.compare(password, user.password);
  
      if (!compare) {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
  
      const token = jwt.sign({id: user.user_id});
  
      res.status(201).json({ message: "Logged in", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = {
  login,
  register
};