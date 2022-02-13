"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNFTokenBurn = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateNFTokenBurn(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.TokenID == null) {
        throw new errors_1.ValidationError('NFTokenBurn: missing field TokenID');
    }
}
exports.validateNFTokenBurn = validateNFTokenBurn;
//# sourceMappingURL=NFTokenBurn.js.map