const {Router} = require("express");
const fileUpload = require("../middlewares/file-upload.middleware");
const isAuth = require("../middlewares/is-auth.middleware");
const { addFeedback, allFeedback, onefeedback, deleteFeedback, updateFeedback } = require("../controllers/feedback.controller");

const router = Router();

router.post("/feedback",fileUpload,addFeedback);
router.get("/feedback",allFeedback);
router.get("/feedback/:id",onefeedback);
router.delete("/feedback/:id",isAuth,deleteFeedback);
router.put("/feedback/:id",fileUpload,updateFeedback);

module.exports = router;