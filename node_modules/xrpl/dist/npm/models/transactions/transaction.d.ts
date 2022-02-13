import { AccountDelete } from './accountDelete';
import { AccountSet } from './accountSet';
import { CheckCancel } from './checkCancel';
import { CheckCash } from './checkCash';
import { CheckCreate } from './checkCreate';
import { DepositPreauth } from './depositPreauth';
import { EscrowCancel } from './escrowCancel';
import { EscrowCreate } from './escrowCreate';
import { EscrowFinish } from './escrowFinish';
import { TransactionMetadata } from './metadata';
import { NFTokenAcceptOffer } from './NFTokenAcceptOffer';
import { NFTokenBurn } from './NFTokenBurn';
import { NFTokenCancelOffer } from './NFTokenCancelOffer';
import { NFTokenCreateOffer } from './NFTokenCreateOffer';
import { NFTokenMint } from './NFTokenMint';
import { OfferCancel } from './offerCancel';
import { OfferCreate } from './offerCreate';
import { Payment } from './payment';
import { PaymentChannelClaim } from './paymentChannelClaim';
import { PaymentChannelCreate } from './paymentChannelCreate';
import { PaymentChannelFund } from './paymentChannelFund';
import { SetRegularKey } from './setRegularKey';
import { SignerListSet } from './signerListSet';
import { TicketCreate } from './ticketCreate';
import { TrustSet } from './trustSet';
export declare type Transaction = AccountDelete | AccountSet | CheckCancel | CheckCash | CheckCreate | DepositPreauth | EscrowCancel | EscrowCreate | EscrowFinish | NFTokenAcceptOffer | NFTokenBurn | NFTokenCancelOffer | NFTokenCreateOffer | NFTokenMint | OfferCancel | OfferCreate | Payment | PaymentChannelClaim | PaymentChannelCreate | PaymentChannelFund | SetRegularKey | SignerListSet | TicketCreate | TrustSet;
export interface TransactionAndMetadata {
    transaction: Transaction;
    metadata: TransactionMetadata;
}
export declare function validate(transaction: Record<string, unknown>): void;
//# sourceMappingURL=transaction.d.ts.map