const router = require("express").Router()
const { createPromo, getAllpromo, getOnepromo, updatepromo, deletepromo } = require("../controllers/promo.controller")
const isAuth = require("../middlewares/isAuth")

router.get("/promo",isAuth,getAllpromo)
router.post("/promo",isAuth,createPromo)
router.get("/promo/:id",isAuth,getOnepromo)
router.put("/promo/:id",isAuth,updatepromo)
router.delete("/promo/:id",isAuth,deletepromo)

module.exports = router