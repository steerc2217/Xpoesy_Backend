import BaseLedgerEntry from './BaseLedgerEntry';
interface SignerEntry {
    SignerEntry: {
        Account: string;
        SignerWeight: number;
    };
}
export default interface SignerList extends BaseLedgerEntry {
    LedgerEntryType: 'SignerList';
    Flags: number;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    OwnerNode: string;
    SignerEntries: SignerEntry[];
    SignerListID: number;
    SignerQuorum: number;
}
export declare enum SignerListFlags {
    lsfOneOwnerCount = 65536
}
export {};
//# sourceMappingURL=SignerList.d.ts.map