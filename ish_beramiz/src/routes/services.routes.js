const { getAllService, getOneService, Addservice, updateService, deleteService } = require("../controllers/service.controllers")
const isAuth = require("../middlewares/is-Auth.middleware")
const upload = require("../middlewares/multer")

const router = require("express").Router()

router.get("/services",getAllService)
router.get("/services/:id",getOneService)
router.post("/services",isAuth,upload.single('photo'),Addservice)
router.put("/services/:id",isAuth,upload.single('photo'),updateService)
router.delete("/services/:id",isAuth,upload.single('photo'),deleteService)

module.exports = router