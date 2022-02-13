"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccountDelete = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateAccountDelete(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Destination === undefined) {
        throw new errors_1.ValidationError('AccountDelete: missing field Destination');
    }
    if (typeof tx.Destination !== 'string') {
        throw new errors_1.ValidationError('AccountDelete: invalid Destination');
    }
    if (tx.DestinationTag !== undefined &&
        typeof tx.DestinationTag !== 'number') {
        throw new errors_1.ValidationError('AccountDelete: invalid DestinationTag');
    }
}
exports.validateAccountDelete = validateAccountDelete;
//# sourceMappingURL=accountDelete.js.map