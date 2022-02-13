import InnerNode from './InnerNode';
import { NodeType } from './node';
declare class SHAMap {
    root: InnerNode;
    constructor();
    addItem(tag: string, data: string, type: NodeType): void;
    get hash(): string;
}
export * from './node';
export default SHAMap;
//# sourceMappingURL=index.d.ts.map