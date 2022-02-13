"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignerListSet = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
const MAX_SIGNERS = 8;
function validateSignerListSet(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.SignerQuorum === undefined) {
        throw new errors_1.ValidationError('SignerListSet: missing field SignerQuorum');
    }
    if (typeof tx.SignerQuorum !== 'number') {
        throw new errors_1.ValidationError('SignerListSet: invalid SignerQuorum');
    }
    if (tx.SignerEntries === undefined) {
        throw new errors_1.ValidationError('SignerListSet: missing field SignerEntries');
    }
    if (!Array.isArray(tx.SignerEntries)) {
        throw new errors_1.ValidationError('SignerListSet: invalid SignerEntries');
    }
    if (tx.SignerEntries.length === 0) {
        throw new errors_1.ValidationError('SignerListSet: need atleast 1 member in SignerEntries');
    }
    if (tx.SignerEntries.length > MAX_SIGNERS) {
        throw new errors_1.ValidationError('SignerListSet: maximum of 8 members allowed in SignerEntries');
    }
}
exports.validateSignerListSet = validateSignerListSet;
//# sourceMappingURL=signerListSet.js.map