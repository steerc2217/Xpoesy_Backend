export declare type LedgerIndex = number | ('validated' | 'closed' | 'current');
export declare type AccountObjectType = 'check' | 'escrow' | 'offer' | 'payment_channel' | 'signer_list' | 'state';
interface XRP {
    currency: 'XRP';
}
interface IssuedCurrency {
    currency: string;
    issuer: string;
}
export declare type Currency = IssuedCurrency | XRP;
export interface IssuedCurrencyAmount extends IssuedCurrency {
    value: string;
}
export declare type Amount = IssuedCurrencyAmount | string;
export interface Signer {
    Signer: {
        Account: string;
        TxnSignature: string;
        SigningPubKey: string;
    };
}
export interface Memo {
    Memo: {
        MemoData?: string;
        MemoType?: string;
        MemoFormat?: string;
    };
}
export declare type StreamType = 'consensus' | 'ledger' | 'manifests' | 'peer_status' | 'transactions' | 'transactions_proposed' | 'server' | 'validations';
interface PathStep {
    account?: string;
    currency?: string;
    issuer?: string;
}
export declare type Path = PathStep[];
export interface SignerEntry {
    SignerEntry: {
        Account: string;
        SignerWeight: number;
    };
}
export interface NFTOffer {
    amount: Amount;
    flags: number;
    index: string;
    owner: string;
    destination?: string;
    expiration?: number;
}
export {};
//# sourceMappingURL=index.d.ts.map