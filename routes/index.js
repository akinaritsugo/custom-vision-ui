const router = require("express").Router();
const { trainer, PROJECT_ID } = require("../lib/cvclient");

router.get("/", async (req, res) => {
  var project = await trainer.getProject(PROJECT_ID) || "ERROR";
  res.render("./index.ejs", { project });
});

module.exports = router;