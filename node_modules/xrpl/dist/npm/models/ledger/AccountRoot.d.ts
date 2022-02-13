import BaseLedgerEntry from './BaseLedgerEntry';
export default interface AccountRoot extends BaseLedgerEntry {
    LedgerEntryType: 'AccountRoot';
    Account: string;
    Balance: string;
    Flags: number;
    OwnerCount: number;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    Sequence: number;
    AccountTxnID?: string;
    Domain?: string;
    EmailHash?: string;
    MessageKey?: string;
    RegularKey?: string;
    TicketCount?: number;
    TickSize?: number;
    TransferRate?: number;
}
export interface AccountRootFlagsInterface {
    lsfPasswordSpent?: boolean;
    lsfRequireDestTag?: boolean;
    lsfRequireAuth?: boolean;
    lsfDisallowXRP?: boolean;
    lsfDisableMaster?: boolean;
    lsfNoFreeze?: boolean;
    lsfGlobalFreeze?: boolean;
    lsfDefaultRipple?: boolean;
    lsfDepositAuth?: boolean;
}
export declare enum AccountRootFlags {
    lsfPasswordSpent = 65536,
    lsfRequireDestTag = 131072,
    lsfRequireAuth = 262144,
    lsfDisallowXRP = 524288,
    lsfDisableMaster = 1048576,
    lsfNoFreeze = 2097152,
    lsfGlobalFreeze = 4194304,
    lsfDefaultRipple = 8388608,
    lsfDepositAuth = 16777216
}
//# sourceMappingURL=AccountRoot.d.ts.map