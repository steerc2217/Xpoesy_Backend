"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNFTokenCreateOffer = exports.NFTokenCreateOfferFlags = void 0;
const errors_1 = require("../../errors");
const utils_1 = require("../utils");
const common_1 = require("./common");
var NFTokenCreateOfferFlags;
(function (NFTokenCreateOfferFlags) {
    NFTokenCreateOfferFlags[NFTokenCreateOfferFlags["tfSellToken"] = 1] = "tfSellToken";
})(NFTokenCreateOfferFlags = exports.NFTokenCreateOfferFlags || (exports.NFTokenCreateOfferFlags = {}));
function validateSellOfferCases(tx) {
    if (tx.Owner != null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner must not be present for sell offers');
    }
}
function validateBuyOfferCases(tx) {
    if (tx.Owner == null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner must be present for buy offers');
    }
    if ((0, common_1.parseAmountValue)(tx.Amount) <= 0) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Amount must be greater than 0 for buy offers');
    }
}
function validateNFTokenCreateOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Account === tx.Owner) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Owner and Account must not be equal');
    }
    if (tx.Account === tx.Destination) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: Destination and Account must not be equal');
    }
    if (tx.TokenID == null) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: missing field TokenID');
    }
    if (!(0, common_1.isAmount)(tx.Amount)) {
        throw new errors_1.ValidationError('NFTokenCreateOffer: invalid Amount');
    }
    if (typeof tx.Flags === 'number' &&
        (0, utils_1.isFlagEnabled)(tx.Flags, NFTokenCreateOfferFlags.tfSellToken)) {
        validateSellOfferCases(tx);
    }
    else {
        validateBuyOfferCases(tx);
    }
}
exports.validateNFTokenCreateOffer = validateNFTokenCreateOffer;
//# sourceMappingURL=NFTokenCreateOffer.js.map