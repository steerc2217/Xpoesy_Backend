import BaseLedgerEntry from './BaseLedgerEntry';
export default interface LedgerHashes extends BaseLedgerEntry {
    LedgerEntryType: 'LedgerHashes';
    LastLedgerSequence?: number;
    Hashes: string[];
    Flags: number;
}
//# sourceMappingURL=LedgerHashes.d.ts.map