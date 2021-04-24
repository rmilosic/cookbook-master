
const {  TextractClient, StartDocumentTextDetectionCommand } = require('@aws-sdk/client-textract')

const {fromIni} = require("@aws-sdk/credential-provider-ini");


const ocrPdf = async (s3Event) => {

    return new Promise((resolve, reject) => {

        console.log(s3Event.Records[0]["s3"])
        console.log(process.env)

        var client = new TextractClient({
            region: "eu-central-1"
        })

        // console.log("client", client.config)

        const s3EventBody = s3Event.Records[0]["s3"]
        // console.log(s3EventBody)
        
        var params = {
            DocumentLocation: { /* required */
                S3Object: {
                    Bucket: s3EventBody.bucket.name,
                    Name: s3EventBody.object.key,
                    // Version: 'STRING_VALUE'
                }
            },
            // ClientRequestToken: s3EventBody.clientRequestToken,
            // JobTag: 'STRING_VALUE',
            // KMSKeyId: 'STRING_VALUE',
            NotificationChannel: {
                RoleArn: "arn:aws:iam::720031418477:role/cookbook-sns", /* required */
                SNSTopicArn: "arn:aws:sns:eu-central-1:720031418477:ocrPdf" /* required */
            },
            OutputConfig: {
                S3Bucket: s3EventBody.bucket.name/* required */
                // S3Prefix: s3EventBody.outputS3Prefix
            }
        };

        const command = new StartDocumentTextDetectionCommand(params)


        client.send(command).then(data => {
            resolve(data)
        }, (error) => {
            reject(error)
        })
        
    
     
    })
}


module.exports = {
    ocrPdf
}