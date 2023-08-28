const router = require("express").Router()
const isAuth = require("../middlewares/isAuth")
const { AddCollab, deleteCollab } = require("../controllers/collab.controller")


router.post("/company/collab/:company_id/:collab_id",isAuth,AddCollab)
router.delete("/company/collab/:id/:company_id/:collab_id",isAuth,deleteCollab)

module.exports = router