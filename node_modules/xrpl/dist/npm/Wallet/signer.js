"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multisign = exports.verifySignature = exports.authorizeChannel = void 0;
const bignumber_js_1 = require("bignumber.js");
const lodash_1 = require("lodash");
const ripple_address_codec_1 = require("ripple-address-codec");
const ripple_binary_codec_1 = require("ripple-binary-codec");
const ripple_keypairs_1 = require("ripple-keypairs");
const errors_1 = require("../errors");
const transactions_1 = require("../models/transactions");
function multisign(transactions) {
    if (transactions.length === 0) {
        throw new errors_1.ValidationError('There were 0 transactions to multisign');
    }
    transactions.forEach((txOrBlob) => {
        const tx = getDecodedTransaction(txOrBlob);
        (0, transactions_1.validate)(tx);
        if (tx.Signers == null || tx.Signers.length === 0) {
            throw new errors_1.ValidationError("For multisigning all transactions must include a Signers field containing an array of signatures. You may have forgotten to pass the 'forMultisign' parameter when signing.");
        }
        if (tx.SigningPubKey !== '') {
            throw new errors_1.ValidationError('SigningPubKey must be an empty string for all transactions when multisigning.');
        }
    });
    const decodedTransactions = transactions.map((txOrBlob) => {
        return getDecodedTransaction(txOrBlob);
    });
    validateTransactionEquivalence(decodedTransactions);
    return (0, ripple_binary_codec_1.encode)(getTransactionWithAllSigners(decodedTransactions));
}
exports.multisign = multisign;
function authorizeChannel(wallet, channelId, amount) {
    const signingData = (0, ripple_binary_codec_1.encodeForSigningClaim)({
        channel: channelId,
        amount,
    });
    return (0, ripple_keypairs_1.sign)(signingData, wallet.privateKey);
}
exports.authorizeChannel = authorizeChannel;
function verifySignature(tx) {
    const decodedTx = getDecodedTransaction(tx);
    return (0, ripple_keypairs_1.verify)((0, ripple_binary_codec_1.encodeForSigning)(decodedTx), decodedTx.TxnSignature, decodedTx.SigningPubKey);
}
exports.verifySignature = verifySignature;
function validateTransactionEquivalence(transactions) {
    const exampleTransaction = JSON.stringify(Object.assign(Object.assign({}, transactions[0]), { Signers: null }));
    if (transactions
        .slice(1)
        .some((tx) => JSON.stringify(Object.assign(Object.assign({}, tx), { Signers: null })) !== exampleTransaction)) {
        throw new errors_1.ValidationError('txJSON is not the same for all signedTransactions');
    }
}
function getTransactionWithAllSigners(transactions) {
    const sortedSigners = (0, lodash_1.flatMap)(transactions, (tx) => { var _a; return (_a = tx.Signers) !== null && _a !== void 0 ? _a : []; }).sort(compareSigners);
    return Object.assign(Object.assign({}, transactions[0]), { Signers: sortedSigners });
}
function compareSigners(left, right) {
    return addressToBigNumber(left.Signer.Account).comparedTo(addressToBigNumber(right.Signer.Account));
}
function addressToBigNumber(address) {
    const hex = Buffer.from((0, ripple_address_codec_1.decodeAccountID)(address)).toString('hex');
    const numberOfBitsInHex = 16;
    return new bignumber_js_1.BigNumber(hex, numberOfBitsInHex);
}
function getDecodedTransaction(txOrBlob) {
    if (typeof txOrBlob === 'object') {
        return (0, ripple_binary_codec_1.decode)((0, ripple_binary_codec_1.encode)(txOrBlob));
    }
    return (0, ripple_binary_codec_1.decode)(txOrBlob);
}
//# sourceMappingURL=signer.js.map