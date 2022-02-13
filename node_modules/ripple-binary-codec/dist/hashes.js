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
exports.transactionID = exports.sha512Half = exports.Sha512Half = void 0;
var hash_prefixes_1 = require("./hash-prefixes");
var createHash = require("create-hash");
var hash_256_1 = require("./types/hash-256");
var binary_serializer_1 = require("./serdes/binary-serializer");
var buffer_1 = require("buffer/");
/**
 * Class for hashing with SHA512
 * @extends BytesList So SerializedTypes can write bytes to a Sha512Half
 */
var Sha512Half = /** @class */ (function (_super) {
    __extends(Sha512Half, _super);
    function Sha512Half() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hash = createHash('sha512');
        return _this;
    }
    /**
     * Construct a new Sha512Hash and write bytes this.hash
     *
     * @param bytes bytes to write to this.hash
     * @returns the new Sha512Hash object
     */
    Sha512Half.put = function (bytes) {
        return new Sha512Half().put(bytes);
    };
    /**
     * Write bytes to an existing Sha512Hash
     *
     * @param bytes bytes to write to object
     * @returns the Sha512 object
     */
    Sha512Half.prototype.put = function (bytes) {
        this.hash.update(bytes);
        return this;
    };
    /**
     * Compute SHA512 hash and slice in half
     *
     * @returns half of a SHA512 hash
     */
    Sha512Half.prototype.finish256 = function () {
        return buffer_1.Buffer.from(this.hash.digest().slice(0, 32));
    };
    /**
     * Constructs a Hash256 from the Sha512Half object
     *
     * @returns a Hash256 object
     */
    Sha512Half.prototype.finish = function () {
        return new hash_256_1.Hash256(this.finish256());
    };
    return Sha512Half;
}(binary_serializer_1.BytesList));
exports.Sha512Half = Sha512Half;
/**
 * compute SHA512 hash of a list of bytes
 *
 * @param args zero or more arguments to hash
 * @returns the sha512half hash of the arguments.
 */
function sha512Half() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var hash = new Sha512Half();
    args.forEach(function (a) { return hash.put(a); });
    return hash.finish256();
}
exports.sha512Half = sha512Half;
/**
 * Construct a transactionID from a Serialized Transaction
 *
 * @param serialized bytes to hash
 * @returns a Hash256 object
 */
function transactionID(serialized) {
    return new hash_256_1.Hash256(sha512Half(hash_prefixes_1.HashPrefix.transactionID, serialized));
}
exports.transactionID = transactionID;
//# sourceMappingURL=hashes.js.map