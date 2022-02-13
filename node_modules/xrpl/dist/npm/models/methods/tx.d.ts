import { Transaction, TransactionMetadata } from '../transactions';
import { BaseRequest, BaseResponse } from './baseMethod';
export interface TxRequest extends BaseRequest {
    command: 'tx';
    transaction: string;
    binary?: boolean;
    min_ledger?: number;
    max_ledger?: number;
}
export interface TxResponse extends BaseResponse {
    result: {
        hash: string;
        ledger_index?: number;
        meta?: TransactionMetadata | string;
        validated?: boolean;
    } & Transaction;
    searched_all?: boolean;
}
//# sourceMappingURL=tx.d.ts.map