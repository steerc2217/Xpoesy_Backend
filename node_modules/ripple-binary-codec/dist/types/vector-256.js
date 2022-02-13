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
exports.Vector256 = void 0;
var serialized_type_1 = require("./serialized-type");
var hash_256_1 = require("./hash-256");
var binary_serializer_1 = require("../serdes/binary-serializer");
/**
 * TypeGuard for Array<string>
 */
function isStrings(arg) {
    return Array.isArray(arg) && (arg.length === 0 || typeof arg[0] === 'string');
}
/**
 * Class for serializing and deserializing vectors of Hash256
 */
var Vector256 = /** @class */ (function (_super) {
    __extends(Vector256, _super);
    function Vector256(bytes) {
        return _super.call(this, bytes) || this;
    }
    /**
     * Construct a Vector256 from a BinaryParser
     *
     * @param parser BinaryParser to
     * @param hint length of the vector, in bytes, optional
     * @returns a Vector256 object
     */
    Vector256.fromParser = function (parser, hint) {
        var bytesList = new binary_serializer_1.BytesList();
        var bytes = hint !== null && hint !== void 0 ? hint : parser.size();
        var hashes = bytes / 32;
        for (var i = 0; i < hashes; i++) {
            hash_256_1.Hash256.fromParser(parser).toBytesSink(bytesList);
        }
        return new Vector256(bytesList.toBytes());
    };
    /**
     * Construct a Vector256 object from an array of hashes
     *
     * @param value A Vector256 object or array of hex-strings representing Hash256's
     * @returns a Vector256 object
     */
    Vector256.from = function (value) {
        if (value instanceof Vector256) {
            return value;
        }
        if (isStrings(value)) {
            var bytesList_1 = new binary_serializer_1.BytesList();
            value.forEach(function (hash) {
                hash_256_1.Hash256.from(hash).toBytesSink(bytesList_1);
            });
            return new Vector256(bytesList_1.toBytes());
        }
        throw new Error('Cannot construct Vector256 from given value');
    };
    /**
     * Return an Array of hex-strings represented by this.bytes
     *
     * @returns An Array of strings representing the Hash256 objects
     */
    Vector256.prototype.toJSON = function () {
        if (this.bytes.byteLength % 32 !== 0) {
            throw new Error('Invalid bytes for Vector256');
        }
        var result = [];
        for (var i = 0; i < this.bytes.byteLength; i += 32) {
            result.push(this.bytes
                .slice(i, i + 32)
                .toString('hex')
                .toUpperCase());
        }
        return result;
    };
    return Vector256;
}(serialized_type_1.SerializedType));
exports.Vector256 = Vector256;
//# sourceMappingURL=vector-256.js.map