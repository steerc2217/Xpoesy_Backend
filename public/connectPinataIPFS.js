const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK('a95e746b913402397c66', '54c980b6d0e3074dd70e3c7e6126f9f471bf67f0faeaa4769fbd13ac4efb95db')
module.exports = class ConnectPinata{
    
    constructor(){
        this.ipfsHash = ''
    }

    pinFile = async (file) => {
 
        const options = {
            pinataOptions : {
                cidVersion : 0
            }
        }

        await pinata.pinFileToIPFS(file,options).then((result) => {
            this.ipfsHash = result.IpfsHash
        })

        return this.ipfsHash
    }

    pinMetadata = async (metadataNFT, ipfsHash) => {
        const metadata = {
            name : metadataNFT.name,
            keyvalues : {
                collection : metadataNFT.collection,
                supply : metadataNFT.supply,
                category : metadataNFT.category,
                memo : metadataNFT.memo,
                mintBy : metadataNFT.address,
                currentOwner : metadataNFT.address,
                price : metadataNFT.price
            }
        }
        await pinata.hashMetadata(ipfsHash, metadata)
    }

    getPinList = async () => {
        const filters = {
            status : 'pinned'
        }
        
        return await pinata.pinList(filters)
    }

    getPin = async (hash) => {
        const filters = {
            status : 'pinned',
            hashContains : hash
        }
        return await pinata.pinList(filters)
    }

    setMetadata = async (metadata, token) => {
        return await pinata.hashMetadata(token, metadata)
    }

}