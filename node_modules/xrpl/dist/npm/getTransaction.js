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
Object.defineProperty(exports, "__esModule", { value: true });
const npm_1 = require("../../dist/npm");
const client = new npm_1.Client('wss://s.altnet.rippletest.net:51233');
function getTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const ledger = yield client.request({
            command: 'ledger',
            transactions: true,
            ledger_index: 'validated',
        });
        console.log(ledger);
        const transactions = ledger.result.ledger.transactions;
        if (transactions) {
            const tx = yield client.request({
                command: 'tx',
                transaction: transactions[0],
            });
            console.log(tx);
            if (tx.result.meta == null) {
                throw new Error('meta not included in the response');
            }
            if (typeof tx.result.meta !== 'string') {
                console.log('delivered_amount:', tx.result.meta.delivered_amount);
            }
        }
        yield client.disconnect();
    });
}
void getTransaction();
//# sourceMappingURL=getTransaction.js.map