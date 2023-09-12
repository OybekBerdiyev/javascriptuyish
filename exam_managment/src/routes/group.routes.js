const router = require("express").Router();
const isAuth = require("../middlewares/is-auth.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");
const { createGroup, getAllGroup, getOneGroup, updateGroup, deleteGroup } = require("../controllers/groupname.controller");

router.post("/group",isAuth,isAdmin,createGroup);
router.get("/group",isAuth,isAdmin,getAllGroup);
router.get("/group/:id",isAuth,isAdmin,getOneGroup);
router.put("/group/:id",isAuth,isAdmin,updateGroup);
router.delete("/group/:id",isAuth,isAdmin,deleteGroup);

module.exports = router;