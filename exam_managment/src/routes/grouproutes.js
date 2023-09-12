const router = require("express").Router();
const isAuth = require("../middlewares/is-auth.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");
const {createGroup,updateGroup,deleteGroup} = require("../controllers/group.controller")

router.post("/add/student",isAuth,isAdmin,createGroup);
router.put("/add/group/:id",isAuth,isAdmin,updateGroup);
router.delete("/add/group/:id",isAuth,isAdmin,deleteGroup);

module.exports = router;