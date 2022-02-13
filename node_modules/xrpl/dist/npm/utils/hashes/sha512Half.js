"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const HASH_SIZE = 64;
function sha512Half(hex) {
    return (0, crypto_1.createHash)('sha512')
        .update(Buffer.from(hex, 'hex'))
        .digest('hex')
        .toUpperCase()
        .slice(0, HASH_SIZE);
}
exports.default = sha512Half;
//# sourceMappingURL=sha512Half.js.map