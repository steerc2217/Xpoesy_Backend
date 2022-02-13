import type { Client } from '..';
import { LedgerIndex } from '../models/common';
declare function getXrpBalance(this: Client, address: string, options?: {
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
}): Promise<string>;
declare function getBalances(this: Client, address: string, options?: {
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
    peer?: string;
    limit?: number;
}): Promise<Array<{
    value: string;
    currency: string;
    issuer?: string | undefined;
}>>;
export { getXrpBalance, getBalances };
//# sourceMappingURL=balances.d.ts.map