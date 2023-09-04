const {generateurl} = require("../controllers/url.controllers");
const cors = require("cors")
const router = require("express").Router()

router.post('/generate',cors(),generateurl);

module.exports = router