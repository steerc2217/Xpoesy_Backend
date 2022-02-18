const express = require('express')
const router = express.Router()
let xpoem;

router.get('/', (req, res) => {
    res.json(xpoem)
})

router.post('/create', (req, res) => {
    xpoem = {...xpoem, title : req.body.title}
    xpoem = {...xpoem, nft_link : req.body.nft_link}
    xpoem = {...xpoem, category : req.body.category}
    xpoem = {...xpoem, xpoem : req.body.xpoem}
    xpoem = {...xpoem, author : req.body.author}
    res.json({success : true})
})

router.put('/', (req, res) => {
    req.body.id,
    req.body.nft_link,
    req.body.category,
    req.body.xpoem,
    req.body.author
})

router.delete('/', (req, res) => {
    req.body.id
})

module.exports = router