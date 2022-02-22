const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ConnectPinata = require('../public/connectPinataIPFS')
const connect = new ConnectPinata();
const ConnectXumm = require('../public/connectXumm')
const connectXumm = new ConnectXumm();

const storage = multer.diskStorage({
    destination : './assets/',
    filename : (req, file, cb) => {
        cb(null, "Xpoesy-" + Date.now() + path.extname(file.originalname))
    }
})

const upload =  multer({
    storage : storage,
    limits : {fileSize : 104857600}
}).single('myFile')

let pins;
let file;

router.post('/uploadFile', (req, res) => {
    upload(req, res, () => {
        file = fs.createReadStream(req.file.path)
    })
    res.json({ success : true})
})


router.post('/create', async (req, res) => {
    const token = await connect.pinFile(file)
    await connect.pinMetadata(req.body, token)
    file = null;
    res.json({success : true})
})

router.get('/', async (req, res) => {
    pins = await connect.getPinList();
    pins = pins.rows

    pins = pins.map(pin => {
            if(pin.metadata.keyvalues !== null){
                const container = {
                    token :  pin.ipfs_pin_hash,
                    token_url : 'https://gateway.pinata.cloud/ipfs/' + pin.ipfs_pin_hash,
                    name : pin.metadata.name,
                    collection : pin.metadata.keyvalues.collection ,
                    supply : pin.metadata.keyvalues.supply,
                    category : pin.metadata.keyvalues.category,
                    memp : pin.metadata.keyvalues.memo,
                    mintBy : pin.metadata.keyvalues.mintBy,
                    currentOwner : pin.metadata.keyvalues.currentOwner,
                    price : pin.metadata.keyvalues.price,
                }
                
                return container
            }
    })
    
    res.json(pins)
})


//notification test
router.post('/buy', async (req, res) => {
    const result = await connectXumm.buyNFT(req.body.address, req.body.user_token, req.body.price)
    res.json(result)
})

module.exports = router