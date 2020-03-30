/** ----------------------------------------
 * Environment
 */
require("dotenv").config();
const credentials = require("./credentials.js");

/** ----------------------------------------
 * Dependencies
 */
var AWS = require("aws-sdk");

/** ----------------------------------------
 * Using Queues in Amazon SQS
 */

// Create an SQS service object
var sqs = new AWS.SQS({
  apiVersion: "2012-11-05"
});

var params = {
  QueueName: "SQS_QUEUE_NAME"
};

sqs.getQueueUrl(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});
