const {geturl} = require("../controllers/url.controllers");
const router = require("express").Router()

router.get('/:url',geturl);

module.exports = router