const express = require('express')
const router  = express.Router()
const ConnectXumm = require('../public/connectXumm')
const connect = new ConnectXumm();
const User = require('../models/user')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination : './assets/',
    filename : (req, file, cb) => {
        cb(null, "Avatar-" + Date.now() + path.extname(file.originalname))
    }
})

const upload =  multer({
    storage : storage,
    limits : {fileSize : 104857600}
}).single('user_image')


let user;

router.get('/connect', async (req, res) => {
    user = await connect.connectXumm(res)
    
})

router.get('/', (req, res) => {
    if(user){
        User.find({user_address : user.user_address}).then((result) => {
            if(result){
                user = null
                res.json(result)
            }
            else{
                User.create(user).then((result) => {
                    user = null
                    res.json(result)
                })
            }
        })
    }else{
        res.json({success : false})
    }
})

router.get('/check', (req, res) => {
    if(user != null){
        res.json({login : true})
    }else{
        res.json({login : false})
    }
})

router.post('/add_profile/:id', (req, res) => {
    upload(req, res, async() => {
        let result = req.body
        result = {...result, user_image: req.file.path }
        User.findOneAndUpdate({_id : req.params.id}, result).then((result) => {
            User.findOne({_id : req.params.id}).then((user) => {
                res.json(user)
            })
        })
    })
})

module.exports = router