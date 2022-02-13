"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNFTokenCancelOffer = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateNFTokenCancelOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (!Array.isArray(tx.TokenOffers)) {
        throw new errors_1.ValidationError('NFTokenCancelOffer: missing field TokenOffers');
    }
    if (tx.TokenOffers.length < 1) {
        throw new errors_1.ValidationError('NFTokenCancelOffer: empty field TokenOffers');
    }
}
exports.validateNFTokenCancelOffer = validateNFTokenCancelOffer;
//# sourceMappingURL=NFTokenCancelOffer.js.map