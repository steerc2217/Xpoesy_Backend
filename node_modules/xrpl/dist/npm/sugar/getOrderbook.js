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
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const lodash_1 = __importDefault(require("lodash"));
const Offer_1 = require("../models/ledger/Offer");
const DEFAULT_LIMIT = 20;
function sortOffers(offers) {
    return offers.sort((offerA, offerB) => {
        var _a, _b;
        const qualityA = (_a = offerA.quality) !== null && _a !== void 0 ? _a : 0;
        const qualityB = (_b = offerB.quality) !== null && _b !== void 0 ? _b : 0;
        return new bignumber_js_1.default(qualityA).comparedTo(qualityB);
    });
}
function getOrderbook(takerPays, takerGets, options = {}) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            command: 'book_offers',
            taker_pays: takerPays,
            taker_gets: takerGets,
            ledger_index: (_a = options.ledger_index) !== null && _a !== void 0 ? _a : 'validated',
            ledger_hash: options.ledger_hash,
            limit: (_b = options.limit) !== null && _b !== void 0 ? _b : DEFAULT_LIMIT,
            taker: options.taker,
        };
        const directOfferResults = yield this.requestAll(request);
        request.taker_gets = takerPays;
        request.taker_pays = takerGets;
        const reverseOfferResults = yield this.requestAll(request);
        const directOffers = lodash_1.default.flatMap(directOfferResults, (directOfferResult) => directOfferResult.result.offers);
        const reverseOffers = lodash_1.default.flatMap(reverseOfferResults, (reverseOfferResult) => reverseOfferResult.result.offers);
        const orders = [...directOffers, ...reverseOffers];
        const buy = [];
        const sell = [];
        orders.forEach((order) => {
            if ((order.Flags & Offer_1.OfferFlags.lsfSell) === 0) {
                buy.push(order);
            }
            else {
                sell.push(order);
            }
        });
        return {
            buy: sortOffers(buy).slice(0, options.limit),
            sell: sortOffers(sell).slice(0, options.limit),
        };
    });
}
exports.default = getOrderbook;
//# sourceMappingURL=getOrderbook.js.map