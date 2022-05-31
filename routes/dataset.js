const router = require("express").Router();
const { trainer, PROJECT_ID } = require("../lib/cvclient");

router.get("/", async (req, res) => {
  var tags = await trainer.getTags(PROJECT_ID) || [];
  var images = await trainer.getImages(PROJECT_ID) || [];
  res.render("./dataset.ejs", { tags, images });
});

module.exports = router;