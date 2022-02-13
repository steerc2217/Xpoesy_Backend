import { LedgerIndex } from '../common';
import { Transaction, TransactionMetadata } from '../transactions';
import { BaseRequest, BaseResponse } from './baseMethod';
export interface TransactionEntryRequest extends BaseRequest {
    command: 'transaction_entry';
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
    tx_hash: string;
}
export interface TransactionEntryResponse extends BaseResponse {
    result: {
        ledger_hash: string;
        ledger_index: number;
        metadata: TransactionMetadata;
        tx_json: Transaction;
    };
}
//# sourceMappingURL=transactionEntry.d.ts.map