

import { S3Event, Context } from 'aws-lambda'
import { ocrPdf } from './ocrPdf'

 
const handler = (event: S3Event , context: Context): string => {
  console.log('hello world')


  
  
  return 'successful invocation'
}

export default handler


