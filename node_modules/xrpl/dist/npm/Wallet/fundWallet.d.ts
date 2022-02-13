import type { Client } from '..';
import Wallet from '.';
declare enum FaucetNetwork {
    Testnet = "faucet.altnet.rippletest.net",
    Devnet = "faucet.devnet.rippletest.net"
}
declare function fundWallet(this: Client, wallet?: Wallet): Promise<{
    wallet: Wallet;
    balance: number;
}>;
declare function getFaucetUrl(client: Client): FaucetNetwork | undefined;
export default fundWallet;
declare const _private: {
    FaucetNetwork: typeof FaucetNetwork;
    getFaucetUrl: typeof getFaucetUrl;
};
export { _private };
//# sourceMappingURL=fundWallet.d.ts.map