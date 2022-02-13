"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryParser = void 0;
var assert = require("assert");
var enums_1 = require("../enums");
var buffer_1 = require("buffer/");
/**
 * BinaryParser is used to compute fields and values from a HexString
 */
var BinaryParser = /** @class */ (function () {
    /**
     * Initialize bytes to a hex string
     *
     * @param hexBytes a hex string
     */
    function BinaryParser(hexBytes) {
        this.bytes = buffer_1.Buffer.from(hexBytes, 'hex');
    }
    /**
     * Peek the first byte of the BinaryParser
     *
     * @returns The first byte of the BinaryParser
     */
    BinaryParser.prototype.peek = function () {
        assert.ok(this.bytes.byteLength !== 0);
        return this.bytes[0];
    };
    /**
     * Consume the first n bytes of the BinaryParser
     *
     * @param n the number of bytes to skip
     */
    BinaryParser.prototype.skip = function (n) {
        assert.ok(n <= this.bytes.byteLength);
        this.bytes = this.bytes.slice(n);
    };
    /**
     * read the first n bytes from the BinaryParser
     *
     * @param n The number of bytes to read
     * @return The bytes
     */
    BinaryParser.prototype.read = function (n) {
        assert.ok(n <= this.bytes.byteLength);
        var slice = this.bytes.slice(0, n);
        this.skip(n);
        return slice;
    };
    /**
     * Read an integer of given size
     *
     * @param n The number of bytes to read
     * @return The number represented by those bytes
     */
    BinaryParser.prototype.readUIntN = function (n) {
        assert.ok(0 < n && n <= 4, 'invalid n');
        return this.read(n).reduce(function (a, b) { return (a << 8) | b; }) >>> 0;
    };
    BinaryParser.prototype.readUInt8 = function () {
        return this.readUIntN(1);
    };
    BinaryParser.prototype.readUInt16 = function () {
        return this.readUIntN(2);
    };
    BinaryParser.prototype.readUInt32 = function () {
        return this.readUIntN(4);
    };
    BinaryParser.prototype.size = function () {
        return this.bytes.byteLength;
    };
    BinaryParser.prototype.end = function (customEnd) {
        var length = this.bytes.byteLength;
        return length === 0 || (customEnd !== undefined && length <= customEnd);
    };
    /**
     * Reads variable length encoded bytes
     *
     * @return The variable length bytes
     */
    BinaryParser.prototype.readVariableLength = function () {
        return this.read(this.readVariableLengthLength());
    };
    /**
     * Reads the length of the variable length encoded bytes
     *
     * @return The length of the variable length encoded bytes
     */
    BinaryParser.prototype.readVariableLengthLength = function () {
        var b1 = this.readUInt8();
        if (b1 <= 192) {
            return b1;
        }
        else if (b1 <= 240) {
            var b2 = this.readUInt8();
            return 193 + (b1 - 193) * 256 + b2;
        }
        else if (b1 <= 254) {
            var b2 = this.readUInt8();
            var b3 = this.readUInt8();
            return 12481 + (b1 - 241) * 65536 + b2 * 256 + b3;
        }
        throw new Error('Invalid variable length indicator');
    };
    /**
     * Reads the field ordinal from the BinaryParser
     *
     * @return Field ordinal
     */
    BinaryParser.prototype.readFieldOrdinal = function () {
        var type = this.readUInt8();
        var nth = type & 15;
        type >>= 4;
        if (type === 0) {
            type = this.readUInt8();
            if (type === 0 || type < 16) {
                throw new Error('Cannot read FieldOrdinal, type_code out of range');
            }
        }
        if (nth === 0) {
            nth = this.readUInt8();
            if (nth === 0 || nth < 16) {
                throw new Error('Cannot read FieldOrdinal, field_code out of range');
            }
        }
        return (type << 16) | nth;
    };
    /**
     * Read the field from the BinaryParser
     *
     * @return The field represented by the bytes at the head of the BinaryParser
     */
    BinaryParser.prototype.readField = function () {
        return enums_1.Field.fromString(this.readFieldOrdinal().toString());
    };
    /**
     * Read a given type from the BinaryParser
     *
     * @param type The type that you want to read from the BinaryParser
     * @return The instance of that type read from the BinaryParser
     */
    BinaryParser.prototype.readType = function (type) {
        return type.fromParser(this);
    };
    /**
     * Get the type associated with a given field
     *
     * @param field The field that you wan to get the type of
     * @return The type associated with the given field
     */
    BinaryParser.prototype.typeForField = function (field) {
        return field.associatedType;
    };
    /**
     * Read value of the type specified by field from the BinaryParser
     *
     * @param field The field that you want to get the associated value for
     * @return The value associated with the given field
     */
    BinaryParser.prototype.readFieldValue = function (field) {
        var type = this.typeForField(field);
        if (!type) {
            throw new Error("unsupported: (".concat(field.name, ", ").concat(field.type.name, ")"));
        }
        var sizeHint = field.isVariableLengthEncoded
            ? this.readVariableLengthLength()
            : undefined;
        var value = type.fromParser(this, sizeHint);
        if (value === undefined) {
            throw new Error("fromParser for (".concat(field.name, ", ").concat(field.type.name, ") -> undefined "));
        }
        return value;
    };
    /**
     * Get the next field and value from the BinaryParser
     *
     * @return The field and value
     */
    BinaryParser.prototype.readFieldAndValue = function () {
        var field = this.readField();
        return [field, this.readFieldValue(field)];
    };
    return BinaryParser;
}());
exports.BinaryParser = BinaryParser;
//# sourceMappingURL=binary-parser.js.map