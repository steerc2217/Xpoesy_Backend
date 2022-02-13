const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const wallet = require('./routes/wallet')
const nft = require('./routes/nft')
const xpoem = require('./routes/xpoem')

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/wallet', wallet)
app.use('/nft', nft)
app.use('/xpoem', xpoem)

app.listen(5000, () => {
    console.log("The server is running on Port 5000")
})