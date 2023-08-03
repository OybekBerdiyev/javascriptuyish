const Io = require("../utils/io");
const Videos = new Io(process.cwd()+"/src/database/videos.json");
const Video = require("../models/video.model")

const createvideo = async(req, res)=>{
    const video = req.videoName;
    const userId = req.user.id
    const {name,description} = req.body

    const videos = await Videos.read()
    const id = (videos[videos.length - 1]?.id || 0) + 1;

    const newVideo = new Video(id,name,description,video,userId);

    const data = videos.length ? [...videos, newVideo] : [newVideo];

    await Videos.write(data);
    res.redirect("http://localhost:4000/")
  
    
}

module.exports = createvideo