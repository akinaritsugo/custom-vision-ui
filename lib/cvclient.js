const TRAINING_KEY = process.env.TRAINING_KEY;
const TRAINING_ENDPOINT = process.env.TRAINING_ENDPOINT;
const PROJECT_ID = process.env.PROJECT_ID;
const PREDICTION_KEY =  process.env.PREDICTION_KEY;
const PREDICTION_RESOURCE_ID = process.env.PREDICTION_RESOURCE_ID;
const PREDICTION_ENDPOINT = process.env.PREDICTION_ENDPOINT;
const PUBLISH_NAME = "classifyModel";

const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const trainer_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Training-key": TRAINING_KEY } });
const trainer = new TrainingApi.TrainingAPIClient(trainer_credentials, TRAINING_ENDPOINT);
const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": PREDICTION_KEY } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, PREDICTION_ENDPOINT);

// var main = async () => {
//   // Find project
//   var project, projects;
//   console.log("Get project...");
//   projects = await trainer.getProjects();
//   for (let item of projects) {
//     if (item.name !== PROJECT_NAME) {
//       continue;
//     } else {
//       project = item;
//       break;
//     }
//   }

//   return {
//     trainer
//   };
// };

module.exports = {
  PROJECT_ID,
  PREDICTION_RESOURCE_ID,
  PUBLISH_NAME,
  trainer,
  predictor
};