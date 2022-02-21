const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ConnectPinata = require('../public/connectPinataIPFS')
const connect = new ConnectPinata();

const storage = multer.diskStorage({
    destination : './assets/',
    filename : (req, file, cb) => {
        cb(null, "Xpoesy-" + Date.now() + path.extname(file.originalname))
    }
})

const upload =  multer({
    storage : storage,
    limits : {fileSize : 102400}
}).single('myFile')

let ipfsHash;
let pins;

router.post('/create', async (req, res) => {
    await connect.pinMetadata(req.body, ipfsHash)
    ipfsHash = ''
    res.json({success : true})
})


router.post('/uploadFile', (req, res) => {
    upload(req, res, async () => {
        const file = fs.createReadStream(req.file.path)
        ipfsHash = await connect.pinFile(file)
        res.json({ success : true})
    })
})

router.get('/', async (req, res) => {
    pins = await connect.getPinList();
    pins = pins.rows
    
    const nftList = pins.map(pin => {
        const container = {
            token : 'https://gateway.pinata.cloud/ipfs/' + pin.ipfs_pin_hash,
            name : pin.metadata.name,
            collection : pin.metadata.keyvalues.collection,
            supply : pin.metadata.keyvalues.supply,
            category : pin.metadata.keyvalues.category,
            memp : pin.metadata.keyvalues.memo,
            mintBy : pin.metadata.keyvalues.mintBy,
            currentOwner : pin.metadata.keyvalues.currentOwner,
            price : pin.metadata.keyvalues.price,
        }
    })
    
    res.json(pins)
})

module.exports = router