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
exports.STArray = void 0;
var serialized_type_1 = require("./serialized-type");
var st_object_1 = require("./st-object");
var binary_parser_1 = require("../serdes/binary-parser");
var buffer_1 = require("buffer/");
var ARRAY_END_MARKER = buffer_1.Buffer.from([0xf1]);
var ARRAY_END_MARKER_NAME = 'ArrayEndMarker';
var OBJECT_END_MARKER = buffer_1.Buffer.from([0xe1]);
/**
 * TypeGuard for Array<JsonObject>
 */
function isObjects(args) {
    return (Array.isArray(args) && (args.length === 0 || typeof args[0] === 'object'));
}
/**
 * Class for serializing and deserializing Arrays of Objects
 */
var STArray = /** @class */ (function (_super) {
    __extends(STArray, _super);
    function STArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Construct an STArray from a BinaryParser
     *
     * @param parser BinaryParser to parse an STArray from
     * @returns An STArray Object
     */
    STArray.fromParser = function (parser) {
        var bytes = [];
        while (!parser.end()) {
            var field = parser.readField();
            if (field.name === ARRAY_END_MARKER_NAME) {
                break;
            }
            bytes.push(field.header, parser.readFieldValue(field).toBytes(), OBJECT_END_MARKER);
        }
        bytes.push(ARRAY_END_MARKER);
        return new STArray(buffer_1.Buffer.concat(bytes));
    };
    /**
     * Construct an STArray from an Array of JSON Objects
     *
     * @param value STArray or Array of Objects to parse into an STArray
     * @returns An STArray object
     */
    STArray.from = function (value) {
        if (value instanceof STArray) {
            return value;
        }
        if (isObjects(value)) {
            var bytes_1 = [];
            value.forEach(function (obj) {
                bytes_1.push(st_object_1.STObject.from(obj).toBytes());
            });
            bytes_1.push(ARRAY_END_MARKER);
            return new STArray(buffer_1.Buffer.concat(bytes_1));
        }
        throw new Error('Cannot construct STArray from value given');
    };
    /**
     * Return the JSON representation of this.bytes
     *
     * @returns An Array of JSON objects
     */
    STArray.prototype.toJSON = function () {
        var result = [];
        var arrayParser = new binary_parser_1.BinaryParser(this.toString());
        while (!arrayParser.end()) {
            var field = arrayParser.readField();
            if (field.name === ARRAY_END_MARKER_NAME) {
                break;
            }
            var outer = {};
            outer[field.name] = st_object_1.STObject.fromParser(arrayParser).toJSON();
            result.push(outer);
        }
        return result;
    };
    return STArray;
}(serialized_type_1.SerializedType));
exports.STArray = STArray;
//# sourceMappingURL=st-array.js.map