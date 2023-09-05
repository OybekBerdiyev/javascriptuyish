const { createjob, findjob, findOnejob, updatejob, removejob } = require("../controllers/forjob.controllers");
const router = require("express").Router()

router.post('/job',createjob);
router.get('/job',findjob);
router.get('/job/:id',findOnejob);
router.put('/job/:id',updatejob);
router.delete('/job/:id',removejob);

module.exports = router