const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./auth");
const user = require("../routes/user");
const issue = require("../routes/issue");
const comment = require("../routes/comment");
const admin = require("../routes/admin");
const login = require("../routes/login");
const test = require("../routes/test");
const cors = require("cors");

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

app.use("/user", [jsonParser, auth], user);
app.use("/issue", [jsonParser, auth], issue);
app.use("/comment", [jsonParser, auth], comment);
app.use("/admin", [jsonParser], admin);
app.use("/login", [jsonParser], login);
app.use("/test", jsonParser, test);

const port = 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
