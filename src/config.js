const dotenv = require('dotenv').config()
console.log(process.env.PROJECT_ID);
const Cloud = require('@google-cloud/storage')
const path = require('path')

const serviceKey = path.join(__dirname, './keys.json')

const { Storage } = Cloud

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.PROJECT_ID,
})

// console.log(storage);

module.exports = storage