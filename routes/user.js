const { Router } = require("express");
const pool = require("../db/index");
const router = Router();
const { verify } = require("jsonwebtoken");

require("dotenv").config();

// user's dashboard interface, automatically show the ongoing tasks that the user had been assigned
router.get("/received/ongoing", (request, response, next) => {
  const { id, status } = request.headers;
  pool.query(
    "SELECT * FROM issues WHERE receiver_id=$1 AND i_status=$2",
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
    "SELECT * FROM issues WHERE receiver_id = $1 AND i_status = $2",
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
    "SELECT * FROM issues WHERE sender_id = $1 AND i_status = $2",
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
    "SELECT * FROM issues WHERE sender_id = $1 AND i_status = $2",
    [id, status],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

module.exports = router;
