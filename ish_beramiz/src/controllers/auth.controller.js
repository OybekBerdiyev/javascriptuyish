const bcrypt = require("bcrypt")
const Joi = require("joi");

const jwt = require("../utils/jwt");
const { fetchOne, fetchAll } = require("../utils/pg");

const login = async (req, res) => {
    try {
      const { email, passwordd } = req.body;
  
      const [user] = await fetchOne("SELECT * FROM users WHERE email = $1", email);

      if (!user) {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
  
      const compare = await bcrypt.compare(passwordd, user.password);
  
      if (!compare) {
        return res.status(403).json({ message: "Incorrect password" });
      }
  
      const token = jwt.sign({ id: user.users_id }, "yourSecretKeyHere", { expiresIn: "1h" });
  
      res.status(201).json({ message: "Logged in", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

const register = async(req,res)=> {
    const {name,email,password,wallet} = req.body
    try {
        const schema = Joi.object({
            name: Joi.string().max(64).required(),
            email: Joi.string().max(64).required(),
            password: Joi.string().required(),
            wallet: Joi.number().required()
        });

        const validation = schema.validate({name,email,password,wallet });
        if (validation.error) {
           return res.status(404).json({message:validation.error.details[0].message});
        }
        const user = await fetchOne("select * from users where email=$1",email)
        if(user.length != 0) return res.status(400).json({message: "email Already exists"})
        const HashedPass = await bcrypt.hash(password, 12);
        const data = await fetchOne(
            "INSERT INTO users (name,email,password,wallet) VALUES ($1, $2, $3, $4) RETURNING *",
            name,email,HashedPass,wallet
        );

    const token = jwt.sign({id: data.users_id});
    res.status(201).json({message: "Registered",token: token});
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}

module.exports = {
  login,
  register
};