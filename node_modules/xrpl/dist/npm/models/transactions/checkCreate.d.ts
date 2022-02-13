import { Amount } from '../common';
import { BaseTransaction } from './common';
export interface CheckCreate extends BaseTransaction {
    TransactionType: 'CheckCreate';
    Destination: string;
    SendMax: Amount;
    DestinationTag?: number;
    Expiration?: number;
    InvoiceID?: string;
}
export declare function validateCheckCreate(tx: Record<string, unknown>): void;
//# sourceMappingURL=checkCreate.d.ts.map