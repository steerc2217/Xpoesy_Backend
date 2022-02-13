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
exports.Comparable = exports.SerializedType = void 0;
var binary_serializer_1 = require("../serdes/binary-serializer");
var buffer_1 = require("buffer/");
/**
 * The base class for all binary-codec types
 */
var SerializedType = /** @class */ (function () {
    function SerializedType(bytes) {
        this.bytes = buffer_1.Buffer.alloc(0);
        this.bytes = bytes !== null && bytes !== void 0 ? bytes : buffer_1.Buffer.alloc(0);
    }
    SerializedType.fromParser = function (parser, hint) {
        throw new Error('fromParser not implemented');
        return this.fromParser(parser, hint);
    };
    SerializedType.from = function (value) {
        throw new Error('from not implemented');
        return this.from(value);
    };
    /**
     * Write the bytes representation of a SerializedType to a BytesList
     *
     * @param list The BytesList to write SerializedType bytes to
     */
    SerializedType.prototype.toBytesSink = function (list) {
        list.put(this.bytes);
    };
    /**
     * Get the hex representation of a SerializedType's bytes
     *
     * @returns hex String of this.bytes
     */
    SerializedType.prototype.toHex = function () {
        return this.toBytes().toString('hex').toUpperCase();
    };
    /**
     * Get the bytes representation of a SerializedType
     *
     * @returns A buffer of the bytes
     */
    SerializedType.prototype.toBytes = function () {
        if (this.bytes) {
            return this.bytes;
        }
        var bytes = new binary_serializer_1.BytesList();
        this.toBytesSink(bytes);
        return bytes.toBytes();
    };
    /**
     * Return the JSON representation of a SerializedType
     *
     * @returns any type, if not overloaded returns hexString representation of bytes
     */
    SerializedType.prototype.toJSON = function () {
        return this.toHex();
    };
    /**
     * @returns hexString representation of this.bytes
     */
    SerializedType.prototype.toString = function () {
        return this.toHex();
    };
    return SerializedType;
}());
exports.SerializedType = SerializedType;
/**
 * Base class for SerializedTypes that are comparable
 */
var Comparable = /** @class */ (function (_super) {
    __extends(Comparable, _super);
    function Comparable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comparable.prototype.lt = function (other) {
        return this.compareTo(other) < 0;
    };
    Comparable.prototype.eq = function (other) {
        return this.compareTo(other) === 0;
    };
    Comparable.prototype.gt = function (other) {
        return this.compareTo(other) > 0;
    };
    Comparable.prototype.gte = function (other) {
        return this.compareTo(other) > -1;
    };
    Comparable.prototype.lte = function (other) {
        return this.compareTo(other) < 1;
    };
    /**
     * Overload this method to define how two Comparable SerializedTypes are compared
     *
     * @param other The comparable object to compare this to
     * @returns A number denoting the relationship of this and other
     */
    Comparable.prototype.compareTo = function (other) {
        throw new Error("cannot compare ".concat(this.toString(), " and ").concat(other.toString()));
    };
    return Comparable;
}(SerializedType));
exports.Comparable = Comparable;
//# sourceMappingURL=serialized-type.js.map