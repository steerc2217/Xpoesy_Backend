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
exports.AccountID = void 0;
var ripple_address_codec_1 = require("ripple-address-codec");
var hash_160_1 = require("./hash-160");
var buffer_1 = require("buffer/");
var HEX_REGEX = /^[A-F0-9]{40}$/;
/**
 * Class defining how to encode and decode an AccountID
 */
var AccountID = /** @class */ (function (_super) {
    __extends(AccountID, _super);
    function AccountID(bytes) {
        return _super.call(this, bytes !== null && bytes !== void 0 ? bytes : AccountID.defaultAccountID.bytes) || this;
    }
    /**
     * Defines how to construct an AccountID
     *
     * @param value either an existing AccountID, a hex-string, or a base58 r-Address
     * @returns an AccountID object
     */
    AccountID.from = function (value) {
        if (value instanceof AccountID) {
            return value;
        }
        if (typeof value === 'string') {
            if (value === '') {
                return new AccountID();
            }
            return HEX_REGEX.test(value)
                ? new AccountID(buffer_1.Buffer.from(value, 'hex'))
                : this.fromBase58(value);
        }
        throw new Error('Cannot construct AccountID from value given');
    };
    /**
     * Defines how to build an AccountID from a base58 r-Address
     *
     * @param value a base58 r-Address
     * @returns an AccountID object
     */
    AccountID.fromBase58 = function (value) {
        if ((0, ripple_address_codec_1.isValidXAddress)(value)) {
            var classic = (0, ripple_address_codec_1.xAddressToClassicAddress)(value);
            if (classic.tag !== false)
                throw new Error('Only allowed to have tag on Account or Destination');
            value = classic.classicAddress;
        }
        return new AccountID(buffer_1.Buffer.from((0, ripple_address_codec_1.decodeAccountID)(value)));
    };
    /**
     * Overload of toJSON
     *
     * @returns the base58 string for this AccountID
     */
    AccountID.prototype.toJSON = function () {
        return this.toBase58();
    };
    /**
     * Defines how to encode AccountID into a base58 address
     *
     * @returns the base58 string defined by this.bytes
     */
    AccountID.prototype.toBase58 = function () {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        return (0, ripple_address_codec_1.encodeAccountID)(this.bytes);
        /* eslint-enable @typescript-eslint/no-explicit-any */
    };
    AccountID.defaultAccountID = new AccountID(buffer_1.Buffer.alloc(20));
    return AccountID;
}(hash_160_1.Hash160));
exports.AccountID = AccountID;
//# sourceMappingURL=account-id.js.map