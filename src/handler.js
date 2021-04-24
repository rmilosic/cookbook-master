'use strict';

const { buildPdf } = require('./buildPdf')

module.exports.handler = async (event, context, res) => {

  console.log("event", event)

  var result = await ocrPdf(event)

  return {
    statusCode: 200,
    body: {
      message: "k",
      result: result
    }
  }
  // return new Promise((resolve, reject) => {

  //   var params = {
  //   DocumentLocation: { /* required */
  //       S3Object: {
  //           Bucket: incomingPdf.sourceBucket,
  //           Name: incomingPdf.name,
  //           // Version: 'STRING_VALUE'
  //       }
  //   },
  //   ClientRequestToken: incomingPdf.clientRequestToken,
  //   // JobTag: 'STRING_VALUE',
  //   // KMSKeyId: 'STRING_VALUE',
  //   NotificationChannel: {
  //       RoleArn: incomingPdf.RoleArn, /* required */
  //       SNSTopicArn: incomingPdf.SNSTopicArn /* required */
  //   },
  //   OutputConfig: {
  //       S3Bucket: incomingPdf.outputS3Bucket, /* required */
  //       S3Prefix: incomingPdf.outputS3Prefix
  //   }
  //   };

  //   textract.startDocumentTextDetection(params, function(err, data) {
  //       if (err) {
  //           console.log(err, err.stack); // an error occurred
  //           reject(err)
  //       }
  //       else {
  //           resolve(data)
  //       }     

  //   });
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
