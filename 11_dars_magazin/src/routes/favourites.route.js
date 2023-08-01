const {Router} = require("express");

const isAuth = require("../middlewares/is-auth.middleware");
const { addToFavorites, getToFavourites, removeToFavourites } = require("../controllers/favourites.controller");


const router = Router();

router.post("/favourites/:id", isAuth, addToFavorites);
router.get("/favourites",isAuth, getToFavourites);
router.delete("/favourites/:id", isAuth, removeToFavourites);

module.exports = router;
