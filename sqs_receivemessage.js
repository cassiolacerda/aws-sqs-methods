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
 * Sending and Receiving Messages in Amazon SQS
 */

// Create an SQS service object
var sqs = new AWS.SQS({
  apiVersion: "2012-11-05"
});

var queueURL = credentials.queueUrl;

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log("Message Received", data);
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});
