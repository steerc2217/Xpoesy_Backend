"use strict";
/* eslint-disable func-style */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionID = exports.sha512Half = exports.binaryToJSON = exports.signingClaimData = exports.signingData = exports.multiSigningData = exports.readJSON = exports.serializeObject = exports.makeParser = exports.BytesList = exports.BinarySerializer = exports.BinaryParser = void 0;
var types_1 = require("./types");
var binary_parser_1 = require("./serdes/binary-parser");
Object.defineProperty(exports, "BinaryParser", { enumerable: true, get: function () { return binary_parser_1.BinaryParser; } });
var hash_prefixes_1 = require("./hash-prefixes");
var binary_serializer_1 = require("./serdes/binary-serializer");
Object.defineProperty(exports, "BinarySerializer", { enumerable: true, get: function () { return binary_serializer_1.BinarySerializer; } });
Object.defineProperty(exports, "BytesList", { enumerable: true, get: function () { return binary_serializer_1.BytesList; } });
var hashes_1 = require("./hashes");
Object.defineProperty(exports, "sha512Half", { enumerable: true, get: function () { return hashes_1.sha512Half; } });
Object.defineProperty(exports, "transactionID", { enumerable: true, get: function () { return hashes_1.transactionID; } });
var bigInt = require("big-integer");
/**
 * Construct a BinaryParser
 *
 * @param bytes hex-string to construct BinaryParser from
 * @returns A BinaryParser
 */
var makeParser = function (bytes) { return new binary_parser_1.BinaryParser(bytes); };
exports.makeParser = makeParser;
/**
 * Parse BinaryParser into JSON
 *
 * @param parser BinaryParser object
 * @returns JSON for the bytes in the BinaryParser
 */
var readJSON = function (parser) {
    return parser.readType(types_1.coreTypes.STObject).toJSON();
};
exports.readJSON = readJSON;
/**
 * Parse a hex-string into its JSON interpretation
 *
 * @param bytes hex-string to parse into JSON
 * @returns JSON
 */
var binaryToJSON = function (bytes) { return readJSON(makeParser(bytes)); };
exports.binaryToJSON = binaryToJSON;
/**
 * Function to serialize JSON object representing a transaction
 *
 * @param object JSON object to serialize
 * @param opts options for serializing, including optional prefix, suffix, and signingFieldOnly
 * @returns A Buffer containing the serialized object
 */
function serializeObject(object, opts) {
    if (opts === void 0) { opts = {}; }
    var prefix = opts.prefix, suffix = opts.suffix, _a = opts.signingFieldsOnly, signingFieldsOnly = _a === void 0 ? false : _a;
    var bytesList = new binary_serializer_1.BytesList();
    if (prefix) {
        bytesList.put(prefix);
    }
    var filter = signingFieldsOnly
        ? function (f) { return f.isSigningField; }
        : undefined;
    types_1.coreTypes.STObject.from(object, filter).toBytesSink(bytesList);
    if (suffix) {
        bytesList.put(suffix);
    }
    return bytesList.toBytes();
}
exports.serializeObject = serializeObject;
/**
 * Serialize an object for signing
 *
 * @param transaction Transaction to serialize
 * @param prefix Prefix bytes to put before the serialized object
 * @returns A Buffer with the serialized object
 */
function signingData(transaction, prefix) {
    if (prefix === void 0) { prefix = hash_prefixes_1.HashPrefix.transactionSig; }
    return serializeObject(transaction, { prefix: prefix, signingFieldsOnly: true });
}
exports.signingData = signingData;
/**
 * Serialize a signingClaim
 *
 * @param claim A claim object to serialize
 * @returns the serialized object with appropriate prefix
 */
function signingClaimData(claim) {
    var num = bigInt(String(claim.amount));
    var prefix = hash_prefixes_1.HashPrefix.paymentChannelClaim;
    var channel = types_1.coreTypes.Hash256.from(claim.channel).toBytes();
    var amount = types_1.coreTypes.UInt64.from(num).toBytes();
    var bytesList = new binary_serializer_1.BytesList();
    bytesList.put(prefix);
    bytesList.put(channel);
    bytesList.put(amount);
    return bytesList.toBytes();
}
exports.signingClaimData = signingClaimData;
/**
 * Serialize a transaction object for multiSigning
 *
 * @param transaction transaction to serialize
 * @param signingAccount Account to sign the transaction with
 * @returns serialized transaction with appropriate prefix and suffix
 */
function multiSigningData(transaction, signingAccount) {
    var prefix = hash_prefixes_1.HashPrefix.transactionMultiSig;
    var suffix = types_1.coreTypes.AccountID.from(signingAccount).toBytes();
    return serializeObject(transaction, {
        prefix: prefix,
        suffix: suffix,
        signingFieldsOnly: true,
    });
}
exports.multiSigningData = multiSigningData;
//# sourceMappingURL=binary.js.map