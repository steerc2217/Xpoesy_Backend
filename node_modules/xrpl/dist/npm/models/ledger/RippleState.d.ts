import { IssuedCurrencyAmount } from '../common';
import BaseLedgerEntry from './BaseLedgerEntry';
export default interface RippleState extends BaseLedgerEntry {
    LedgerEntryType: 'RippleState';
    Flags: number;
    Balance: IssuedCurrencyAmount;
    LowLimit: IssuedCurrencyAmount;
    HighLimit: IssuedCurrencyAmount;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    LowNode?: string;
    HighNode?: string;
    LowQualityIn?: number;
    LowQualityOut?: number;
    HighQualityIn?: number;
    HighQualityOut?: number;
}
export declare enum RippleStateFlags {
    lsfLowReserve = 65536,
    lsfHighReserve = 131072,
    lsfLowAuth = 262144,
    lsfHighAuth = 524288,
    lsfLowNoRipple = 1048576,
    lsfHighNoRipple = 2097152,
    lsfLowFreeze = 4194304,
    lsfHighFreeze = 8388608
}
//# sourceMappingURL=RippleState.d.ts.map