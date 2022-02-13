"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEscrowCancel = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateEscrowCancel(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Owner === undefined) {
        throw new errors_1.ValidationError('EscrowCancel: missing Owner');
    }
    if (typeof tx.Owner !== 'string') {
        throw new errors_1.ValidationError('EscrowCancel: Owner must be a string');
    }
    if (tx.OfferSequence === undefined) {
        throw new errors_1.ValidationError('EscrowCancel: missing OfferSequence');
    }
    if (typeof tx.OfferSequence !== 'number') {
        throw new errors_1.ValidationError('EscrowCancel: OfferSequence must be a number');
    }
}
exports.validateEscrowCancel = validateEscrowCancel;
//# sourceMappingURL=escrowCancel.js.map