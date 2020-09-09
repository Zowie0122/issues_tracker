const { Router } = require("express");
const pool = require("../db/index");
const router = Router();

require("dotenv").config();

// user's dashboard interface, automatically show the ongoing tasks that the user had been assigned
router.get("/received/ongoing", (request, response, next) => {
  const { id, status } = request.headers;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON sender_id = uid WHERE receiver_id=$1 AND i_status=$2",
    [id, status],
    (err, res) => {
      if (err) {
        response.status(400).json({ message: err });
      } else {
        response.status(200).json(res.rows);
      }
    }
  );
});

// show the tasks that the user had solved
router.get("/received/solved", (request, response, next) => {
  const { id, status } = request.headers;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON sender_id = uid WHERE receiver_id = $1 AND i_status = $2",
    [id, status],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// for user to track the ongoing issues that the user requested
router.get("/requested/ongoing", (request, response, next) => {
  const { id, status } = request.headers;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON receiver_id = uid WHERE sender_id = $1 AND i_status = $2",
    [id, status],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// for user to track the solved issues that the user requested
router.get("/requested/solved", (request, response, next) => {
  const { id, status } = request.headers;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON receiver_id = uid WHERE sender_id = $1 AND i_status = $2",
    [id, status],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/", (request, response, next) => {
  pool.query(
    "SELECT * FROM users LEFT JOIN departments ON department_id = did",
    [],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("SELECT * FROM users WHERE uid = $1", [id], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

router.put("/:id/password", (request, response, next) => {
  const { id } = request.params;
  const { new_password } = request.body;
  console.log(id, new_password);
  pool.query(
    "UPDATE users SET password = $2 WHERE uid = $1",
    [id, new_password],
    (err, res) => {
      if (err) return next(err);
      response.json({ updated_password: true });
    }
  );
});

module.exports = router;
