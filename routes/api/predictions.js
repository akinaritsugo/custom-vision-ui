const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });
const { trainer, predictor, PROJECT_ID, PREDICTION_RESOURCE_ID, PUBLISH_NAME } = require("../../lib/cvclient");

/**
 * POST: /api/predictions/
 */
router.post("/", async (req, res, next) => {
  var iterationId = req.body.id;

  try {
    await trainer.publishIteration(PROJECT_ID, iterationId, PUBLISH_NAME, PREDICTION_RESOURCE_ID);
    res.end("OK");
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE: /api/predictions/{iterationId}
 */
router.delete("/:id", async (req, res, next) => {
  var iterationId = req.params.id || "";

  try {
    await trainer.unpublishIteration(PROJECT_ID, iterationId);
    res.end("OK");
  } catch (err) {
    next(err);
  }
});

/**
 * POST: /api/predictions/{publishedName}
 */
router.post("/:name", upload.single("files"), async (req, res, next) => {
  var results;
  var publishedName = req.params.name || "";
  var filepath = req.file.path;
  var filedata = await fs.promises.readFile(filepath);

  try {
    results = await predictor.classifyImage(PROJECT_ID, publishedName, filedata);
    // res.end(results.predictions);
    res.json(results.predictions);
  } catch (err) {
    next(err);
  }

  // 一時ファイル削除
  await fs.promises.unlink(filepath);
});

module.exports = router;