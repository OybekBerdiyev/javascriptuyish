const Io = require("../utils/Io");
const path = require("path");
const Posts = new Io(process.cwd() + "/database/posts.json");
const Channels = new Io(process.cwd() + "/database/channels.json");

const Post = require("../models/Post");
const {get} = require("../utils/get");


const createPost = async (req, res) => {
  const {title, description, channelId} = req.body;
  const photo = req.files?.photo;

  const posts = await get(Posts);
  const channels = await get(Channels);

  const findChannel = channels.find(channel => channel.id==channelId)

  if (!findChannel) {
    return res.status(404).json({message: "Not fount channel"})
  }

  let imageName 
  if (photo?.name) {
    const mimetype = path.extname(photo.name);
     imageName = photo.md5 + "_" + Date.now() + mimetype;
    photo.mv(`${process.cwd()}/uploads/${imageName}`);
  }

  const id = (posts[posts.length - 1]?.id || 0) + 1;
  const views = 0

  const newPost = new Post(id, imageName || null, title, description, views, channelId);

  const result = posts.length ? [...posts, newPost] : [newPost];

  await Posts.write(result);
  res.status.json({message:"Created post"})

};

const getAllPosts = async (req, res) => {
  const channels = await get(Channels);
  const potos = await get(Posts);

  const find = potos.map((potos) => {
    potos.channel = channels.find((ch) => ch.id == potos.channel);
    return potos;
  });
  res.json({potos: find});
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const posts = await get(Posts);
  const channels = await get(Channels);
  const findPost = posts.find((post) => post.id == id);
  
  if (!findPost) {
    return res.status(404).json({ message: `${id} - NOT FOUND THIS ID` });
  }
  
  findPost.views += 1;
  await Posts.write(posts);
  
  const findChannel = channels.find((ch) => ch.id == findPost.channel);
  findPost.channel = findChannel;
  
  res.json({ post: findPost });
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
};
