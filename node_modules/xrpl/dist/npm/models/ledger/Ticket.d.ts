import BaseLedgerEntry from './BaseLedgerEntry';
export default interface Ticket extends BaseLedgerEntry {
    LedgerEntryType: 'Ticket';
    Account: string;
    Flags: number;
    OwnerNode: string;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    TicketSequence: number;
}
//# sourceMappingURL=Ticket.d.ts.map