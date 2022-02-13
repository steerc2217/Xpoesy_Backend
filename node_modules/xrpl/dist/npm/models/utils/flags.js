"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTransactionFlagsToNumber = exports.parseAccountRootFlags = void 0;
const errors_1 = require("../../errors");
const AccountRoot_1 = require("../ledger/AccountRoot");
const accountSet_1 = require("../transactions/accountSet");
const offerCreate_1 = require("../transactions/offerCreate");
const payment_1 = require("../transactions/payment");
const paymentChannelClaim_1 = require("../transactions/paymentChannelClaim");
const trustSet_1 = require("../transactions/trustSet");
const _1 = require(".");
function parseAccountRootFlags(flags) {
    const flagsInterface = {};
    Object.keys(AccountRoot_1.AccountRootFlags).forEach((flag) => {
        if ((0, _1.isFlagEnabled)(flags, AccountRoot_1.AccountRootFlags[flag])) {
            flagsInterface[flag] = true;
        }
    });
    return flagsInterface;
}
exports.parseAccountRootFlags = parseAccountRootFlags;
function setTransactionFlagsToNumber(tx) {
    if (tx.Flags == null) {
        tx.Flags = 0;
        return;
    }
    if (typeof tx.Flags === 'number') {
        return;
    }
    switch (tx.TransactionType) {
        case 'AccountSet':
            tx.Flags = convertAccountSetFlagsToNumber(tx.Flags);
            return;
        case 'OfferCreate':
            tx.Flags = convertOfferCreateFlagsToNumber(tx.Flags);
            return;
        case 'PaymentChannelClaim':
            tx.Flags = convertPaymentChannelClaimFlagsToNumber(tx.Flags);
            return;
        case 'Payment':
            tx.Flags = convertPaymentTransactionFlagsToNumber(tx.Flags);
            return;
        case 'TrustSet':
            tx.Flags = convertTrustSetFlagsToNumber(tx.Flags);
            return;
        default:
            tx.Flags = 0;
    }
}
exports.setTransactionFlagsToNumber = setTransactionFlagsToNumber;
function convertAccountSetFlagsToNumber(flags) {
    return reduceFlags(flags, accountSet_1.AccountSetTfFlags);
}
function convertOfferCreateFlagsToNumber(flags) {
    return reduceFlags(flags, offerCreate_1.OfferCreateFlags);
}
function convertPaymentChannelClaimFlagsToNumber(flags) {
    return reduceFlags(flags, paymentChannelClaim_1.PaymentChannelClaimFlags);
}
function convertPaymentTransactionFlagsToNumber(flags) {
    return reduceFlags(flags, payment_1.PaymentFlags);
}
function convertTrustSetFlagsToNumber(flags) {
    return reduceFlags(flags, trustSet_1.TrustSetFlags);
}
function reduceFlags(flags, flagEnum) {
    return Object.keys(flags).reduce((resultFlags, flag) => {
        if (flagEnum[flag] == null) {
            throw new errors_1.ValidationError(`flag ${flag} doesn't exist in flagEnum: ${JSON.stringify(flagEnum)}`);
        }
        return flags[flag] ? resultFlags | flagEnum[flag] : resultFlags;
    }, 0);
}
//# sourceMappingURL=flags.js.map