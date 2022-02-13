/// <reference types="node" />
import { EventEmitter } from 'events';
import { BaseRequest } from '../models/methods/baseMethod';
interface ConnectionOptions {
    trace?: boolean | ((id: string, message: string) => void);
    proxy?: string;
    proxyAuthorization?: string;
    authorization?: string;
    trustedCertificates?: string[];
    key?: string;
    passphrase?: string;
    certificate?: string;
    timeout: number;
    connectionTimeout: number;
}
export declare type ConnectionUserOptions = Partial<ConnectionOptions>;
export declare const INTENTIONAL_DISCONNECT_CODE = 4000;
export declare class Connection extends EventEmitter {
    private readonly url;
    private ws;
    private reconnectTimeoutID;
    private heartbeatIntervalID;
    private readonly retryConnectionBackoff;
    private readonly config;
    private readonly requestManager;
    private readonly connectionManager;
    constructor(url?: string, options?: ConnectionUserOptions);
    isConnected(): boolean;
    connect(): Promise<void>;
    disconnect(): Promise<number | undefined>;
    reconnect(): Promise<void>;
    request<T extends BaseRequest>(request: T, timeout?: number): Promise<unknown>;
    getUrl(): string;
    readonly trace: (id: string, message: string) => void;
    private onMessage;
    private get state();
    private get shouldBeConnected();
    private onceOpen;
    private intentionalDisconnect;
    private clearHeartbeatInterval;
    private startHeartbeatInterval;
    private heartbeat;
    private onConnectionFailed;
}
export {};
//# sourceMappingURL=connection.d.ts.map