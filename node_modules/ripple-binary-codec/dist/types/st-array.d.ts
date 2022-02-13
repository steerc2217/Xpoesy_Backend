import { SerializedType, JsonObject } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
/**
 * Class for serializing and deserializing Arrays of Objects
 */
declare class STArray extends SerializedType {
    /**
     * Construct an STArray from a BinaryParser
     *
     * @param parser BinaryParser to parse an STArray from
     * @returns An STArray Object
     */
    static fromParser(parser: BinaryParser): STArray;
    /**
     * Construct an STArray from an Array of JSON Objects
     *
     * @param value STArray or Array of Objects to parse into an STArray
     * @returns An STArray object
     */
    static from<T extends STArray | Array<JsonObject>>(value: T): STArray;
    /**
     * Return the JSON representation of this.bytes
     *
     * @returns An Array of JSON objects
     */
    toJSON(): Array<JsonObject>;
}
export { STArray };
