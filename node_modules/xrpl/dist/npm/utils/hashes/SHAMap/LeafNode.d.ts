import { NodeType, Node } from './node';
declare class LeafNode extends Node {
    tag: string;
    type: NodeType;
    data: string;
    constructor(tag: string, data: string, type: NodeType);
    addItem(tag: string, node: Node): void;
    get hash(): string;
}
export default LeafNode;
//# sourceMappingURL=LeafNode.d.ts.map