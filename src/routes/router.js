const { apiCheck } = require("../controller/user.controller");
const router = require("express").Router();

router.get("/api-check", apiCheck);

module.exports = router;
