"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAmountValue = exports.validateBaseTransaction = exports.isAmount = exports.isIssuedCurrency = void 0;
const ripple_binary_codec_1 = require("ripple-binary-codec");
const errors_1 = require("../../errors");
const utils_1 = require("../utils");
const MEMO_SIZE = 3;
function isMemo(obj) {
    if (obj.Memo == null) {
        return false;
    }
    const memo = obj.Memo;
    const size = Object.keys(memo).length;
    const validData = memo.MemoData == null || typeof memo.MemoData === 'string';
    const validFormat = memo.MemoFormat == null || typeof memo.MemoFormat === 'string';
    const validType = memo.MemoType == null || typeof memo.MemoType === 'string';
    return (size >= 1 &&
        size <= MEMO_SIZE &&
        validData &&
        validFormat &&
        validType &&
        (0, utils_1.onlyHasFields)(memo, ['MemoFormat', 'MemoData', 'MemoType']));
}
const SIGNER_SIZE = 3;
function isSigner(obj) {
    const signerWrapper = obj;
    if (signerWrapper.Signer == null) {
        return false;
    }
    const signer = signerWrapper.Signer;
    return (Object.keys(signer).length === SIGNER_SIZE &&
        typeof signer.Account === 'string' &&
        typeof signer.TxnSignature === 'string' &&
        typeof signer.SigningPubKey === 'string');
}
const ISSUED_CURRENCY_SIZE = 3;
function isRecord(value) {
    return value !== null && typeof value === 'object';
}
function isIssuedCurrency(input) {
    return (isRecord(input) &&
        Object.keys(input).length === ISSUED_CURRENCY_SIZE &&
        typeof input.value === 'string' &&
        typeof input.issuer === 'string' &&
        typeof input.currency === 'string');
}
exports.isIssuedCurrency = isIssuedCurrency;
function isAmount(amount) {
    return typeof amount === 'string' || isIssuedCurrency(amount);
}
exports.isAmount = isAmount;
function validateBaseTransaction(common) {
    if (common.Account === undefined) {
        throw new errors_1.ValidationError('BaseTransaction: missing field Account');
    }
    if (typeof common.Account !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: Account not string');
    }
    if (common.TransactionType === undefined) {
        throw new errors_1.ValidationError('BaseTransaction: missing field TransactionType');
    }
    if (typeof common.TransactionType !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: TransactionType not string');
    }
    if (!ripple_binary_codec_1.TRANSACTION_TYPES.includes(common.TransactionType)) {
        throw new errors_1.ValidationError('BaseTransaction: Unknown TransactionType');
    }
    if (common.Fee !== undefined && typeof common.Fee !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: invalid Fee');
    }
    if (common.Sequence !== undefined && typeof common.Sequence !== 'number') {
        throw new errors_1.ValidationError('BaseTransaction: invalid Sequence');
    }
    if (common.AccountTxnID !== undefined &&
        typeof common.AccountTxnID !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: invalid AccountTxnID');
    }
    if (common.LastLedgerSequence !== undefined &&
        typeof common.LastLedgerSequence !== 'number') {
        throw new errors_1.ValidationError('BaseTransaction: invalid LastLedgerSequence');
    }
    const memos = common.Memos;
    if (memos !== undefined && !memos.every(isMemo)) {
        throw new errors_1.ValidationError('BaseTransaction: invalid Memos');
    }
    const signers = common.Signers;
    if (signers !== undefined &&
        (signers.length === 0 || !signers.every(isSigner))) {
        throw new errors_1.ValidationError('BaseTransaction: invalid Signers');
    }
    if (common.SourceTag !== undefined && typeof common.SourceTag !== 'number') {
        throw new errors_1.ValidationError('BaseTransaction: invalid SourceTag');
    }
    if (common.SigningPubKey !== undefined &&
        typeof common.SigningPubKey !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: invalid SigningPubKey');
    }
    if (common.TicketSequence !== undefined &&
        typeof common.TicketSequence !== 'number') {
        throw new errors_1.ValidationError('BaseTransaction: invalid TicketSequence');
    }
    if (common.TxnSignature !== undefined &&
        typeof common.TxnSignature !== 'string') {
        throw new errors_1.ValidationError('BaseTransaction: invalid TxnSignature');
    }
}
exports.validateBaseTransaction = validateBaseTransaction;
function parseAmountValue(amount) {
    if (!isAmount(amount)) {
        return NaN;
    }
    if (typeof amount === 'string') {
        return parseFloat(amount);
    }
    return parseFloat(amount.value);
}
exports.parseAmountValue = parseAmountValue;
//# sourceMappingURL=common.js.map