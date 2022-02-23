const express = require('express')
const router  = express.Router()
const ConnectXumm = require('../public/connectXumm')
const connect = new ConnectXumm();
const User = require('../models/user')
let user;

router.get('/connect', async (req, res) => {

    user = await connect.connectXumm(res)
    
})

router.get('/', (req, res) => {
    if(user){
        res.json(user)
    }else{
        res.json({success : false})
    }
})

router.post('/add_profile', (req, res) => {
    user = {...user, user_name : req.body.user_name}
    user = {...user, user_image : req.body.user_image}
    res.json({success : true})
})

module.exports = router