import BaseLedgerEntry from './BaseLedgerEntry';
export default interface FeeSettings extends BaseLedgerEntry {
    LedgerEntryType: 'FeeSettings';
    BaseFee: string;
    ReferenceFeeUnits: number;
    ReserveBase: number;
    ReserveIncrement: number;
    Flags: number;
}
//# sourceMappingURL=FeeSettings.d.ts.map