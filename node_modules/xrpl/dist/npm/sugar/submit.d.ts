import type { Client, SubmitResponse, Wallet } from '..';
import { TxResponse } from '../models/methods';
import { Transaction } from '../models/transactions';
declare function submit(this: Client, transaction: Transaction | string, opts?: {
    autofill?: boolean;
    failHard?: boolean;
    wallet?: Wallet;
}): Promise<SubmitResponse>;
declare function submitAndWait(this: Client, transaction: Transaction | string, opts?: {
    autofill?: boolean;
    failHard?: boolean;
    wallet?: Wallet;
}): Promise<TxResponse>;
export { submit, submitAndWait };
//# sourceMappingURL=submit.d.ts.map