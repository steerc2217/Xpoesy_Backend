"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEscrowFinish = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateEscrowFinish(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Owner === undefined) {
        throw new errors_1.ValidationError('EscrowFinish: missing field Owner');
    }
    if (typeof tx.Owner !== 'string') {
        throw new errors_1.ValidationError('EscrowFinish: Owner must be a string');
    }
    if (tx.OfferSequence === undefined) {
        throw new errors_1.ValidationError('EscrowFinish: missing field OfferSequence');
    }
    if (typeof tx.OfferSequence !== 'number') {
        throw new errors_1.ValidationError('EscrowFinish: OfferSequence must be a number');
    }
    if (tx.Condition !== undefined && typeof tx.Condition !== 'string') {
        throw new errors_1.ValidationError('EscrowFinish: Condition must be a string');
    }
    if (tx.Fulfillment !== undefined && typeof tx.Fulfillment !== 'string') {
        throw new errors_1.ValidationError('EscrowFinish: Fulfillment must be a string');
    }
}
exports.validateEscrowFinish = validateEscrowFinish;
//# sourceMappingURL=escrowFinish.js.map