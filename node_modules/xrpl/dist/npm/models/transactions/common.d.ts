import { Amount, IssuedCurrencyAmount, Memo, Signer } from '../common';
export declare function isIssuedCurrency(input: unknown): input is IssuedCurrencyAmount;
export declare function isAmount(amount: unknown): amount is Amount;
export interface GlobalFlags {
}
export interface BaseTransaction {
    Account: string;
    TransactionType: string;
    Fee?: string;
    Sequence?: number;
    AccountTxnID?: string;
    Flags?: number | GlobalFlags;
    LastLedgerSequence?: number;
    Memos?: Memo[];
    Signers?: Signer[];
    SourceTag?: number;
    SigningPubKey?: string;
    TicketSequence?: number;
    TxnSignature?: string;
}
export declare function validateBaseTransaction(common: Record<string, unknown>): void;
export declare function parseAmountValue(amount: unknown): number;
//# sourceMappingURL=common.d.ts.map