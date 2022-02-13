"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const assert = __importStar(require("assert"));
const events_1 = require("events");
const errors_1 = require("../errors");
const sugar_1 = require("../sugar");
const fundWallet_1 = __importDefault(require("../Wallet/fundWallet"));
const connection_1 = require("./connection");
const partialPayment_1 = require("./partialPayment");
function getCollectKeyFromCommand(command) {
    switch (command) {
        case 'account_channels':
            return 'channels';
        case 'account_lines':
            return 'lines';
        case 'account_objects':
            return 'account_objects';
        case 'account_tx':
            return 'transactions';
        case 'account_offers':
        case 'book_offers':
            return 'offers';
        case 'ledger_data':
            return 'state';
        default:
            return null;
    }
}
function clamp(value, min, max) {
    assert.ok(min <= max, 'Illegal clamp bounds');
    return Math.min(Math.max(value, min), max);
}
const DEFAULT_FEE_CUSHION = 1.2;
const DEFAULT_MAX_FEE_XRP = '2';
const MIN_LIMIT = 10;
const MAX_LIMIT = 400;
const NORMAL_DISCONNECT_CODE = 1000;
class Client extends events_1.EventEmitter {
    constructor(server, options = {}) {
        var _a, _b;
        super();
        this.autofill = sugar_1.autofill;
        this.submit = sugar_1.submit;
        this.submitAndWait = sugar_1.submitAndWait;
        this.prepareTransaction = sugar_1.autofill;
        this.getXrpBalance = sugar_1.getXrpBalance;
        this.getBalances = sugar_1.getBalances;
        this.getOrderbook = sugar_1.getOrderbook;
        this.getLedgerIndex = sugar_1.getLedgerIndex;
        this.fundWallet = fundWallet_1.default;
        if (typeof server !== 'string' || !/wss?(?:\+unix)?:\/\//u.exec(server)) {
            throw new errors_1.ValidationError('server URI must start with `wss://`, `ws://`, `wss+unix://`, or `ws+unix://`.');
        }
        this.feeCushion = (_a = options.feeCushion) !== null && _a !== void 0 ? _a : DEFAULT_FEE_CUSHION;
        this.maxFeeXRP = (_b = options.maxFeeXRP) !== null && _b !== void 0 ? _b : DEFAULT_MAX_FEE_XRP;
        this.connection = new connection_1.Connection(server, options);
        this.connection.on('error', (errorCode, errorMessage, data) => {
            this.emit('error', errorCode, errorMessage, data);
        });
        this.connection.on('connected', () => {
            this.emit('connected');
        });
        this.connection.on('disconnected', (code) => {
            let finalCode = code;
            if (finalCode === connection_1.INTENTIONAL_DISCONNECT_CODE) {
                finalCode = NORMAL_DISCONNECT_CODE;
            }
            this.emit('disconnected', finalCode);
        });
        this.connection.on('ledgerClosed', (ledger) => {
            this.emit('ledgerClosed', ledger);
        });
        this.connection.on('transaction', (tx) => {
            (0, partialPayment_1.handleStreamPartialPayment)(tx, this.connection.trace);
            this.emit('transaction', tx);
        });
        this.connection.on('validationReceived', (validation) => {
            this.emit('validationReceived', validation);
        });
        this.connection.on('manifestReceived', (manifest) => {
            this.emit('manifestReceived', manifest);
        });
        this.connection.on('peerStatusChange', (status) => {
            this.emit('peerStatusChange', status);
        });
        this.connection.on('consensusPhase', (consensus) => {
            this.emit('consensusPhase', consensus);
        });
        this.connection.on('path_find', (path) => {
            this.emit('path_find', path);
        });
    }
    get url() {
        return this.connection.getUrl();
    }
    request(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.connection.request(Object.assign(Object.assign({}, req), { account: req.account
                    ?
                        (0, sugar_1.ensureClassicAddress)(req.account)
                    : undefined })));
            (0, partialPayment_1.handlePartialPayment)(req.command, response);
            return response;
        });
    }
    requestNextPage(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!resp.result.marker) {
                return Promise.reject(new errors_1.NotFoundError('response does not have a next page'));
            }
            const nextPageRequest = Object.assign(Object.assign({}, req), { marker: resp.result.marker });
            return this.request(nextPageRequest);
        });
    }
    on(eventName, listener) {
        return super.on(eventName, listener);
    }
    requestAll(request, collect) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectKey = collect !== null && collect !== void 0 ? collect : getCollectKeyFromCommand(request.command);
            if (!collectKey) {
                throw new errors_1.ValidationError(`no collect key for command ${request.command}`);
            }
            const countTo = request.limit == null ? Infinity : request.limit;
            let count = 0;
            let marker = request.marker;
            let lastBatchLength;
            const results = [];
            do {
                const countRemaining = clamp(countTo - count, MIN_LIMIT, MAX_LIMIT);
                const repeatProps = Object.assign(Object.assign({}, request), { limit: countRemaining, marker });
                const singleResponse = yield this.connection.request(repeatProps);
                const singleResult = singleResponse.result;
                if (!(collectKey in singleResult)) {
                    throw new errors_1.XrplError(`${collectKey} not in result`);
                }
                const collectedData = singleResult[collectKey];
                marker = singleResult.marker;
                results.push(singleResponse);
                if (Array.isArray(collectedData)) {
                    count += collectedData.length;
                    lastBatchLength = collectedData.length;
                }
                else {
                    lastBatchLength = 0;
                }
            } while (Boolean(marker) && count < countTo && lastBatchLength !== 0);
            return results;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.connect();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.disconnect();
        });
    }
    isConnected() {
        return this.connection.isConnected();
    }
}
exports.Client = Client;
//# sourceMappingURL=index.js.map