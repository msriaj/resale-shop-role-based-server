const {
  addUser,
  googleUser,
  checkRole,
  showUser,
  deleteUser,
} = require("../controller/user.controller");
const router = require("express").Router();

router.get("/check-role", checkRole);
router.post("/add-user", addUser);
router.get("/all-user", showUser);
router.get("/delete-user/:id", deleteUser);
router.post("/google-user", googleUser);

module.exports = router;
