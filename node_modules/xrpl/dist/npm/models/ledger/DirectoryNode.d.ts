import BaseLedgerEntry from './BaseLedgerEntry';
export default interface DirectoryNode extends BaseLedgerEntry {
    LedgerEntryType: 'DirectoryNode';
    Flags: number;
    RootIndex: string;
    Indexes: string[];
    IndexNext?: number;
    IndexPrevious?: number;
    Owner?: string;
    TakerPaysCurrency?: string;
    TakerPaysIssuer?: string;
    TakerGetsCurrency?: string;
    TakerGetsIssuer?: string;
}
//# sourceMappingURL=DirectoryNode.d.ts.map