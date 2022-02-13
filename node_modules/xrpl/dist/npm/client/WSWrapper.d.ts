/// <reference types="node" />
import { EventEmitter } from 'events';
interface WSWrapperOptions {
    perMessageDeflate: boolean;
    handshakeTimeout: number;
    protocolVersion: number;
    origin: string;
    maxPayload: number;
    followRedirects: boolean;
    maxRedirects: number;
}
export default class WSWrapper extends EventEmitter {
    static CONNECTING: number;
    static OPEN: number;
    static CLOSING: number;
    static CLOSED: number;
    private readonly ws;
    constructor(url: string, _protocols: string | string[] | WSWrapperOptions | undefined, _websocketOptions: WSWrapperOptions);
    close(): void;
    send(message: string): void;
    get readyState(): number;
}
export {};
//# sourceMappingURL=WSWrapper.d.ts.map