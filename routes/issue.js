const { Router, request, response } = require("express");
const pool = require("../db/index");
const { user } = require("../db_credectials");
const router = Router();

// issue basic info (tasks)
router.get("/received/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON sender_id = uid WHERE iid = $1 ",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// issue basic info (issues)
router.get("/sent/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues LEFT JOIN users ON receiver_id = uid WHERE iid = $1 ",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// issue with comments
router.get("/:id/comments", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM comments LEFT JOIN issues ON issue_id=iid LEFT JOIN users ON c_sender_id = uid WHERE iid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

// to post an issue
router.post("/", (request, response, next) => {
  const {
    sender_id,
    i_title,
    i_description,
    i_priority,
    i_deadline,
    i_status,
    receiver_id,
  } = request.body;

  console.log(request.body);
  pool.query(
    "INSERT INTO issues (sender_id,i_title,i_description,i_priority,i_deadline,i_status,receiver_id) VALUES($1,$2,$3,$4,$5,$6,$7)",
    [
      sender_id,
      i_title,
      i_description,
      i_priority,
      i_deadline,
      i_status,
      receiver_id,
    ],
    (err, res) => {
      if (err) console.log(err);
      response.json({ sended_out: true });
    }
  );
});

// for the poster of the issue to modify the issue details.

router.put("/:id", (request, response, next) => {
  const { id } = request.params;

  const {
    i_title,
    i_description,
    i_priority,
    i_deadline,
    i_status,
    receiver_id,
  } = request.body;

  const keys = [
    "i_title",
    "i_description",
    "i_priority",
    "i_deadline",
    "i_status",
    "receiver_id",
  ];
  const fields = [];
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE issues SET ${field} =($1) WHERE iid =($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.json({ edited: true });
      }
    );
  });
});

module.exports = router;
