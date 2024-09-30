const {
  addBookmark,
  deleteBookmark,
  myBookmarks,
} = require("../controllers/bookmarks.controller");
const getMovieIdUser = require("../helper/getmovieuser");

const router = require("express").Router();

router.use(getMovieIdUser);
router.post("/bookmark/:id", addBookmark);
router.delete("/bookmark/delete/:id", deleteBookmark);
router.get("/mybookmark", myBookmarks);

module.exports = router;
