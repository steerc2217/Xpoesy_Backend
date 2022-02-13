import { Amount } from '../common';
import { BaseTransaction } from './common';
export interface NFTokenAcceptOffer extends BaseTransaction {
    TransactionType: 'NFTokenAcceptOffer';
    SellOffer?: string;
    BuyOffer?: string;
    BrokerFee?: Amount;
}
export declare function validateNFTokenAcceptOffer(tx: Record<string, unknown>): void;
//# sourceMappingURL=NFTokenAcceptOffer.d.ts.map