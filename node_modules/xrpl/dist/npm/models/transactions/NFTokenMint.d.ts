import { BaseTransaction, GlobalFlags } from './common';
export declare enum NFTokenMintFlags {
    tfBurnable = 1,
    tfOnlyXRP = 2,
    tfTrustLine = 4,
    tfTransferable = 8
}
export interface NFTokenMintFlagsInterface extends GlobalFlags {
    tfBurnable?: boolean;
    tfOnlyXRP?: boolean;
    tfTrustLine?: boolean;
    tfTransferable?: boolean;
}
export interface NFTokenMint extends BaseTransaction {
    TransactionType: 'NFTokenMint';
    TokenTaxon: number;
    Issuer?: string;
    TransferFee?: number;
    URI?: string;
    Flags?: number | NFTokenMintFlagsInterface;
}
export declare function validateNFTokenMint(tx: Record<string, unknown>): void;
//# sourceMappingURL=NFTokenMint.d.ts.map