const express = require('express')
const router = express.Router()

let nft;

router.post('/create', (req, res) => {
    nft = {...nft, name : req.body.name}
    nft = {...nft, collection : req.body.collection}
    nft = {...nft, supply : req.body.supply}
    nft = {...nft, category : req.body.category}
    nft = {...nft, memo : req.body.memo}
    nft = {...nft, token : req.body.token}
    res.json({success : true})
})

router.get('/', (req, res) => {
    res.json(nft)
})

module.exports = router