const bcrypt = require("bcrypt")
const Joi = require("joi");

const jwt = require("../utils/jwt");
const { fetchOne } = require("../utils/pg");

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const worker = await fetchOne("SELECT * FROM workers WHERE email = $1 and isactive=true", email);
      
      if (!worker) {
        return res.status(403).json({ message: "Email or password incorrect" });
      }
  
      const compare = await bcrypt.compare(password, worker.password);
  
      if (!compare) {
        return res.status(403).json({ message: "Incorrect password" });
      }
  
      const token = jwt.sign({id: worker.worker_id});
  
      res.status(201).json({ message: "Logged in", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

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
        const worker = await fetchOne("select * from workers where email=$1",email)
        if(worker) return res.status(400).json({message: "email Already exists"})
        const HashedPass = await bcrypt.hash(password, 12);
        const data = await fetchOne(
            "INSERT INTO workers (fullname,email,password) VALUES ($1, $2, $3) RETURNING *",
            name,email,HashedPass
        );

    const token = jwt.sign({id: data.worker_id});
    res.status(201).json({message: "Registered",token: token});
    } catch (error) {
      console.log(error.message);
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}

module.exports = {
  login,
  register
};