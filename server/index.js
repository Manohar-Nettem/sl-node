const express = require("express");
const app = express();
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./bin/server");
require("./database/connection");

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`:: server started at ${port} ::`);
});

app.get("/", (req, res) => {
  res.send("Hello  project");
});
