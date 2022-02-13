"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCheckCreate = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateCheckCreate(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.SendMax === undefined) {
        throw new errors_1.ValidationError('CheckCreate: missing field SendMax');
    }
    if (tx.Destination === undefined) {
        throw new errors_1.ValidationError('CheckCreate: missing field Destination');
    }
    if (typeof tx.SendMax !== 'string' &&
        !(0, common_1.isIssuedCurrency)(tx.SendMax)) {
        throw new errors_1.ValidationError('CheckCreate: invalid SendMax');
    }
    if (typeof tx.Destination !== 'string') {
        throw new errors_1.ValidationError('CheckCreate: invalid Destination');
    }
    if (tx.DestinationTag !== undefined &&
        typeof tx.DestinationTag !== 'number') {
        throw new errors_1.ValidationError('CheckCreate: invalid DestinationTag');
    }
    if (tx.Expiration !== undefined && typeof tx.Expiration !== 'number') {
        throw new errors_1.ValidationError('CheckCreate: invalid Expiration');
    }
    if (tx.InvoiceID !== undefined && typeof tx.InvoiceID !== 'string') {
        throw new errors_1.ValidationError('CheckCreate: invalid InvoiceID');
    }
}
exports.validateCheckCreate = validateCheckCreate;
//# sourceMappingURL=checkCreate.js.map