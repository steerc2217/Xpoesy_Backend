require('babel-register');
require('babel-polyfill');

module.exports = {
    networks : {
        development : {
            host : '127.0.0.1:',
            port : '7545',
            network_id : '*'
        }
    },
    contracts_directory : './contracts',
    contracts_build_directory: './abis',
    compilers : {
        solc : {
            version : 'pragma',
            optimizer : {
                enable : true,
                runs : 200 
            },
        },
    },  

}