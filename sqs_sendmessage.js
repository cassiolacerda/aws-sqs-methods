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

var params = {
  DelaySeconds: 10,
  MessageAttributes: {
    Title: {
      DataType: "String",
      StringValue: "Programming to Designers"
    },
    Author: {
      DataType: "String",
      StringValue: "Cassio Lacerda"
    },
    WeeksOn: {
      DataType: "Number",
      StringValue: "8"
    }
  },
  MessageBody:
    "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: credentials.queueUrl
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
