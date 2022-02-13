import { NFTOffer } from '../common';
import { BaseRequest, BaseResponse } from './baseMethod';
export interface NFTSellOffersRequest extends BaseRequest {
    command: 'nft_sell_offers';
    tokenid: string;
}
export interface NFTSellOffersResponse extends BaseResponse {
    result: {
        offers: NFTOffer[];
        tokenid: string;
    };
}
//# sourceMappingURL=nftSellOffers.d.ts.map