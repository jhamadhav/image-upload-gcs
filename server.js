const express = require("express");
const app = express();
const cors = require('cors');

// port infos
const port = process.env.PORT || 8000;

// parser
app.use(cors())
app.use(express.static("public", { index: false }));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
