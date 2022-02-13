"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ripple_binary_codec_1 = __importDefault(require("ripple-binary-codec"));
const ripple_keypairs_1 = __importDefault(require("ripple-keypairs"));
const xrpConversion_1 = require("./xrpConversion");
function verifyPaymentChannelClaim(channel, amount, signature, publicKey) {
    const signingData = ripple_binary_codec_1.default.encodeForSigningClaim({
        channel,
        amount: (0, xrpConversion_1.xrpToDrops)(amount),
    });
    return ripple_keypairs_1.default.verify(signingData, signature, publicKey);
}
exports.default = verifyPaymentChannelClaim;
//# sourceMappingURL=verifyPaymentChannelClaim.js.map