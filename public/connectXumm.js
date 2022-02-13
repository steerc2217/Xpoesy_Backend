const {XummSdk} = require('xumm-sdk')
const Sdk = new XummSdk('21565853-cae4-4c36-b541-afd4cf052d6f', '436515b7-2ae3-43d1-bc7c-688e52c7cf85')
const xrpl = require('xrpl')

module.exports  = class ConnectXumm {
    
    constructor(){
        this.qr_url = ''
        this.qr_image = ''
        this.user_address = ''
        this.user_token = ''
        this.balance = ''
    }
    
    getQR = () => {
        return {qr_url : this.qr_url, qr_image : this.qr_image}
    }

    connectXumm = async (res) => {
        
        const request = {
            "txjson" : {
                "TransactionType" : "SignIn"
            }
        }

        const subscription = await Sdk.payload.createAndSubscribe(request, event => {
            if(Object.keys(event.data).indexOf('signed') > -1)
                return event.data
        })

        this.qr_url = subscription.created.next.always
        this.qr_image = subscription.created.refs.qr_png
        res.json({qr_url : this.qr_url, qr_image : this.qr_image})
        
        const resolveData = await subscription.resolved

        if(resolveData.signed == false)
            console.log('The sign request was rejected!')
        else{
            console.log('The sign request was Signed!')
            const result = await Sdk.payload.get(resolveData.payload_uuidv4)
            this.user_token = result.application.issued_user_token
            this.user_address = result.response.account
        }
        const client = new xrpl.Client('wss://s.altnet.rippletest.net/')
       
        await client.connect()
        
        const response = await client.request({
            "command" : "account_info",
            "account" : this.user_address,
             "ledger_index": "validated"
        })
        
        this.balance = response.result.account_data.Balance
        
        client.disconnect()

        return {address : this.user_address, token : this.user_token, balance : this.balance}
    }
}