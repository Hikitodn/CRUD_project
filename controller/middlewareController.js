const pool = require("../config/connectDB");

function auth(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.render("../view/login.ejs");
  }
}

function authSign(req, res) {
  req.session.regenerate(function (err) {
    if (err) next(err);
    const { username, password } = req.body;

    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (error, result) => {
        if (error) throw error;
        else if (req.body.username === result.rows[0].username) {
          req.session.username = req.body.username;
          req.session.save(function (err) {
            if (err) return next(err);
            res.redirect("/");
          });
        }
      }
    );
  });
}

function logout(req, res, next) {
  req.session.username = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
}

module.exports = { auth, authSign, logout };
