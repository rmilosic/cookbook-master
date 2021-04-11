const { isExportDeclaration } = require('typescript')
const { buildPdf } = require('../dist/buildPdf')


describe('test build pdf', () => {

    const jsonData = require('./apiResponse.json');

    it("test generation of pdf", async () => {

    await expect(
        buildPdf(jsonData)).resolves.toEqual('ok')

    })
})