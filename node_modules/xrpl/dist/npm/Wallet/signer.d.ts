import { Transaction } from '../models/transactions';
import Wallet from '.';
declare function multisign(transactions: Array<Transaction | string>): string;
declare function authorizeChannel(wallet: Wallet, channelId: string, amount: string): string;
declare function verifySignature(tx: Transaction | string): boolean;
export { authorizeChannel, verifySignature, multisign };
//# sourceMappingURL=signer.d.ts.map