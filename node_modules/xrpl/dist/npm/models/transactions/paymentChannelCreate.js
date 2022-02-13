"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePaymentChannelCreate = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validatePaymentChannelCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Amount === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing Amount');
    }
    if (typeof tx.Amount !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelCreate: Amount must be a string');
    }
    if (tx.Destination === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing Destination');
    }
    if (typeof tx.Destination !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelCreate: Destination must be a string');
    }
    if (tx.SettleDelay === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing SettleDelay');
    }
    if (typeof tx.SettleDelay !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelCreate: SettleDelay must be a number');
    }
    if (tx.PublicKey === undefined) {
        throw new errors_1.ValidationError('PaymentChannelCreate: missing PublicKey');
    }
    if (typeof tx.PublicKey !== 'string') {
        throw new errors_1.ValidationError('PaymentChannelCreate: PublicKey must be a string');
    }
    if (tx.CancelAfter !== undefined && typeof tx.CancelAfter !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelCreate: CancelAfter must be a number');
    }
    if (tx.DestinationTag !== undefined &&
        typeof tx.DestinationTag !== 'number') {
        throw new errors_1.ValidationError('PaymentChannelCreate: DestinationTag must be a number');
    }
}
exports.validatePaymentChannelCreate = validatePaymentChannelCreate;
//# sourceMappingURL=paymentChannelCreate.js.map