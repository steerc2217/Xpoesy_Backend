import type { Client } from '../client';
import { LedgerIndex } from '../models/common';
import { BookOffer, TakerAmount } from '../models/methods/bookOffers';
declare function getOrderbook(this: Client, takerPays: TakerAmount, takerGets: TakerAmount, options?: {
    limit?: number;
    ledger_index?: LedgerIndex;
    ledger_hash?: string;
    taker?: string;
}): Promise<{
    buy: BookOffer[];
    sell: BookOffer[];
}>;
export default getOrderbook;
//# sourceMappingURL=getOrderbook.d.ts.map