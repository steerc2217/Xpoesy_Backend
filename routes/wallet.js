const express = require('express')
const router  = express.Router()
const ConnectXumm = require('../public/connectXumm')
const connect = new ConnectXumm();
const User = require('../models/user')
const multer = require('multer')
const path = require('path')

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
    user = {...user, user_address : 'r96PMK5jh45J6f4S36KZEpzS4rwCamoD6d'}
    if(user){
        User.find({user_address : user.user_address}).then((result) => {
            if(result.user_address != null){
                res.json(result)
                user = null
            }
            else{
                User.create(user).then((result) => {
                    res.json(result)
                    user = null
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

router.post('/add_image/:id', (req, res) => {
    upload(req, res, async() => {
        const result = { user_image: req.file.path }
        User.findOneAndUpdate({_id : req.params.id}, result).then((result) => {
            User.findOne({_id : req.params.id}).then((user) => {
                res.json(user)
            })
        })
    })
})

router.post('/add_profile/:id', (req, res) =>{
    User.findOneAndUpdate({_id : req.params.id}, req.body).then(() => {
        User.findOne({_id : req.params.id}).then((user) => {
            res.json(user)
        })
    })
})

module.exports = router