const express = require('express')
const router = express.Router()
const Xpoem = require('../models/xpoem')
const Comment = require('../models/comment')

router.get('/', (req, res) => {
   Xpoem.findOne({_id : '62170cf9315a5a0f1b57af2a'}).then((result) => {
    //    res.json(result)
      Comment.findOne({xpoem_id : result._id}).then((kres) => {
        res.json(kres)
      })
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

router.post('/comment', (req, res) => {
    Comment.create(req.body).then((comment) => {
        res.json(comment)
    })
})

router.put('/comment/:id', (req, res) => {
    Comment.findOneAndUpdate({_id : req.params.id}, req.body).then((result) => {
        Comment.findOne({_id : req.params.id}).then((comment) => {
            res.json(comment)
        })
    })
})

router.delete('/comment/:id', (req, res) => {
    Comment.deleteOne({_id : req.params.id}).then(() => {
        res.json({success : true})
    })
})

router.post('/reply', (req, res) => {
    Comment.findOneAndUpdate({_id : req.body.comment_id}, {reply : req.body.reply}).then((result) => {
        Comment.findOne({_id : req.body.comment_id}).then((comment) => {
            res.json(comment)
        })
    })
})

router.put('/reply/:id', (req, res) => {
    Comment.findOneAndUpdate({_id : req.params.id}, req.body).then((result) => {
        Comment.findOne({_id : req.params.id}).then((comment) => {
            res.json(comment)
        })
    })
})

router.delete('/reply/:id', (req, res)=> {
    Comment.findOneAndUpdate({_id : req.params.id}, {reply : ''}).then((result) => {
        Comment.findOne({_id : req.params.id}).then((comment) => {
            res.json(comment)
        })
    })
})

module.exports = router