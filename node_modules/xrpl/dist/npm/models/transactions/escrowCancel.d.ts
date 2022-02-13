import { BaseTransaction } from './common';
export interface EscrowCancel extends BaseTransaction {
    TransactionType: 'EscrowCancel';
    Owner: string;
    OfferSequence: number;
}
export declare function validateEscrowCancel(tx: Record<string, unknown>): void;
//# sourceMappingURL=escrowCancel.d.ts.map