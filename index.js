const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/xpoesy_database'
// const mongoDB = 'https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_brand_atlas_desktop&utm_term=mongodb%20cluster&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=7326400240&adgroup=81712667238&gclid=CjwKCAiA6seQBhAfEiwAvPqu124H1dEsnKv8BESCN1aGGjcMD-QgyzTwu3YEETtwBdyZptl_Gbo_SRoCflQQAvD_BwE'


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