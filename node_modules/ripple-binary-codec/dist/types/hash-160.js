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
exports.Hash160 = void 0;
var hash_1 = require("./hash");
var buffer_1 = require("buffer/");
/**
 * Hash with a width of 160 bits
 */
var Hash160 = /** @class */ (function (_super) {
    __extends(Hash160, _super);
    function Hash160(bytes) {
        var _this = this;
        if (bytes && bytes.byteLength === 0) {
            bytes = Hash160.ZERO_160.bytes;
        }
        _this = _super.call(this, bytes !== null && bytes !== void 0 ? bytes : Hash160.ZERO_160.bytes) || this;
        return _this;
    }
    Hash160.width = 20;
    Hash160.ZERO_160 = new Hash160(buffer_1.Buffer.alloc(Hash160.width));
    return Hash160;
}(hash_1.Hash));
exports.Hash160 = Hash160;
//# sourceMappingURL=hash-160.js.map