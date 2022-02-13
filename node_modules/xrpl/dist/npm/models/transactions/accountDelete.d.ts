import { BaseTransaction } from './common';
export interface AccountDelete extends BaseTransaction {
    TransactionType: 'AccountDelete';
    Destination: string;
    DestinationTag?: number;
}
export declare function validateAccountDelete(tx: Record<string, unknown>): void;
//# sourceMappingURL=accountDelete.d.ts.map