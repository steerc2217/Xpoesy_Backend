import BaseLedgerEntry from './BaseLedgerEntry';
interface Majority {
    Majority: {
        Amendment: string;
        CloseTime: number;
    };
}
export default interface Amendments extends BaseLedgerEntry {
    LedgerEntryType: 'Amendments';
    Amendments?: string[];
    Majorities?: Majority[];
    Flags: 0;
}
export {};
//# sourceMappingURL=Amendments.d.ts.map