"use strict";
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
exports.getBalances = exports.getXrpBalance = void 0;
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../utils");
function formatBalances(trustlines) {
    return trustlines.map((trustline) => ({
        value: trustline.balance,
        currency: trustline.currency,
        issuer: trustline.account,
    }));
}
function getXrpBalance(address, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const xrpRequest = {
            command: 'account_info',
            account: address,
            ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
            ledger_hash: options.ledger_hash,
        };
        const response = yield this.request(xrpRequest);
        return (0, utils_1.dropsToXrp)(response.result.account_data.Balance);
    });
}
exports.getXrpBalance = getXrpBalance;
function getBalances(address, options = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const balances = [];
        let xrpPromise = Promise.resolve('');
        if (!options.peer) {
            xrpPromise = this.getXrpBalance(address, {
                ledger_hash: options.ledger_hash,
                ledger_index: options.ledger_index,
            });
        }
        const linesRequest = {
            command: 'account_lines',
            account: address,
            ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
            ledger_hash: options.ledger_hash,
            peer: options.peer,
            limit: options.limit,
        };
        const linesPromise = this.requestAll(linesRequest);
        yield Promise.all([xrpPromise, linesPromise]).then(([xrpBalance, linesResponses]) => {
            const accountLinesBalance = lodash_1.default.flatMap(linesResponses, (response) => formatBalances(response.result.lines));
            if (xrpBalance !== '') {
                balances.push({ currency: 'XRP', value: xrpBalance });
            }
            balances.push(...accountLinesBalance);
        });
        return balances.slice(0, options.limit);
    });
}
exports.getBalances = getBalances;
//# sourceMappingURL=balances.js.map