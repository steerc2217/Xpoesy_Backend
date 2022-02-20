const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK('a95e746b913402397c66', '54c980b6d0e3074dd70e3c7e6126f9f471bf67f0faeaa4769fbd13ac4efb95db')
const fs = require('fs')
const file = fs.createReadStream('./frozen.jpg')

pinata.testAuthentication().then((result) => {
    if(result.authenticated == true){
        const options = {
            
            pinataMetadata: {
                name : 'frozen',
                keyvalues:{
                    mint : 'slslslsl',
                    owner : 'ddddsd',
                }
            },

            pinataOptions: {
                cidVersion : 0
            }

        } 
        
        pinata.pinFileToIPFS(file, options).then((result) => {
            console.log(result)
        })

    }
})
