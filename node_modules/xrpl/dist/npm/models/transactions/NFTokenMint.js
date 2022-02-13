"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNFTokenMint = exports.NFTokenMintFlags = void 0;
const errors_1 = require("../../errors");
const common_1 = require("./common");
var NFTokenMintFlags;
(function (NFTokenMintFlags) {
    NFTokenMintFlags[NFTokenMintFlags["tfBurnable"] = 1] = "tfBurnable";
    NFTokenMintFlags[NFTokenMintFlags["tfOnlyXRP"] = 2] = "tfOnlyXRP";
    NFTokenMintFlags[NFTokenMintFlags["tfTrustLine"] = 4] = "tfTrustLine";
    NFTokenMintFlags[NFTokenMintFlags["tfTransferable"] = 8] = "tfTransferable";
})(NFTokenMintFlags = exports.NFTokenMintFlags || (exports.NFTokenMintFlags = {}));
function validateNFTokenMint(tx) {
    (0, common_1.validateBaseTransaction)(tx);
    if (tx.Account === tx.Issuer) {
        throw new errors_1.ValidationError('NFTokenMint: Issuer must not be equal to Account');
    }
    if (tx.TokenTaxon == null) {
        throw new errors_1.ValidationError('NFTokenMint: missing field TokenTaxon');
    }
}
exports.validateNFTokenMint = validateNFTokenMint;
//# sourceMappingURL=NFTokenMint.js.map