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
exports.STObject = void 0;
var enums_1 = require("../enums");
var serialized_type_1 = require("./serialized-type");
var ripple_address_codec_1 = require("ripple-address-codec");
var binary_parser_1 = require("../serdes/binary-parser");
var binary_serializer_1 = require("../serdes/binary-serializer");
var buffer_1 = require("buffer/");
var OBJECT_END_MARKER_BYTE = buffer_1.Buffer.from([0xe1]);
var OBJECT_END_MARKER = 'ObjectEndMarker';
var ST_OBJECT = 'STObject';
var DESTINATION = 'Destination';
var ACCOUNT = 'Account';
var SOURCE_TAG = 'SourceTag';
var DEST_TAG = 'DestinationTag';
/**
 * Break down an X-Address into an account and a tag
 *
 * @param field Name of field
 * @param xAddress X-Address corresponding to the field
 */
function handleXAddress(field, xAddress) {
    var _a, _b;
    var decoded = (0, ripple_address_codec_1.xAddressToClassicAddress)(xAddress);
    var tagName;
    if (field === DESTINATION)
        tagName = DEST_TAG;
    else if (field === ACCOUNT)
        tagName = SOURCE_TAG;
    else if (decoded.tag !== false)
        throw new Error("".concat(field, " cannot have an associated tag"));
    return decoded.tag !== false
        ? (_a = {}, _a[field] = decoded.classicAddress, _a[tagName] = decoded.tag, _a) : (_b = {}, _b[field] = decoded.classicAddress, _b);
}
/**
 * Validate that two objects don't both have the same tag fields
 *
 * @param obj1 First object to check for tags
 * @param obj2 Second object to check for tags
 * @throws When both objects have SourceTag or DestinationTag
 */
function checkForDuplicateTags(obj1, obj2) {
    if (!(obj1[SOURCE_TAG] === undefined || obj2[SOURCE_TAG] === undefined))
        throw new Error('Cannot have Account X-Address and SourceTag');
    if (!(obj1[DEST_TAG] === undefined || obj2[DEST_TAG] === undefined))
        throw new Error('Cannot have Destination X-Address and DestinationTag');
}
/**
 * Class for Serializing/Deserializing objects
 */
var STObject = /** @class */ (function (_super) {
    __extends(STObject, _super);
    function STObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Construct a STObject from a BinaryParser
     *
     * @param parser BinaryParser to read STObject from
     * @returns A STObject object
     */
    STObject.fromParser = function (parser) {
        var list = new binary_serializer_1.BytesList();
        var bytes = new binary_serializer_1.BinarySerializer(list);
        while (!parser.end()) {
            var field = parser.readField();
            if (field.name === OBJECT_END_MARKER) {
                break;
            }
            var associatedValue = parser.readFieldValue(field);
            bytes.writeFieldAndValue(field, associatedValue);
            if (field.type.name === ST_OBJECT) {
                bytes.put(OBJECT_END_MARKER_BYTE);
            }
        }
        return new STObject(list.toBytes());
    };
    /**
     * Construct a STObject from a JSON object
     *
     * @param value An object to include
     * @param filter optional, denote which field to include in serialized object
     * @returns a STObject object
     */
    STObject.from = function (value, filter) {
        if (value instanceof STObject) {
            return value;
        }
        var list = new binary_serializer_1.BytesList();
        var bytes = new binary_serializer_1.BinarySerializer(list);
        var isUnlModify = false;
        var xAddressDecoded = Object.entries(value).reduce(function (acc, _a) {
            var _b;
            var key = _a[0], val = _a[1];
            var handled = undefined;
            if (val && (0, ripple_address_codec_1.isValidXAddress)(val.toString())) {
                handled = handleXAddress(key, val.toString());
                checkForDuplicateTags(handled, value);
            }
            return Object.assign(acc, handled !== null && handled !== void 0 ? handled : (_b = {}, _b[key] = val, _b));
        }, {});
        var sorted = Object.keys(xAddressDecoded)
            .map(function (f) { return enums_1.Field[f]; })
            .filter(function (f) {
            return f !== undefined &&
                xAddressDecoded[f.name] !== undefined &&
                f.isSerialized;
        })
            .sort(function (a, b) {
            return a.ordinal - b.ordinal;
        });
        if (filter !== undefined) {
            sorted = sorted.filter(filter);
        }
        sorted.forEach(function (field) {
            var associatedValue = field.associatedType.from(xAddressDecoded[field.name]);
            if (associatedValue.name === 'UNLModify') {
                // triggered when the TransactionType field has a value of 'UNLModify'
                isUnlModify = true;
            }
            // true when in the UNLModify pseudotransaction (after the transaction type has been processed) and working with the
            // Account field
            // The Account field must not be a part of the UNLModify pseudotransaction encoding, due to a bug in rippled
            var isUnlModifyWorkaround = field.name == 'Account' && isUnlModify;
            bytes.writeFieldAndValue(field, associatedValue, isUnlModifyWorkaround);
            if (field.type.name === ST_OBJECT) {
                bytes.put(OBJECT_END_MARKER_BYTE);
            }
        });
        return new STObject(list.toBytes());
    };
    /**
     * Get the JSON interpretation of this.bytes
     *
     * @returns a JSON object
     */
    STObject.prototype.toJSON = function () {
        var objectParser = new binary_parser_1.BinaryParser(this.toString());
        var accumulator = {};
        while (!objectParser.end()) {
            var field = objectParser.readField();
            if (field.name === OBJECT_END_MARKER) {
                break;
            }
            accumulator[field.name] = objectParser.readFieldValue(field).toJSON();
        }
        return accumulator;
    };
    return STObject;
}(serialized_type_1.SerializedType));
exports.STObject = STObject;
//# sourceMappingURL=st-object.js.map