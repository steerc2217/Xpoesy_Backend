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
exports.UInt16 = void 0;
var uint_1 = require("./uint");
var buffer_1 = require("buffer/");
/**
 * Derived UInt class for serializing/deserializing 16 bit UInt
 */
var UInt16 = /** @class */ (function (_super) {
    __extends(UInt16, _super);
    function UInt16(bytes) {
        return _super.call(this, bytes !== null && bytes !== void 0 ? bytes : UInt16.defaultUInt16.bytes) || this;
    }
    UInt16.fromParser = function (parser) {
        return new UInt16(parser.read(UInt16.width));
    };
    /**
     * Construct a UInt16 object from a number
     *
     * @param val UInt16 object or number
     */
    UInt16.from = function (val) {
        if (val instanceof UInt16) {
            return val;
        }
        if (typeof val === 'number') {
            var buf = buffer_1.Buffer.alloc(UInt16.width);
            buf.writeUInt16BE(val, 0);
            return new UInt16(buf);
        }
        throw new Error('Can not construct UInt16 with given value');
    };
    /**
     * get the value of a UInt16 object
     *
     * @returns the number represented by this.bytes
     */
    UInt16.prototype.valueOf = function () {
        return this.bytes.readUInt16BE(0);
    };
    UInt16.width = 16 / 8; // 2
    UInt16.defaultUInt16 = new UInt16(buffer_1.Buffer.alloc(UInt16.width));
    return UInt16;
}(uint_1.UInt));
exports.UInt16 = UInt16;
//# sourceMappingURL=uint-16.js.map