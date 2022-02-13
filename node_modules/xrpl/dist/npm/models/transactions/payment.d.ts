import { Amount, Path } from '../common';
import { BaseTransaction, GlobalFlags } from './common';
export declare enum PaymentFlags {
    tfNoDirectRipple = 65536,
    tfPartialPayment = 131072,
    tfLimitQuality = 262144
}
export interface PaymentFlagsInterface extends GlobalFlags {
    tfNoDirectRipple?: boolean;
    tfPartialPayment?: boolean;
    tfLimitQuality?: boolean;
}
export interface Payment extends BaseTransaction {
    TransactionType: 'Payment';
    Amount: Amount;
    Destination: string;
    DestinationTag?: number;
    InvoiceID?: string;
    Paths?: Path[];
    SendMax?: Amount;
    DeliverMin?: Amount;
    Flags?: number | PaymentFlagsInterface;
}
export declare function validatePayment(tx: Record<string, unknown>): void;
//# sourceMappingURL=payment.d.ts.map