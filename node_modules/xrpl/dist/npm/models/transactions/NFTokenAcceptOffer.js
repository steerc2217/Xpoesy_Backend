"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNFTokenAcceptOffer = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
function validateBrokerFee(tx) {
    const value = (0, common_1.parseAmountValue)(tx.BrokerFee);
    if (Number.isNaN(value)) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: invalid BrokerFee');
    }
    if (value <= 0) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: BrokerFee must be greater than 0; omit if there is no fee');
    }
    if (tx.SellOffer == null || tx.BuyOffer == null) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: both SellOffer and BuyOffer must be set if using brokered mode');
    }
}
function validateNFTokenAcceptOffer(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.BrokerFee != null) {
        validateBrokerFee(tx);
    }
    if (tx.SellOffer == null && tx.BuyOffer == null) {
        throw new errors_1.ValidationError('NFTokenAcceptOffer: must set either SellOffer or BuyOffer');
    }
}
exports.validateNFTokenAcceptOffer = validateNFTokenAcceptOffer;
//# sourceMappingURL=NFTokenAcceptOffer.js.map