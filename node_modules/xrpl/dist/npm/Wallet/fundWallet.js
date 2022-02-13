"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._private = void 0;
const https_1 = require("https");
const ripple_address_codec_1 = require("ripple-address-codec");
const errors_1 = require("../errors");
const _1 = __importDefault(require("."));
var FaucetNetwork;
(function (FaucetNetwork) {
    FaucetNetwork["Testnet"] = "faucet.altnet.rippletest.net";
    FaucetNetwork["Devnet"] = "faucet.devnet.rippletest.net";
})(FaucetNetwork || (FaucetNetwork = {}));
const INTERVAL_SECONDS = 1;
const MAX_ATTEMPTS = 20;
function fundWallet(wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isConnected()) {
            throw new errors_1.RippledError('Client not connected, cannot call faucet');
        }
        const walletToFund = wallet && (0, ripple_address_codec_1.isValidClassicAddress)(wallet.classicAddress)
            ? wallet
            : _1.default.generate();
        const postBody = Buffer.from(new TextEncoder().encode(JSON.stringify({
            destination: walletToFund.classicAddress,
        })));
        let startingBalance = 0;
        try {
            startingBalance = Number(yield this.getXrpBalance(walletToFund.classicAddress));
        }
        catch (_a) {
        }
        const options = getOptions(this, postBody);
        return returnPromise(options, this, startingBalance, walletToFund, postBody);
    });
}
function returnPromise(options, client, startingBalance, walletToFund, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const request = (0, https_1.request)(options, (response) => {
                const chunks = [];
                response.on('data', (data) => chunks.push(data));
                response.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    return onEnd(response, chunks, client, startingBalance, walletToFund, resolve, reject);
                }));
            });
            request.write(postBody);
            request.on('error', (error) => {
                reject(error);
            });
            request.end();
        });
    });
}
function getOptions(client, postBody) {
    return {
        hostname: getFaucetUrl(client),
        port: 443,
        path: '/accounts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postBody.length,
        },
    };
}
function onEnd(response, chunks, client, startingBalance, walletToFund, resolve, reject) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const body = Buffer.concat(chunks).toString();
        if ((_a = response.headers['content-type']) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) {
            yield processSuccessfulResponse(client, body, startingBalance, walletToFund, resolve, reject);
        }
        else {
            reject(new errors_1.XRPLFaucetError(`Content type is not \`application/json\`: ${JSON.stringify({
                statusCode: response.statusCode,
                contentType: response.headers['content-type'],
                body,
            })}`));
        }
    });
}
function processSuccessfulResponse(client, body, startingBalance, walletToFund, resolve, reject) {
    return __awaiter(this, void 0, void 0, function* () {
        const faucetWallet = JSON.parse(body);
        const classicAddress = faucetWallet.account.classicAddress;
        if (!classicAddress) {
            reject(new errors_1.XRPLFaucetError(`The faucet account is undefined`));
            return;
        }
        try {
            const updatedBalance = yield getUpdatedBalance(client, classicAddress, startingBalance);
            if (updatedBalance > startingBalance) {
                resolve({
                    wallet: walletToFund,
                    balance: yield getUpdatedBalance(client, walletToFund.classicAddress, startingBalance),
                });
            }
            else {
                reject(new errors_1.XRPLFaucetError(`Unable to fund address with faucet after waiting ${INTERVAL_SECONDS * MAX_ATTEMPTS} seconds`));
            }
        }
        catch (err) {
            if (err instanceof Error) {
                reject(new errors_1.XRPLFaucetError(err.message));
            }
            reject(err);
        }
    });
}
function getUpdatedBalance(client, address, originalBalance) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let attempts = MAX_ATTEMPTS;
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (attempts < 0) {
                    clearInterval(interval);
                    resolve(originalBalance);
                }
                else {
                    attempts -= 1;
                }
                try {
                    let newBalance;
                    try {
                        newBalance = Number(yield client.getXrpBalance(address));
                    }
                    catch (_a) {
                    }
                    if (newBalance > originalBalance) {
                        clearInterval(interval);
                        resolve(newBalance);
                    }
                }
                catch (err) {
                    clearInterval(interval);
                    if (err instanceof Error) {
                        reject(new errors_1.XRPLFaucetError(`Unable to check if the address ${address} balance has increased. Error: ${err.message}`));
                    }
                    reject(err);
                }
            }), INTERVAL_SECONDS * 1000);
        });
    });
}
function getFaucetUrl(client) {
    const connectionUrl = client.url;
    if (connectionUrl.includes('altnet') || connectionUrl.includes('testnet')) {
        return FaucetNetwork.Testnet;
    }
    if (connectionUrl.includes('devnet')) {
        return FaucetNetwork.Devnet;
    }
    throw new errors_1.XRPLFaucetError('Faucet URL is not defined or inferrable.');
}
exports.default = fundWallet;
const _private = {
    FaucetNetwork,
    getFaucetUrl,
};
exports._private = _private;
//# sourceMappingURL=fundWallet.js.map