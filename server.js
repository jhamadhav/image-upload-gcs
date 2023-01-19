const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const multer = require('multer')

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 5 * 1024 * 1024,
    },
});

const uploadImage = require('./src/helper');

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(multerMid.single('file'))
app.use(cors())
app.use(express.static("public", { index: false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.post('/uploads', async (req, res) => {
    try {
        const myFile = req.file
        console.log(myFile);
        const imageUrl = await uploadImage(myFile)

        res.status(200).json({
            message: "Upload was successful",
            data: imageUrl
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            message: 'Internal server error!',
        })
    }
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
