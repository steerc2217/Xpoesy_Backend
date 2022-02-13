"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySerializer = exports.BytesList = void 0;
var assert = require("assert");
var buffer_1 = require("buffer/");
/**
 * Bytes list is a collection of buffer objects
 */
var BytesList = /** @class */ (function () {
    function BytesList() {
        this.bytesArray = [];
    }
    /**
     * Get the total number of bytes in the BytesList
     *
     * @return the number of bytes
     */
    BytesList.prototype.getLength = function () {
        return buffer_1.Buffer.concat(this.bytesArray).byteLength;
    };
    /**
     * Put bytes in the BytesList
     *
     * @param bytesArg A Buffer
     * @return this BytesList
     */
    BytesList.prototype.put = function (bytesArg) {
        var bytes = buffer_1.Buffer.from(bytesArg); // Temporary, to catch instances of Uint8Array being passed in
        this.bytesArray.push(bytes);
        return this;
    };
    /**
     * Write this BytesList to the back of another bytes list
     *
     *  @param list The BytesList to write to
     */
    BytesList.prototype.toBytesSink = function (list) {
        list.put(this.toBytes());
    };
    BytesList.prototype.toBytes = function () {
        return buffer_1.Buffer.concat(this.bytesArray);
    };
    BytesList.prototype.toHex = function () {
        return this.toBytes().toString('hex').toUpperCase();
    };
    return BytesList;
}());
exports.BytesList = BytesList;
/**
 * BinarySerializer is used to write fields and values to buffers
 */
var BinarySerializer = /** @class */ (function () {
    function BinarySerializer(sink) {
        this.sink = new BytesList();
        this.sink = sink;
    }
    /**
     * Write a value to this BinarySerializer
     *
     * @param value a SerializedType value
     */
    BinarySerializer.prototype.write = function (value) {
        value.toBytesSink(this.sink);
    };
    /**
     * Write bytes to this BinarySerializer
     *
     * @param bytes the bytes to write
     */
    BinarySerializer.prototype.put = function (bytes) {
        this.sink.put(bytes);
    };
    /**
     * Write a value of a given type to this BinarySerializer
     *
     * @param type the type to write
     * @param value a value of that type
     */
    BinarySerializer.prototype.writeType = function (type, value) {
        this.write(type.from(value));
    };
    /**
     * Write BytesList to this BinarySerializer
     *
     * @param bl BytesList to write to BinarySerializer
     */
    BinarySerializer.prototype.writeBytesList = function (bl) {
        bl.toBytesSink(this.sink);
    };
    /**
     * Calculate the header of Variable Length encoded bytes
     *
     * @param length the length of the bytes
     */
    BinarySerializer.prototype.encodeVariableLength = function (length) {
        var lenBytes = buffer_1.Buffer.alloc(3);
        if (length <= 192) {
            lenBytes[0] = length;
            return lenBytes.slice(0, 1);
        }
        else if (length <= 12480) {
            length -= 193;
            lenBytes[0] = 193 + (length >>> 8);
            lenBytes[1] = length & 0xff;
            return lenBytes.slice(0, 2);
        }
        else if (length <= 918744) {
            length -= 12481;
            lenBytes[0] = 241 + (length >>> 16);
            lenBytes[1] = (length >> 8) & 0xff;
            lenBytes[2] = length & 0xff;
            return lenBytes.slice(0, 3);
        }
        throw new Error('Overflow error');
    };
    /**
     * Write field and value to BinarySerializer
     *
     * @param field field to write to BinarySerializer
     * @param value value to write to BinarySerializer
     */
    BinarySerializer.prototype.writeFieldAndValue = function (field, value, isUnlModifyWorkaround) {
        if (isUnlModifyWorkaround === void 0) { isUnlModifyWorkaround = false; }
        var associatedValue = field.associatedType.from(value);
        assert.ok(associatedValue.toBytesSink !== undefined);
        assert.ok(field.name !== undefined);
        this.sink.put(field.header);
        if (field.isVariableLengthEncoded) {
            this.writeLengthEncoded(associatedValue, isUnlModifyWorkaround);
        }
        else {
            associatedValue.toBytesSink(this.sink);
        }
    };
    /**
     * Write a variable length encoded value to the BinarySerializer
     *
     * @param value length encoded value to write to BytesList
     */
    BinarySerializer.prototype.writeLengthEncoded = function (value, isUnlModifyWorkaround) {
        if (isUnlModifyWorkaround === void 0) { isUnlModifyWorkaround = false; }
        var bytes = new BytesList();
        if (!isUnlModifyWorkaround) {
            // this part doesn't happen for the Account field in a UNLModify transaction
            value.toBytesSink(bytes);
        }
        this.put(this.encodeVariableLength(bytes.getLength()));
        this.writeBytesList(bytes);
    };
    return BinarySerializer;
}());
exports.BinarySerializer = BinarySerializer;
//# sourceMappingURL=binary-serializer.js.map