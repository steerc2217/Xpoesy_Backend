import { Amount } from '../common';
interface CreatedNode {
    CreatedNode: {
        LedgerEntryType: string;
        LedgerIndex: string;
        NewFields: {
            [field: string]: unknown;
        };
    };
}
interface ModifiedNode {
    ModifiedNode: {
        LedgerEntryType: string;
        LedgerIndex: string;
        FinalFields?: {
            [field: string]: unknown;
        };
        PreviousFields?: {
            [field: string]: unknown;
        };
        PreviousTxnID?: string;
        PreviouTxnLgrSeq?: number;
    };
}
interface DeletedNode {
    DeletedNode: {
        LedgerEntryType: string;
        LedgerIndex: string;
        FinalFields: {
            [field: string]: unknown;
        };
    };
}
export declare type Node = CreatedNode | ModifiedNode | DeletedNode;
export interface TransactionMetadata {
    AffectedNodes: Node[];
    DeliveredAmount?: Amount;
    delivered_amount?: Amount | 'unavailable';
    TransactionIndex: number;
    TransactionResult: string;
}
export {};
//# sourceMappingURL=metadata.d.ts.map