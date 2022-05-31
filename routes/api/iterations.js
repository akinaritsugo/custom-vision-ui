const router = require("express").Router();
const { trainer, PROJECT_ID, PREDICTION_RESOURCE_ID, PUBLISH_NAME } = require("../../lib/cvclient");

router.get("/", async (req, res) => {
  var iterations;
  iterations = await trainer.getIterations(PROJECT_ID);
  res.end(iterations);
});

/**
 * POST: /api/iterations
 */
router.post("/", async (req, res, next) => {
  var iteration;

  try {
    iteration = await trainer.trainProject(PROJECT_ID);
    res.end(iteration);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE: /api/iterations/{id}
 */
router.delete("/:id", async (req, res, next) => {
  var iterationId = req.params.id || "";
  if (!iterationId) {
    res.status(400);
    next();
  }

  try {
    await trainer.deleteIteration(PROJECT_ID, iterationId);
    res.end("OK");
  } catch (err) {
    next(err);
  }
});

/**
 * GET: /api/iterations/{id}/status
 */
router.get("/:id/status", async (req, res) => {
  var iterationId = req.params.id || "";
  var iteration;

  iteration = await trainer.getIteration(PROJECT_ID, iterationId);

  res.end(iteration.status);
});

module.exports = router;