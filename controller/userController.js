const pool = require("../config/connectDB");

function getUser(req, res) {
  res.setHeader("Content-Type", "text/html"); //or text/plain
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
    if (error) throw error;
    res.status(200).render("../view/home.ejs", { data: result.rows });
  });
}

function createUser(req, res) {
  const { username, password } = req.body;
  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.redirect("/");
    }
  );
}

function editUser(req, res) {
  const id = req.params.body;
  const { username, password } = req.body;
  pool.query(
    "UPDATE users SET username = $1, password = $2 WHERE id = $3",
    [username, password, id],
    (err, results) => {
      if (err) throw err;
    }
  );
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.redirect("/");
  });
}

module.exports = { getUser, createUser, editUser, deleteUser };
