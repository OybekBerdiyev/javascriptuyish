const { createPost, getPost, getOnePost } = require("../controllers/post.controller")
const verifyUser = require("../middleware/post.middleware")

const router = require("express").Router()


router.post("/post",verifyUser,createPost)
router.get("/post",verifyUser,getPost)
router.get("/post/:id",verifyUser,getOnePost)


module.exports = router