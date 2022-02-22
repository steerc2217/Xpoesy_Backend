const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
// const mongoDB = 'mongodb://127.0.0.1/xpoesy_database' //testing localhost
const mongoDB = 'mongodb+srv://Xpoesy-Test:xpoesy@cluster0.olahs.mongodb.net/xpoesy_database?retryWrites=true&w=majority' //testing mongo cluster


mongoose.connect(mongoDB, {useNewUrlParser : true, useUnifiedTopology : true}).then(() => {
    console.log('Connected mongodb')
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE']
}))


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