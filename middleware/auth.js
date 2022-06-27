const router = require("express").Router();
const {
  auth,
  authSign,
  logout,
} = require("../controller/middlewareController");

router.get("/*", auth);
router.post("/login", authSign);
router.get("/logout", logout);

module.exports = router;
