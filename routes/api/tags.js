const path = require("path");
const router = require("express").Router();
const { trainer, PROJECT_ID } = require("../../lib/cvclient");

/**
 * POST: /api/tags
 */
router.post("/", async (req, res) => {
  var tag;
  var tagName = req.body.tag1;
  console.log(`Add tag: "${tagName}"`);
  
  if (tagName) {
    tag = await trainer.createTag(PROJECT_ID, tagName);
  }

  res.redirect("/dataset");
});

/**
 * POST /api/tags/delete
 */
router.post("/delete", async (req, res) => {
  var tagId = req.body.tagId;
  var tagName = req.body.tagName;
  console.log(`Delete tag: "${tagName}"`);
  await trainer.deleteTag(PROJECT_ID, tagId);
  res.redirect("/dataset");
});

module.exports = router;