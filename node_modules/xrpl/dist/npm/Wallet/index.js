"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bip32_1 = require("bip32");
const bip39_1 = require("bip39");
const lodash_1 = __importDefault(require("lodash"));
const ripple_address_codec_1 = require("ripple-address-codec");
const ripple_binary_codec_1 = require("ripple-binary-codec");
const ripple_keypairs_1 = require("ripple-keypairs");
const ECDSA_1 = __importDefault(require("../ECDSA"));
const errors_1 = require("../errors");
const utils_1 = require("../sugar/utils");
const hashLedger_1 = require("../utils/hashes/hashLedger");
const DEFAULT_ALGORITHM = ECDSA_1.default.ed25519;
const DEFAULT_DERIVATION_PATH = "m/44'/144'/0'/0/0";
function hexFromBuffer(buffer) {
    return buffer.toString('hex').toUpperCase();
}
class Wallet {
    constructor(publicKey, privateKey, opts = {}) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.classicAddress = opts.masterAddress
            ? (0, utils_1.ensureClassicAddress)(opts.masterAddress)
            : (0, ripple_keypairs_1.deriveAddress)(publicKey);
        this.seed = opts.seed;
    }
    get address() {
        return this.classicAddress;
    }
    static generate(algorithm = DEFAULT_ALGORITHM) {
        const seed = (0, ripple_keypairs_1.generateSeed)({ algorithm });
        return Wallet.fromSeed(seed);
    }
    static fromSeed(seed, opts = {}) {
        return Wallet.deriveWallet(seed, {
            algorithm: opts.algorithm,
            masterAddress: opts.masterAddress,
        });
    }
    static fromMnemonic(mnemonic, opts = {}) {
        var _a;
        const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
        const masterNode = (0, bip32_1.fromSeed)(seed);
        const node = masterNode.derivePath((_a = opts.derivationPath) !== null && _a !== void 0 ? _a : DEFAULT_DERIVATION_PATH);
        if (node.privateKey === undefined) {
            throw new errors_1.ValidationError('Unable to derive privateKey from mnemonic input');
        }
        const publicKey = hexFromBuffer(node.publicKey);
        const privateKey = hexFromBuffer(node.privateKey);
        return new Wallet(publicKey, `00${privateKey}`, {
            masterAddress: opts.masterAddress,
        });
    }
    static fromEntropy(entropy, opts = {}) {
        var _a;
        const algorithm = (_a = opts.algorithm) !== null && _a !== void 0 ? _a : DEFAULT_ALGORITHM;
        const options = {
            entropy: Uint8Array.from(entropy),
            algorithm,
        };
        const seed = (0, ripple_keypairs_1.generateSeed)(options);
        return Wallet.deriveWallet(seed, {
            algorithm,
            masterAddress: opts.masterAddress,
        });
    }
    static deriveWallet(seed, opts = {}) {
        var _a;
        const { publicKey, privateKey } = (0, ripple_keypairs_1.deriveKeypair)(seed, {
            algorithm: (_a = opts.algorithm) !== null && _a !== void 0 ? _a : DEFAULT_ALGORITHM,
        });
        return new Wallet(publicKey, privateKey, {
            seed,
            masterAddress: opts.masterAddress,
        });
    }
    sign(transaction, multisign) {
        let multisignAddress = false;
        if (typeof multisign === 'string' && multisign.startsWith('X')) {
            multisignAddress = multisign;
        }
        else if (multisign) {
            multisignAddress = this.classicAddress;
        }
        if (transaction.TxnSignature || transaction.Signers) {
            throw new errors_1.ValidationError('txJSON must not contain "TxnSignature" or "Signers" properties');
        }
        const txToSignAndEncode = Object.assign({}, transaction);
        txToSignAndEncode.SigningPubKey = multisignAddress ? '' : this.publicKey;
        if (multisignAddress) {
            const signer = {
                Account: multisignAddress,
                SigningPubKey: this.publicKey,
                TxnSignature: computeSignature(txToSignAndEncode, this.privateKey, multisignAddress),
            };
            txToSignAndEncode.Signers = [{ Signer: signer }];
        }
        else {
            txToSignAndEncode.TxnSignature = computeSignature(txToSignAndEncode, this.privateKey);
        }
        const serialized = (0, ripple_binary_codec_1.encode)(txToSignAndEncode);
        this.checkTxSerialization(serialized, transaction);
        return {
            tx_blob: serialized,
            hash: (0, hashLedger_1.hashSignedTx)(serialized),
        };
    }
    verifyTransaction(signedTransaction) {
        const tx = (0, ripple_binary_codec_1.decode)(signedTransaction);
        const messageHex = (0, ripple_binary_codec_1.encodeForSigning)(tx);
        const signature = tx.TxnSignature;
        return (0, ripple_keypairs_1.verify)(messageHex, signature, this.publicKey);
    }
    getXAddress(tag = false, isTestnet = false) {
        return (0, ripple_address_codec_1.classicAddressToXAddress)(this.classicAddress, tag, isTestnet);
    }
    checkTxSerialization(serialized, tx) {
        var _a;
        const decoded = (0, ripple_binary_codec_1.decode)(serialized);
        const txCopy = Object.assign({}, tx);
        if (!decoded.TxnSignature && !decoded.Signers) {
            throw new errors_1.ValidationError('Serialized transaction must have a TxnSignature or Signers property');
        }
        delete decoded.TxnSignature;
        delete decoded.Signers;
        if (!tx.SigningPubKey) {
            delete decoded.SigningPubKey;
        }
        (_a = txCopy.Memos) === null || _a === void 0 ? void 0 : _a.map((memo) => {
            const memoCopy = Object.assign({}, memo);
            if (memo.Memo.MemoData) {
                memoCopy.Memo.MemoData = memo.Memo.MemoData.toUpperCase();
            }
            if (memo.Memo.MemoType) {
                memoCopy.Memo.MemoType = memo.Memo.MemoType.toUpperCase();
            }
            if (memo.Memo.MemoFormat) {
                memoCopy.Memo.MemoFormat = memo.Memo.MemoFormat.toUpperCase();
            }
            return memo;
        });
        if (!lodash_1.default.isEqual(decoded, tx)) {
            const data = {
                decoded,
                tx,
            };
            const error = new errors_1.ValidationError('Serialized transaction does not match original txJSON. See error.data', data);
            throw error;
        }
    }
}
Wallet.fromSecret = Wallet.fromSeed;
function computeSignature(tx, privateKey, signAs) {
    if (signAs) {
        const classicAddress = (0, ripple_address_codec_1.isValidXAddress)(signAs)
            ? (0, ripple_address_codec_1.xAddressToClassicAddress)(signAs).classicAddress
            : signAs;
        return (0, ripple_keypairs_1.sign)((0, ripple_binary_codec_1.encodeForMultisigning)(tx, classicAddress), privateKey);
    }
    return (0, ripple_keypairs_1.sign)((0, ripple_binary_codec_1.encodeForSigning)(tx), privateKey);
}
exports.default = Wallet;
//# sourceMappingURL=index.js.map