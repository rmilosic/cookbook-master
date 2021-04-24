const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
import { Cookbook } from './types/cookbook'


export async function handler(req, context, res) {

    console.log("req", req)
   
    const newCookbook: Cookbook = {
        name: {
            "S": req.body.name
        }
    }

    console.log(newCookbook)
   
    const response = await createCookbook(newCookbook)
    // return response

    return response

    
}


export async function createCookbook(cookBook: Cookbook){

    const client = new DynamoDBClient({
        region: "localhost",
        endpoint: "http://localhost:8003"
    })

    return new Promise((resolve, reject) => {

        const params = {
            TableName: "cookbooksTable",
            Item: cookBook
        }
        
        const command = new PutItemCommand(params)
        // const response = write
        
        client.send(command).then(
            data => {
                resolve(data)
            }, error => {
                reject(error)
            }
        )
    })
}