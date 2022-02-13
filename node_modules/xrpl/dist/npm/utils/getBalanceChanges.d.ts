import { TransactionMetadata } from '../models/transactions/metadata';
export default function getBalanceChanges(metadata: TransactionMetadata): Array<{
    account: string;
    balances: Array<{
        currency: string;
        issuer?: string;
        value: string;
    }>;
}>;
//# sourceMappingURL=getBalanceChanges.d.ts.map