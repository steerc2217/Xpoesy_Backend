"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.TransactionResult = exports.LedgerEntryType = exports.Type = exports.Field = exports.Bytes = exports.TRANSACTION_TYPES = void 0;
var enums = require("./definitions.json");
var serialized_type_1 = require("../types/serialized-type");
var buffer_1 = require("buffer/");
/*
 * @brief: All valid transaction types
 */
exports.TRANSACTION_TYPES = Object.entries(enums.TRANSACTION_TYPES)
    .filter(function (_a) {
    var _key = _a[0], value = _a[1];
    return value >= 0;
})
    .map(function (_a) {
    var key = _a[0], _value = _a[1];
    return key;
});
var TYPE_WIDTH = 2;
var LEDGER_ENTRY_WIDTH = 2;
var TRANSACTION_TYPE_WIDTH = 2;
var TRANSACTION_RESULT_WIDTH = 1;
/*
 * @brief: Serialize a field based on type_code and Field.nth
 */
function fieldHeader(type, nth) {
    var header = [];
    if (type < 16) {
        if (nth < 16) {
            header.push((type << 4) | nth);
        }
        else {
            header.push(type << 4, nth);
        }
    }
    else if (nth < 16) {
        header.push(nth, type);
    }
    else {
        header.push(0, type, nth);
    }
    return buffer_1.Buffer.from(header);
}
/*
 * @brief: Bytes, name, and ordinal representing one type, ledger_type, transaction type, or result
 */
var Bytes = /** @class */ (function () {
    function Bytes(name, ordinal, ordinalWidth) {
        this.name = name;
        this.ordinal = ordinal;
        this.ordinalWidth = ordinalWidth;
        this.bytes = buffer_1.Buffer.alloc(ordinalWidth);
        for (var i = 0; i < ordinalWidth; i++) {
            this.bytes[ordinalWidth - i - 1] = (ordinal >>> (i * 8)) & 0xff;
        }
    }
    Bytes.prototype.toJSON = function () {
        return this.name;
    };
    Bytes.prototype.toBytesSink = function (sink) {
        sink.put(this.bytes);
    };
    Bytes.prototype.toBytes = function () {
        return this.bytes;
    };
    return Bytes;
}());
exports.Bytes = Bytes;
/*
 * @brief: Collection of Bytes objects, mapping bidirectionally
 */
var BytesLookup = /** @class */ (function () {
    function BytesLookup(types, ordinalWidth) {
        var _this = this;
        this.ordinalWidth = ordinalWidth;
        Object.entries(types).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            _this[k] = new Bytes(k, v, ordinalWidth);
            _this[v.toString()] = _this[k];
        });
    }
    BytesLookup.prototype.from = function (value) {
        return value instanceof Bytes ? value : this[value];
    };
    BytesLookup.prototype.fromParser = function (parser) {
        return this.from(parser.readUIntN(this.ordinalWidth).toString());
    };
    return BytesLookup;
}());
function buildField(_a) {
    var name = _a[0], info = _a[1];
    var typeOrdinal = enums.TYPES[info.type];
    var field = fieldHeader(typeOrdinal, info.nth);
    return {
        name: name,
        nth: info.nth,
        isVariableLengthEncoded: info.isVLEncoded,
        isSerialized: info.isSerialized,
        isSigningField: info.isSigningField,
        ordinal: (typeOrdinal << 16) | info.nth,
        type: new Bytes(info.type, typeOrdinal, TYPE_WIDTH),
        header: field,
        associatedType: serialized_type_1.SerializedType, // For later assignment in ./types/index.js
    };
}
/*
 * @brief: The collection of all fields as defined in definitions.json
 */
var FieldLookup = /** @class */ (function () {
    function FieldLookup(fields) {
        var _this = this;
        fields.forEach(function (_a) {
            var k = _a[0], v = _a[1];
            _this[k] = buildField([k, v]);
            _this[_this[k].ordinal.toString()] = _this[k];
        });
    }
    FieldLookup.prototype.fromString = function (value) {
        return this[value];
    };
    return FieldLookup;
}());
var Type = new BytesLookup(enums.TYPES, TYPE_WIDTH);
exports.Type = Type;
var LedgerEntryType = new BytesLookup(enums.LEDGER_ENTRY_TYPES, LEDGER_ENTRY_WIDTH);
exports.LedgerEntryType = LedgerEntryType;
var TransactionType = new BytesLookup(enums.TRANSACTION_TYPES, TRANSACTION_TYPE_WIDTH);
exports.TransactionType = TransactionType;
var TransactionResult = new BytesLookup(enums.TRANSACTION_RESULTS, TRANSACTION_RESULT_WIDTH);
exports.TransactionResult = TransactionResult;
var Field = new FieldLookup(enums.FIELDS);
exports.Field = Field;
//# sourceMappingURL=index.js.map