import { S3Event, Context } from 'aws-lambda'

import { buildPdf } from './buildPdf'
 
const handler = (event: S3Event , context: Context): string => {
  console.log('hello world')

  // buildPdf(
  //   ocrDict: 
  // )
  
  return 'successful invocation'
}

export default handler