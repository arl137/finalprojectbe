const { index, show } = require('../controller/movies.controller');

const router = require('express').Router();

router.get("/", index);
router.get("/:id", show);

module.exports = router;

