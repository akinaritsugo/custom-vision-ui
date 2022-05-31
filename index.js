require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

// Express settings
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource rooting.
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set middleware
app.use(express.urlencoded({ extended: true }));

// Dynamic resource rooting.
app.use("/api", (()=>{
  const router = express.Router();
  router.use("/tags", require("./routes/api/tags"));
  router.use("/images", require("./routes/api/images"));
  router.use("/iterations", require("./routes/api/iterations"));
  router.use("/predictions", require("./routes/api/predictions"));
  return router;
})());
app.use("/", (()=>{
  const router = express.Router();
  router.use("/dataset", require("./routes/dataset"));
  router.use("/trainings", require("./routes/trainings"));
  router.use("/predictions", require("./routes/predictions"));
  router.use("/", require("./routes/index"));
  return router;
})());

app.listen(process.env.PORT | 8080);