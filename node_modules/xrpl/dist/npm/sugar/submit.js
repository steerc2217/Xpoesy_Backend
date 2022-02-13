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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAndWait = exports.submit = void 0;
const ripple_binary_codec_1 = require("ripple-binary-codec");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const LEDGER_CLOSE_TIME = 4000;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
function submit(transaction, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedTx = yield getSignedTx(this, transaction, opts);
        return submitRequest(this, signedTx, opts === null || opts === void 0 ? void 0 : opts.failHard);
    });
}
exports.submit = submit;
function submitAndWait(transaction, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedTx = yield getSignedTx(this, transaction, opts);
        const lastLedger = getLastLedgerSequence(signedTx);
        if (lastLedger == null) {
            throw new errors_1.ValidationError('Transaction must contain a LastLedgerSequence value for reliable submission.');
        }
        yield submitRequest(this, signedTx, opts === null || opts === void 0 ? void 0 : opts.failHard);
        const txHash = utils_1.hashes.hashSignedTx(signedTx);
        return waitForFinalTransactionOutcome(this, txHash, lastLedger);
    });
}
exports.submitAndWait = submitAndWait;
function submitRequest(client, signedTransaction, failHard = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isSigned(signedTransaction)) {
            throw new errors_1.ValidationError('Transaction must be signed');
        }
        const signedTxEncoded = typeof signedTransaction === 'string'
            ? signedTransaction
            : (0, ripple_binary_codec_1.encode)(signedTransaction);
        const request = {
            command: 'submit',
            tx_blob: signedTxEncoded,
            fail_hard: isAccountDelete(signedTransaction) || failHard,
        };
        return client.request(request);
    });
}
function waitForFinalTransactionOutcome(client, txHash, lastLedger) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sleep(LEDGER_CLOSE_TIME);
        const latestLedger = yield client.getLedgerIndex();
        const txResponse = yield client
            .request({
            command: 'tx',
            transaction: txHash,
        })
            .catch((error) => __awaiter(this, void 0, void 0, function* () {
            const message = error.data.error;
            if (message === 'txnNotFound') {
                if (lastLedger < (yield client.getLedgerIndex())) {
                    throw new errors_1.XrplError(`The latest ledger sequence ${latestLedger} is greater than the transaction's LastLedgerSequence (${lastLedger}).`);
                }
                return waitForFinalTransactionOutcome(client, txHash, lastLedger);
            }
            throw new Error(message);
        }));
        if (txResponse.result.validated) {
            return txResponse;
        }
        if (lastLedger > latestLedger) {
            return waitForFinalTransactionOutcome(client, txHash, lastLedger);
        }
        throw new errors_1.XrplError(`The latest ledger sequence ${latestLedger} is greater than the transaction's LastLedgerSequence (${lastLedger}).`);
    });
}
function isSigned(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    return (typeof tx !== 'string' &&
        (tx.SigningPubKey != null || tx.TxnSignature != null));
}
function getSignedTx(client, transaction, { autofill = true, wallet, } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isSigned(transaction)) {
            return transaction;
        }
        if (!wallet) {
            throw new errors_1.ValidationError('Wallet must be provided when submitting an unsigned transaction');
        }
        let tx = typeof transaction === 'string'
            ?
                (0, ripple_binary_codec_1.decode)(transaction)
            : transaction;
        if (autofill) {
            tx = yield client.autofill(tx);
        }
        return wallet.sign(tx).tx_blob;
    });
}
function getLastLedgerSequence(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    return tx.LastLedgerSequence;
}
function isAccountDelete(transaction) {
    const tx = typeof transaction === 'string' ? (0, ripple_binary_codec_1.decode)(transaction) : transaction;
    return tx.TransactionType === 'AccountDelete';
}
//# sourceMappingURL=submit.js.map