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
exports.ShaMapLeaf = exports.ShaMapNode = exports.ShaMap = void 0;
var assert_1 = require("assert");
var types_1 = require("./types");
var hash_prefixes_1 = require("./hash-prefixes");
var hashes_1 = require("./hashes");
var buffer_1 = require("buffer/");
/**
 * Abstract class describing a SHAMapNode
 */
var ShaMapNode = /** @class */ (function () {
    function ShaMapNode() {
    }
    return ShaMapNode;
}());
exports.ShaMapNode = ShaMapNode;
/**
 * Class describing a Leaf of SHAMap
 */
var ShaMapLeaf = /** @class */ (function (_super) {
    __extends(ShaMapLeaf, _super);
    function ShaMapLeaf(index, item) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.item = item;
        return _this;
    }
    /**
     * @returns true as ShaMapLeaf is a leaf node
     */
    ShaMapLeaf.prototype.isLeaf = function () {
        return true;
    };
    /**
     * @returns false as ShaMapLeaf is not an inner node
     */
    ShaMapLeaf.prototype.isInner = function () {
        return false;
    };
    /**
     * Get the prefix of the this.item
     *
     * @returns The hash prefix, unless this.item is undefined, then it returns an empty Buffer
     */
    ShaMapLeaf.prototype.hashPrefix = function () {
        return this.item === undefined ? buffer_1.Buffer.alloc(0) : this.item.hashPrefix();
    };
    /**
     * Hash the bytes representation of this
     *
     * @returns hash of this.item concatenated with this.index
     */
    ShaMapLeaf.prototype.hash = function () {
        var hash = hashes_1.Sha512Half.put(this.hashPrefix());
        this.toBytesSink(hash);
        return hash.finish();
    };
    /**
     * Write the bytes representation of this to a BytesList
     * @param list BytesList to write bytes to
     */
    ShaMapLeaf.prototype.toBytesSink = function (list) {
        if (this.item !== undefined) {
            this.item.toBytesSink(list);
        }
        this.index.toBytesSink(list);
    };
    return ShaMapLeaf;
}(ShaMapNode));
exports.ShaMapLeaf = ShaMapLeaf;
/**
 * Class defining an Inner Node of a SHAMap
 */
var ShaMapInner = /** @class */ (function (_super) {
    __extends(ShaMapInner, _super);
    function ShaMapInner(depth) {
        if (depth === void 0) { depth = 0; }
        var _this = _super.call(this) || this;
        _this.depth = depth;
        _this.slotBits = 0;
        _this.branches = Array(16);
        return _this;
    }
    /**
     * @returns true as ShaMapInner is an inner node
     */
    ShaMapInner.prototype.isInner = function () {
        return true;
    };
    /**
     * @returns false as ShaMapInner is not a leaf node
     */
    ShaMapInner.prototype.isLeaf = function () {
        return false;
    };
    /**
     * Get the hash prefix for this node
     *
     * @returns hash prefix describing an inner node
     */
    ShaMapInner.prototype.hashPrefix = function () {
        return hash_prefixes_1.HashPrefix.innerNode;
    };
    /**
     * Set a branch of this node to be another node
     *
     * @param slot Slot to add branch to this.branches
     * @param branch Branch to add
     */
    ShaMapInner.prototype.setBranch = function (slot, branch) {
        this.slotBits = this.slotBits | (1 << slot);
        this.branches[slot] = branch;
    };
    /**
     * @returns true if node is empty
     */
    ShaMapInner.prototype.empty = function () {
        return this.slotBits === 0;
    };
    /**
     * Compute the hash of this node
     *
     * @returns The hash of this node
     */
    ShaMapInner.prototype.hash = function () {
        if (this.empty()) {
            return types_1.coreTypes.Hash256.ZERO_256;
        }
        var hash = hashes_1.Sha512Half.put(this.hashPrefix());
        this.toBytesSink(hash);
        return hash.finish();
    };
    /**
     * Writes the bytes representation of this node to a BytesList
     *
     * @param list BytesList to write bytes to
     */
    ShaMapInner.prototype.toBytesSink = function (list) {
        for (var i = 0; i < this.branches.length; i++) {
            var branch = this.branches[i];
            var hash = branch ? branch.hash() : types_1.coreTypes.Hash256.ZERO_256;
            hash.toBytesSink(list);
        }
    };
    /**
     * Add item to the SHAMap
     *
     * @param index Hash of the index of the item being inserted
     * @param item Item to insert in the map
     * @param leaf Leaf node to insert when branch doesn't exist
     */
    ShaMapInner.prototype.addItem = function (index, item, leaf) {
        assert_1.strict.ok(index !== undefined);
        var nibble = index.nibblet(this.depth);
        var existing = this.branches[nibble];
        if (existing === undefined) {
            this.setBranch(nibble, leaf || new ShaMapLeaf(index, item));
        }
        else if (existing instanceof ShaMapLeaf) {
            var newInner = new ShaMapInner(this.depth + 1);
            newInner.addItem(existing.index, undefined, existing);
            newInner.addItem(index, item, leaf);
            this.setBranch(nibble, newInner);
        }
        else if (existing instanceof ShaMapInner) {
            existing.addItem(index, item, leaf);
        }
        else {
            throw new Error('invalid ShaMap.addItem call');
        }
    };
    return ShaMapInner;
}(ShaMapNode));
var ShaMap = /** @class */ (function (_super) {
    __extends(ShaMap, _super);
    function ShaMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShaMap;
}(ShaMapInner));
exports.ShaMap = ShaMap;
//# sourceMappingURL=shamap.js.map