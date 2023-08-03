const Io = require("../utils/io");
const Users = new Io(process.cwd()+"/src/database/users.json");
const Videos = new Io(process.cwd()+"/src/database/videos.json")

const home = async(req,res)=>{
    const users = await Users.read()
        res.render("home",{
            users
        })
    }
    
const getVideo = async(req,res)=>{
        const videos = await Videos.read()
        const {id} = req.params;
        const video = videos.filter((video) => video.owner == id);

    res.render("videos",{
           video
    })
}

const login = (req, res)=>{
    res.render("login")
}
const register = (req, res)=>{
    res.render("register")
}
const createvideo = (req, res)=>{
    res.render("addVideo")
}

module.exports = {
    home,
    login,
    register,
    createvideo,
    getVideo
}

