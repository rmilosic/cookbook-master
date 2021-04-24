import * as fs from 'fs'
import { S3Client } from '@aws-sdk/client-s3'

export async function buildPdf(snsEvent){


    return new Promise((resolve, reject) => {

        
        const client = new S3Client({})
        
        var pages = [0];

        const blocks = snsEvent["Blocks"]

        console.log("filtering")
        const lines = blocks.filter(block => {
            return block["BlockType"] == "LINE"
        })

        // init pdf doc
        const PDFDocument = require('pdfkit')

        const doc = new PDFDocument({
            bufferPages: true,
            // size: 'A4'
            size: [841.89, 595],
            margins: { // by default, all are 72
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        });

        doc.fontSize(8)

        // console.log(doc.page)

        // open stream
        var ws: fs.WriteStream = fs.createWriteStream('./file.pdf')
        doc.pipe(ws)

        // add stuff to pdf

        console.log(`writing ${lines.length} lines`)

        console.log(doc.page)
        lines.map(line => {

            let pageNo: number = line["Page"]-1

            if (!pages.includes(pageNo)){
                console.log("adding page", pageNo)
                pages.push(pageNo)
                doc.addPage()
            }
            doc.switchToPage(pageNo)

            // console.log("writing line", line["Text"])

            let boundingBox = line["Geometry"]["BoundingBox"]
            doc.text(
                line["Text"], boundingBox["Left"] * doc.page.width, boundingBox["Top"] * doc.page.height,
                {
                    lineBreak: false,
                    // fill: false
                    // width: doc.widthOfString(line["Text"]),
                    // height: doc.heightOfString(line["Text"]),
                })
        })
        // doc.text("Jak pouzivat tuto kucharku", 100, 100)


        console.log("finsihing")
        doc.end()


        ws.on('error', (error) => {
            reject(error)
        })

        ws.on('finish', () => {
            resolve('ok')
        })

    })


}