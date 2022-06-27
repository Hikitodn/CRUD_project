const {
  getUser,
  createUser,
  editUser,
  deleteUser,
} = require("../controller/userController");
const router = require("express").Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
