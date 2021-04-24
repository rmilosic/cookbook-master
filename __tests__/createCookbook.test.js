const { expect } = require('@jest/globals')
const {createCookbook} = require('../dist/createCookbook')


describe("test creation of new cookbook", () => {

    it("create cookbook", async()=>{

        const data = {
            "name": {
                "S": "Test"
            },
            "author": "test",
            "language": "en",
            "coverPath": "testPath"
        }

        const response = await createCookbook(data)

        expect(response).toEqual("ok")
    })
})