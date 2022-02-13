import { Amount } from '../common';
import BaseLedgerEntry from './BaseLedgerEntry';
export default interface Offer extends BaseLedgerEntry {
    LedgerEntryType: 'Offer';
    Flags: number;
    Account: string;
    Sequence: number;
    TakerPays: Amount;
    TakerGets: Amount;
    BookDirectory: string;
    BookNode: string;
    OwnerNode: string;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    Expiration?: number;
}
export declare enum OfferFlags {
    lsfPassive = 65536,
    lsfSell = 131072
}
//# sourceMappingURL=Offer.d.ts.map