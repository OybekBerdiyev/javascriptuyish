const { createworker, findworker, findOneworker, updateworker, removeworker } = require("../controllers/forworker.controllers");
const router = require("express").Router()

router.post('/worker',createworker);
router.get('/worker',findworker);
router.get('/worker/:id',findOneworker);
router.put('/worker/:id',updateworker);
router.delete('/worker/:id',removeworker);

module.exports = router