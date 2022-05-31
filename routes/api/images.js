const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });
const axios = require("axios");
const { trainer, PROJECT_ID } = require("../../lib/cvclient");

router.post("/", upload.single("file1"), async (req, res) => {
  var tagId = req.body.tag1;
  var filepath = req.file.path;

  // 画像登録
  await trainer.createImagesFromData(
    PROJECT_ID,
    await fs.promises.readFile(filepath),
    { tagIds: [tagId] }
  );

  // 一時ファイル削除
  await fs.promises.unlink(filepath);

  res.redirect("/dataset");
});

// router.post("/delete", async (req, res, next) => {
//   var imageIds = [];
//   var body = req.body;

//   for (let item in req.body) {
//     imageIds[imageIds.length] = item;
//   }

//   try {
//     // var results = await trainer.deleteImageRegions(PROJECT_ID, imageIds);
//     await trainer.deleteImages(PROJECT_ID);
//     res.redirect("/dataset");
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;