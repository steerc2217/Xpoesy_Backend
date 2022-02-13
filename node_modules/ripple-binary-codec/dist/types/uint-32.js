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
exports.UInt32 = void 0;
var uint_1 = require("./uint");
var buffer_1 = require("buffer/");
/**
 * Derived UInt class for serializing/deserializing 32 bit UInt
 */
var UInt32 = /** @class */ (function (_super) {
    __extends(UInt32, _super);
    function UInt32(bytes) {
        return _super.call(this, bytes !== null && bytes !== void 0 ? bytes : UInt32.defaultUInt32.bytes) || this;
    }
    UInt32.fromParser = function (parser) {
        return new UInt32(parser.read(UInt32.width));
    };
    /**
     * Construct a UInt32 object from a number
     *
     * @param val UInt32 object or number
     */
    UInt32.from = function (val) {
        if (val instanceof UInt32) {
            return val;
        }
        var buf = buffer_1.Buffer.alloc(UInt32.width);
        if (typeof val === 'string') {
            var num = Number.parseInt(val);
            buf.writeUInt32BE(num, 0);
            return new UInt32(buf);
        }
        if (typeof val === 'number') {
            buf.writeUInt32BE(val, 0);
            return new UInt32(buf);
        }
        throw new Error('Cannot construct UInt32 from given value');
    };
    /**
     * get the value of a UInt32 object
     *
     * @returns the number represented by this.bytes
     */
    UInt32.prototype.valueOf = function () {
        return this.bytes.readUInt32BE(0);
    };
    UInt32.width = 32 / 8; // 4
    UInt32.defaultUInt32 = new UInt32(buffer_1.Buffer.alloc(UInt32.width));
    return UInt32;
}(uint_1.UInt));
exports.UInt32 = UInt32;
//# sourceMappingURL=uint-32.js.map