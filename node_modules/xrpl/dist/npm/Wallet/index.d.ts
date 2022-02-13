import ECDSA from '../ECDSA';
import { Transaction } from '../models/transactions';
declare class Wallet {
    readonly publicKey: string;
    readonly privateKey: string;
    readonly classicAddress: string;
    readonly seed?: string;
    get address(): string;
    constructor(publicKey: string, privateKey: string, opts?: {
        masterAddress?: string;
        seed?: string;
    });
    static generate(algorithm?: ECDSA): Wallet;
    static fromSeed(seed: string, opts?: {
        masterAddress?: string;
        algorithm?: ECDSA;
    }): Wallet;
    static fromSecret: typeof Wallet.fromSeed;
    static fromMnemonic(mnemonic: string, opts?: {
        masterAddress?: string;
        derivationPath?: string;
    }): Wallet;
    static fromEntropy(entropy: Uint8Array | number[], opts?: {
        masterAddress?: string;
        algorithm?: ECDSA;
    }): Wallet;
    private static deriveWallet;
    sign(this: Wallet, transaction: Transaction, multisign?: boolean | string): {
        tx_blob: string;
        hash: string;
    };
    verifyTransaction(signedTransaction: string): boolean;
    getXAddress(tag?: number | false, isTestnet?: boolean): string;
    private checkTxSerialization;
}
export default Wallet;
//# sourceMappingURL=index.d.ts.map