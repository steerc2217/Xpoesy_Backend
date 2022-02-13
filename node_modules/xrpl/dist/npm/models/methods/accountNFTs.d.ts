import { BaseRequest, BaseResponse } from './baseMethod';
export interface AccountNFTsRequest extends BaseRequest {
    command: 'account_nfts';
    account: string;
    limit?: number;
    marker?: unknown;
}
interface AccountNFToken {
    Flags: number;
    Issuer: string;
    TokenID: string;
    TokenTaxon: number;
    nft_serial: number;
}
export interface AccountNFTsResponse extends BaseResponse {
    result: {
        account: string;
        account_nfts: AccountNFToken[];
        ledger_current_index: number;
        validated: boolean;
        marker?: unknown;
        limit?: number;
    };
}
export {};
//# sourceMappingURL=accountNFTs.d.ts.map