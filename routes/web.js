const {
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controller/userController");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/login", (req, res) => {
  res.render("../view/login.ejs");
});

module.exports = router;
