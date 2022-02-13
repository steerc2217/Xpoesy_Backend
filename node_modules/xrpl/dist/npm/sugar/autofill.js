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
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ripple_address_codec_1 = require("ripple-address-codec");
const errors_1 = require("../errors");
const flags_1 = require("../models/utils/flags");
const utils_1 = require("../utils");
const getFeeXrp_1 = __importDefault(require("./getFeeXrp"));
const LEDGER_OFFSET = 20;
function autofill(transaction, signersCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = Object.assign({}, transaction);
        setValidAddresses(tx);
        (0, flags_1.setTransactionFlagsToNumber)(tx);
        const promises = [];
        if (tx.Sequence == null) {
            promises.push(setNextValidSequenceNumber(this, tx));
        }
        if (tx.Fee == null) {
            promises.push(calculateFeePerTransactionType(this, tx, signersCount));
        }
        if (tx.LastLedgerSequence == null) {
            promises.push(setLatestValidatedLedgerSequence(this, tx));
        }
        if (tx.TransactionType === 'AccountDelete') {
            promises.push(checkAccountDeleteBlockers(this, tx));
        }
        return Promise.all(promises).then(() => tx);
    });
}
function setValidAddresses(tx) {
    validateAccountAddress(tx, 'Account', 'SourceTag');
    if (tx['Destination'] != null) {
        validateAccountAddress(tx, 'Destination', 'DestinationTag');
    }
    convertToClassicAddress(tx, 'Authorize');
    convertToClassicAddress(tx, 'Unauthorize');
    convertToClassicAddress(tx, 'Owner');
    convertToClassicAddress(tx, 'RegularKey');
}
function validateAccountAddress(tx, accountField, tagField) {
    const { classicAccount, tag } = getClassicAccountAndTag(tx[accountField]);
    tx[accountField] = classicAccount;
    if (tag != null && tag !== false) {
        if (tx[tagField] && tx[tagField] !== tag) {
            throw new errors_1.ValidationError(`The ${tagField}, if present, must match the tag of the ${accountField} X-address`);
        }
        tx[tagField] = tag;
    }
}
function getClassicAccountAndTag(Account, expectedTag) {
    if ((0, ripple_address_codec_1.isValidXAddress)(Account)) {
        const classic = (0, ripple_address_codec_1.xAddressToClassicAddress)(Account);
        if (expectedTag != null && classic.tag !== expectedTag) {
            throw new errors_1.ValidationError('address includes a tag that does not match the tag specified in the transaction');
        }
        return {
            classicAccount: classic.classicAddress,
            tag: classic.tag,
        };
    }
    return {
        classicAccount: Account,
        tag: expectedTag,
    };
}
function convertToClassicAddress(tx, fieldName) {
    const account = tx[fieldName];
    if (typeof account === 'string') {
        const { classicAccount } = getClassicAccountAndTag(account);
        tx[fieldName] = classicAccount;
    }
}
function setNextValidSequenceNumber(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            command: 'account_info',
            account: tx.Account,
            ledger_index: 'current',
        };
        const data = yield client.request(request);
        tx.Sequence = data.result.account_data.Sequence;
    });
}
function fetchAccountDeleteFee(client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield client.request({ command: 'server_state' });
        const fee = (_a = response.result.state.validated_ledger) === null || _a === void 0 ? void 0 : _a.reserve_inc;
        if (fee == null) {
            return Promise.reject(new Error('Could not fetch Owner Reserve.'));
        }
        return new bignumber_js_1.default(fee);
    });
}
function calculateFeePerTransactionType(client, tx, signersCount = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const netFeeXRP = yield (0, getFeeXrp_1.default)(client);
        const netFeeDrops = (0, utils_1.xrpToDrops)(netFeeXRP);
        let baseFee = new bignumber_js_1.default(netFeeDrops);
        if (tx.TransactionType === 'EscrowFinish' && tx.Fulfillment != null) {
            const fulfillmentBytesSize = Math.ceil(tx.Fulfillment.length / 2);
            const product = new bignumber_js_1.default(scaleValue(netFeeDrops, 33 + fulfillmentBytesSize / 16));
            baseFee = product.dp(0, bignumber_js_1.default.ROUND_CEIL);
        }
        if (tx.TransactionType === 'AccountDelete') {
            baseFee = yield fetchAccountDeleteFee(client);
        }
        if (signersCount > 0) {
            baseFee = bignumber_js_1.default.sum(baseFee, scaleValue(netFeeDrops, 1 + signersCount));
        }
        const maxFeeDrops = (0, utils_1.xrpToDrops)(client.maxFeeXRP);
        const totalFee = tx.TransactionType === 'AccountDelete'
            ? baseFee
            : bignumber_js_1.default.min(baseFee, maxFeeDrops);
        tx.Fee = totalFee.dp(0, bignumber_js_1.default.ROUND_CEIL).toString(10);
    });
}
function scaleValue(value, multiplier) {
    return new bignumber_js_1.default(value).times(multiplier).toString();
}
function setLatestValidatedLedgerSequence(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const ledgerSequence = yield client.getLedgerIndex();
        tx.LastLedgerSequence = ledgerSequence + LEDGER_OFFSET;
    });
}
function checkAccountDeleteBlockers(client, tx) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            command: 'account_objects',
            account: tx.Account,
            ledger_index: 'validated',
            deletion_blockers_only: true,
        };
        const response = yield client.request(request);
        return new Promise((resolve, reject) => {
            if (response.result.account_objects.length > 0) {
                reject(new errors_1.XrplError(`Account ${tx.Account} cannot be deleted; there are Escrows, PayChannels, RippleStates, or Checks associated with the account.`, response.result.account_objects));
            }
            resolve();
        });
    });
}
exports.default = autofill;
//# sourceMappingURL=autofill.js.map