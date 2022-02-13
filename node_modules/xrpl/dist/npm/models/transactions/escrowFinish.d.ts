import { BaseTransaction } from './common';
export interface EscrowFinish extends BaseTransaction {
    TransactionType: 'EscrowFinish';
    Owner: string;
    OfferSequence: number;
    Condition?: string;
    Fulfillment?: string;
}
export declare function validateEscrowFinish(tx: Record<string, unknown>): void;
//# sourceMappingURL=escrowFinish.d.ts.map