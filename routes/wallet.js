const express = require('express')
const router  = express.Router()
const ConnectXumm = require('../public/connectXumm')
const connect = new ConnectXumm();

let user;

router.get('/connect', async (req, res) => { 
    res.type('application/json')
    user  = await connect.connectXumm(res)
    res.write(JSON.stringify({success : true}))
    
    res.write(JSON.stringify({success : true}))
    
    res.write(JSON.stringify({success : true}))
    res.end()
})

router.get('/', (req, res) => {
    res.json(user)
})

router.post('/add_profile', (req, res) => {
    user = {...user, user_name : req.body.user_name}
    user = {...user, user_image : req.body.user_image}
    res.json({success : true})
})

module.exports = router