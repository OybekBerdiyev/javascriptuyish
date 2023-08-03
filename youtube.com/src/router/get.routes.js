const { home, login, register, createvideo, getVideo } = require("./home.routes")

const router = require("express").Router()

router.get("/",home)
router.get("/login",login)
router.get("/register",register)
router.get("/createvideo",createvideo)
router.get("/videos/:id",getVideo)

module.exports = router
