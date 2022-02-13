"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const lodash_1 = __importDefault(require("lodash"));
const ripple_binary_codec_1 = require("ripple-binary-codec");
const errors_1 = require("../../errors");
const flags_1 = require("../utils/flags");
const accountDelete_1 = require("./accountDelete");
const accountSet_1 = require("./accountSet");
const checkCancel_1 = require("./checkCancel");
const checkCash_1 = require("./checkCash");
const checkCreate_1 = require("./checkCreate");
const depositPreauth_1 = require("./depositPreauth");
const escrowCancel_1 = require("./escrowCancel");
const escrowCreate_1 = require("./escrowCreate");
const escrowFinish_1 = require("./escrowFinish");
const NFTokenAcceptOffer_1 = require("./NFTokenAcceptOffer");
const NFTokenBurn_1 = require("./NFTokenBurn");
const NFTokenCancelOffer_1 = require("./NFTokenCancelOffer");
const NFTokenCreateOffer_1 = require("./NFTokenCreateOffer");
const NFTokenMint_1 = require("./NFTokenMint");
const offerCancel_1 = require("./offerCancel");
const offerCreate_1 = require("./offerCreate");
const payment_1 = require("./payment");
const paymentChannelClaim_1 = require("./paymentChannelClaim");
const paymentChannelCreate_1 = require("./paymentChannelCreate");
const paymentChannelFund_1 = require("./paymentChannelFund");
const setRegularKey_1 = require("./setRegularKey");
const signerListSet_1 = require("./signerListSet");
const ticketCreate_1 = require("./ticketCreate");
const trustSet_1 = require("./trustSet");
function validate(transaction) {
    const tx = Object.assign({}, transaction);
    if (tx.TransactionType == null) {
        throw new errors_1.ValidationError('Object does not have a `TransactionType`');
    }
    if (typeof tx.TransactionType !== 'string') {
        throw new errors_1.ValidationError("Object's `TransactionType` is not a string");
    }
    (0, flags_1.setTransactionFlagsToNumber)(tx);
    switch (tx.TransactionType) {
        case 'AccountDelete':
            (0, accountDelete_1.validateAccountDelete)(tx);
            break;
        case 'AccountSet':
            (0, accountSet_1.validateAccountSet)(tx);
            break;
        case 'CheckCancel':
            (0, checkCancel_1.validateCheckCancel)(tx);
            break;
        case 'CheckCash':
            (0, checkCash_1.validateCheckCash)(tx);
            break;
        case 'CheckCreate':
            (0, checkCreate_1.validateCheckCreate)(tx);
            break;
        case 'DepositPreauth':
            (0, depositPreauth_1.validateDepositPreauth)(tx);
            break;
        case 'EscrowCancel':
            (0, escrowCancel_1.validateEscrowCancel)(tx);
            break;
        case 'EscrowCreate':
            (0, escrowCreate_1.validateEscrowCreate)(tx);
            break;
        case 'EscrowFinish':
            (0, escrowFinish_1.validateEscrowFinish)(tx);
            break;
        case 'NFTokenAcceptOffer':
            (0, NFTokenAcceptOffer_1.validateNFTokenAcceptOffer)(tx);
            break;
        case 'NFTokenBurn':
            (0, NFTokenBurn_1.validateNFTokenBurn)(tx);
            break;
        case 'NFTokenCancelOffer':
            (0, NFTokenCancelOffer_1.validateNFTokenCancelOffer)(tx);
            break;
        case 'NFTokenCreateOffer':
            (0, NFTokenCreateOffer_1.validateNFTokenCreateOffer)(tx);
            break;
        case 'NFTokenMint':
            (0, NFTokenMint_1.validateNFTokenMint)(tx);
            break;
        case 'OfferCancel':
            (0, offerCancel_1.validateOfferCancel)(tx);
            break;
        case 'OfferCreate':
            (0, offerCreate_1.validateOfferCreate)(tx);
            break;
        case 'Payment':
            (0, payment_1.validatePayment)(tx);
            break;
        case 'PaymentChannelClaim':
            (0, paymentChannelClaim_1.validatePaymentChannelClaim)(tx);
            break;
        case 'PaymentChannelCreate':
            (0, paymentChannelCreate_1.validatePaymentChannelCreate)(tx);
            break;
        case 'PaymentChannelFund':
            (0, paymentChannelFund_1.validatePaymentChannelFund)(tx);
            break;
        case 'SetRegularKey':
            (0, setRegularKey_1.validateSetRegularKey)(tx);
            break;
        case 'SignerListSet':
            (0, signerListSet_1.validateSignerListSet)(tx);
            break;
        case 'TicketCreate':
            (0, ticketCreate_1.validateTicketCreate)(tx);
            break;
        case 'TrustSet':
            (0, trustSet_1.validateTrustSet)(tx);
            break;
        default:
            throw new errors_1.ValidationError(`Invalid field TransactionType: ${tx.TransactionType}`);
    }
    if (!lodash_1.default.isEqual((0, ripple_binary_codec_1.decode)((0, ripple_binary_codec_1.encode)(tx)), lodash_1.default.omitBy(tx, (value) => value == null))) {
        throw new errors_1.ValidationError(`Invalid Transaction: ${tx.TransactionType}`);
    }
}
exports.validate = validate;
//# sourceMappingURL=transaction.js.map