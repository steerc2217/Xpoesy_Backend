import { Amount } from '../common';
import { BaseTransaction, GlobalFlags } from './common';
export declare enum NFTokenCreateOfferFlags {
    tfSellToken = 1
}
export interface NFTokenCreateOfferFlagsInterface extends GlobalFlags {
    tfSellToken?: boolean;
}
export interface NFTokenCreateOffer extends BaseTransaction {
    TransactionType: 'NFTokenCreateOffer';
    TokenID: string;
    Amount: Amount;
    Owner?: string;
    Expiration?: number;
    Destination?: string;
    Flags?: number | NFTokenCreateOfferFlagsInterface;
}
export declare function validateNFTokenCreateOffer(tx: Record<string, unknown>): void;
//# sourceMappingURL=NFTokenCreateOffer.d.ts.map