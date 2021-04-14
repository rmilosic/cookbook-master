
import * as AWS from 'aws-sdk'

var textract = new AWS.Textract();

interface incomingPdf {
    // bytes: 
    sourceBucket: string;
    name: string;
    RoleArn: string;
    SNSTopicArn: string;
    outputS3Bucket: string;
    outputS3Prefix?: string;
    clientRequestToken?: string;
    

}

export async function ocrPdf (incomingPdf: incomingPdf) {

    return new Promise((resolve, reject) => {

        var params = {
        DocumentLocation: { /* required */
            S3Object: {
                Bucket: incomingPdf.sourceBucket,
                Name: incomingPdf.name,
                // Version: 'STRING_VALUE'
            }
        },
        ClientRequestToken: incomingPdf.clientRequestToken,
        // JobTag: 'STRING_VALUE',
        // KMSKeyId: 'STRING_VALUE',
        NotificationChannel: {
            RoleArn: incomingPdf.RoleArn, /* required */
            SNSTopicArn: incomingPdf.SNSTopicArn /* required */
        },
        OutputConfig: {
            S3Bucket: incomingPdf.outputS3Bucket, /* required */
            S3Prefix: incomingPdf.outputS3Prefix
        }
        };
    
        textract.startDocumentTextDetection(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err)
            }
        else {
            resolve(data)
        }     
            
        });
        // buildPdf(
        //   ocrDict: 
        // )
    })
}

