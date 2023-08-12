const {Router} = require("express");
const { allService, oneService, addService, deleteService, updateService } = require("../controllers/services.controllers");
const fileUpload = require("../middlewares/file-upload.middleware");
const isAuth = require("../middlewares/is-auth.middleware");

const router = Router();

router.get("/services",allService);
router.get("/services/:id",oneService);
router.post("/services",isAuth,fileUpload,addService);
router.delete("/services/:id",isAuth,deleteService);
router.put("/services/:id",isAuth,fileUpload,updateService);

module.exports = router;
