import { NFTOffer } from '../common';
import { BaseRequest, BaseResponse } from './baseMethod';
export interface NFTBuyOffersRequest extends BaseRequest {
    command: 'nft_buy_offers';
    tokenid: string;
}
export interface NFTBuyOffersResponse extends BaseResponse {
    result: {
        offers: NFTOffer[];
        tokenid: string;
    };
}
//# sourceMappingURL=nftBuyOffers.d.ts.map