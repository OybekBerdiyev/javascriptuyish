const { getAllworkers, updateWorker, getOneWorker, deleteWorker } = require("../controllers/workers.controller")
const isAuth = require("../middlewares/is-Auth")

const router = require("express").Router()

router.get("/workers",isAuth,getAllworkers)
router.get("/workers/:id",isAuth,getOneWorker)
router.put("/workers/:id",isAuth,updateWorker)
router.delete("/workers/:id",isAuth,deleteWorker)

module.exports = router