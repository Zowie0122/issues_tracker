const { Router, request, response } = require("express");
const pool = require("../db/index");
const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM issues", [], (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
});

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
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM issues LEFT JOIN comments ON issues.iid = comments.issue_id WHERE iid = $1",
    [id],
    (err, res) => {
      if (err) return next(err);
      response.json(res.rows);
    }
  );
});

router.put("/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
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

  console.log(field);

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE issues SET ${field} =($1) WHERE iid =($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);
        if (index === fields.length - 1) response.json(res.rows);
      }
    );
  });
});

module.exports = router;
