import BaseLedgerEntry from './BaseLedgerEntry';
interface DisabledValidator {
    FirstLedgerSequence: number;
    PublicKey: string;
}
export default interface NegativeUNL extends BaseLedgerEntry {
    LedgerEntryType: 'NegativeUNL';
    DisabledValidators?: DisabledValidator[];
    ValidatorToDisable?: string;
    ValidatorToReEnable?: string;
}
export {};
//# sourceMappingURL=NegativeUNL.d.ts.map