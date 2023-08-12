const {Router} = require("express");
const contactUs = require("../controllers/contactus.controller");

const router = Router();

router.post("/contact",contactUs);

module.exports = router;