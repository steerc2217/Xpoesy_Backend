import { BaseTransaction } from './common';
export interface NFTokenBurn extends BaseTransaction {
    TransactionType: 'NFTokenBurn';
    Account: string;
    TokenID: string;
}
export declare function validateNFTokenBurn(tx: Record<string, unknown>): void;
//# sourceMappingURL=NFTokenBurn.d.ts.map