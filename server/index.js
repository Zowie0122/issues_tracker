const express = require("express");
const bodyParser = require("body-parser");
const user = require("../routes/user");
const issue = require("../routes/issue");
const comment = require("../routes/comment");

const app = express();
const jsonParser = bodyParser.json();

app.use("/user", jsonParser, user);
app.use("/issue", jsonParser, issue);
app.use("/comment", jsonParser, comment);

app.use((err, req, res, next) => {
  res.json(err);
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
