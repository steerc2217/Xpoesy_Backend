"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash256 = void 0;
var hash_1 = require("./hash");
var buffer_1 = require("buffer/");
/**
 * Hash with a width of 256 bits
 */
var Hash256 = /** @class */ (function (_super) {
    __extends(Hash256, _super);
    function Hash256(bytes) {
        return _super.call(this, bytes !== null && bytes !== void 0 ? bytes : Hash256.ZERO_256.bytes) || this;
    }
    Hash256.width = 32;
    Hash256.ZERO_256 = new Hash256(buffer_1.Buffer.alloc(Hash256.width));
    return Hash256;
}(hash_1.Hash));
exports.Hash256 = Hash256;
//# sourceMappingURL=hash-256.js.map