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

router.post('/create',  (req, res) => {
    upload(req, res, async() => {
        const file = fs.createReadStream(req.file.path)
        const token = await connect.pinFile(file)
        await connect.pinMetadata(req.body, token)
        res.json({success : true})
    })
    
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
                    memo : pin.metadata.keyvalues.memo,
                    mintBy : pin.metadata.keyvalues.mintBy,
                    currentOwner : pin.metadata.keyvalues.currentOwner,
                    price : pin.metadata.keyvalues.price,
                }
                
                return container
            }
    })
    
    res.json(pins)
})


router.post('/buy', async (req, res) => {
    let pin = await connect.getPin(req.body.token)
    pin = pin.rows[0]
    const price = pin.metadata.keyvalues.price
    const destination_address = pin.metadata.keyvalues.currentOwner
   
    const result = await connectXumm.buyNFT(destination_address, req.body.user_token, price)
    if(result.success == true){
        const metadata = {
            keyvalues : {
                currentOwner : req.body.address
            }
        }
        await connect.setMetadata(metadata, req.body.token)
        res.json({success : true})
    }else{
        res.json({success : false})
    }
})

router.post('/change', async (req, res) => {
    
    let pin = await connect.getPin(req.body.token)
    pin = pin.rows[0]
    if(pin.metadata.keyvalues.currentOwner == req.body.address)
    {
        const metadata = {
            keyvalues : {
                price : req.body.new_price
            }
        }

        await connect.setMetadata(metadata, req.body.token)

        res.json({success : true})
    }else{
        res.json({success : false})
    }
    
})

module.exports = router