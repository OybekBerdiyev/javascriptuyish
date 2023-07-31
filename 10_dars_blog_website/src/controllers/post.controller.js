const {v4: uuid} = require("uuid")
const path = require("path")
const Io = require(process.cwd() + "/utils/io");
const Post = require(process.cwd() + "/src/models/postModel");
const View = require(process.cwd() + "/src/models/viewModel");
const readOrWrite = new Io(process.cwd() + "/database/posts.json");
const readOrWriteview = new Io(process.cwd() + "/database/views.json");

const createPost = async (req, res) => {
  const owner = req.id;
  const image = req.files?.photo;
  const { title, text } = req.body;
  const posts = await readOrWrite.read();
  const id = (posts[posts.length - 1]?.id || 0) + 1;
  let photo 
  if(image){
  const mimetype = path.extname(image.name);
  photo = uuid() + mimetype;
  image.mv(process.cwd() + "/uploads/" + photo);
  }

  const view = 0
  const newPost = new Post(id, title, text, photo || null, view, owner);
  const data = posts.length ? [...posts, newPost] : [newPost];
  await readOrWrite.write(data);
  res.json({ message: "Post Created", id: newPost.id });
};

const getPost = async(req,res)=> {
    const posts = await readOrWrite.read(); 
    res.json({posts})  
}

const getOnePost = async(req, res)=>{
    const {id} = req.params
    const posts = await readOrWrite.read(); 
    const findId = posts.find((post)=> post.id == id)
    if (!findId) return res.status(401).json({message: "Post not Found"})
    const views = await readOrWriteview.read(); 
    const owner = req.id;
    const findUser = views.find((a)=> a.uId == owner)
    const findPost = views.find((a)=> a.pId = id)
    if (!findUser && !findPost) {
      const newView = new View(owner,id);
      const data = views.length ? [...views, newView] : [newView];
      await readOrWriteview.write(data);
      findId.view+=1  
      await readOrWrite.write(posts)
      res.json({data: findId})
    }
    res.json({data: findId})

}

module.exports = {
  createPost,
  getPost,
  getOnePost
};
