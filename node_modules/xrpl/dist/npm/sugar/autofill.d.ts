import type { Client } from '..';
import { Transaction } from '../models/transactions';
declare function autofill<T extends Transaction>(this: Client, transaction: T, signersCount?: number): Promise<T>;
export default autofill;
//# sourceMappingURL=autofill.d.ts.map