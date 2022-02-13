import { BaseTransaction } from './common';
export interface EscrowCreate extends BaseTransaction {
    TransactionType: 'EscrowCreate';
    Amount: string;
    Destination: string;
    CancelAfter?: number;
    FinishAfter?: number;
    Condition?: string;
    DestinationTag?: number;
}
export declare function validateEscrowCreate(tx: Record<string, unknown>): void;
//# sourceMappingURL=escrowCreate.d.ts.map