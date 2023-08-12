const {Router} = require("express");
const isAuth = require("../middlewares/is-auth.middleware");
const { getContact, checkContact } = require("../controllers/admin.controller");

const router = Router();


router.get("/admin",isAuth,getContact);
router.put("/admin/:id",isAuth,checkContact);

module.exports = router;