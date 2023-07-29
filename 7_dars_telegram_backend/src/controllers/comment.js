const Io = require("../utils/Io");
const path = require("path");
const Posts = new Io(process.cwd() + "/database/posts.json");
const Comments = new Io(process.cwd() + "/database/comments.json");

const Comment = require("../models/Comment");
const {get} = require("../utils/get");
const Post = require("../models/Comment");


const createComment = async (req, res) => {
  const {text, author, post} = req.body;
  const posts = await get(Posts)
  const comments = await get(Comments)
  const findPosts = posts.find(a => a.id==post)
  if (!findPosts) {
    return res.status(404).json({message: "Not fount POST"})
  }

  const id = (comments[comments.length - 1]?.id || 0) + 1;
  const newComment = new Comment(id, text, author, post)
  const result = comments.length ? [...comments, newComment] : [newComment];
  await Comments.write(result);

  res.json({message:"Created COMMENT"})

};

const getAllComments = async (req, res) => {
  const comments = await get(Comments);
  const post = await get(Posts);

  const find = comments.map((commentlar) => {
    commentlar.post = post.find((ch) => ch.id == commentlar.post);
    return commentlar;
  });
  res.json({commentlar: find});
};


const getOneComment = async (req, res) => {
  const { id } = req.params;
  const comments = await get(Comments);
  const posts = await get(Posts);


  const findComment = comments.find((a) => a.id == id);
  if (!findComment) {
    return res.status(404).json({ message: `${id} - NOT FOUND THIS ID` });
  }
  const findPost = posts.find((ch) => ch.id == findComment.post);
  findComment.post = findPost;
  res.json({ Commentingiz: findComment});
  
};

const deleteOneComment = async (req, res) => {
  const {id} = req.params
  const comments = await get(Comments)

  const findId = comments.find((a)=> a.id == id)

  if (!findId){
      return res.status(404).json({message: '404 NOT FOUND POST'})
  }

  const filterID = comments.filter((a)=> a.id != id)
  await Comments.write(filterID)
  res.json({message: "Comment has been deleted"})
};

module.exports = {
  createComment,
  getAllComments,
  getOneComment,
  deleteOneComment,
};