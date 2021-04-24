const s3Event = require('./s3Event.json')
const { ocrPdf } = require('../newspace/ocrPdf')


describe('test build pdf', () => {

    

    it("test ocr of pdf", async () => {

        await expect(
            ocrPdf(s3Event)
            ).resolves.toEqual('k')

    })
})