const router = require("express").Router();
const { trainer, PROJECT_ID } = require("../lib/cvclient");

router.get("/", async (req, res) => {
  var iterations = await trainer.getIterations(PROJECT_ID) || [];
  res.render("./predictions.ejs", { iterations });
});

module.exports = router;