const express = require('express')
const router = express.Router()
const Xpoem = require('../models/xpoem')

router.get('/', (req, res) => {
    
    Xpoem.find({}).then((xpoems) => {
        res.json(xpoems)
    })
    
})

router.post('/create', (req, res) => {
    Xpoem.create(req.body).then((xpoem) => {
        res.json(xpoem)
    })
})

router.put('/:id', (req, res) => {
    Xpoem.findOneAndUpdate({_id : req.params.id}, req.body).then((result) => {
        Xpoem.findOne({_id : req.params.id }).then((xpoem) => {
            res.json(xpoem)
        })
    })
})

router.delete('/:id', (req, res) => {
    Xpoem.deleteOne({_id : req.params.id}).then(() => {
        res.json({success : true})
    })
})

module.exports = router