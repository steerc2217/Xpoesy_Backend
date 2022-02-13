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
const _1 = require(".");
class BroadcastClient extends _1.Client {
    constructor(servers, options = {}) {
        super(servers[0], options);
        const clients = servers.map((server) => new _1.Client(server, options));
        this.clients = clients;
        this.getMethodNames().forEach((name) => {
            this[name] = (...args) => __awaiter(this, void 0, void 0, function* () { return Promise.race(clients.map((client) => __awaiter(this, void 0, void 0, function* () { return client[name](...args); }))); });
        });
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () { return client.connect(); })));
        });
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () { return client.disconnect(); })));
        });
        this.isConnected = () => clients.map((client) => client.isConnected()).every(Boolean);
        clients.forEach((client) => {
            client.on('error', (errorCode, errorMessage, data) => this.emit('error', errorCode, errorMessage, data));
        });
    }
    getMethodNames() {
        const methodNames = [];
        const firstClient = this.clients[0];
        const methods = Object.getOwnPropertyNames(firstClient);
        methods.push(...Object.getOwnPropertyNames(Object.getPrototypeOf(firstClient)));
        for (const name of methods) {
            if (typeof firstClient[name] === 'function' &&
                name !== 'constructor' &&
                name !== 'on') {
                methodNames.push(name);
            }
        }
        return methodNames;
    }
}
exports.default = BroadcastClient;
//# sourceMappingURL=BroadcastClient.js.map