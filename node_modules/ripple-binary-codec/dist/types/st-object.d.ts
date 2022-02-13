import { SerializedType, JsonObject } from './serialized-type';
import { BinaryParser } from '../serdes/binary-parser';
/**
 * Class for Serializing/Deserializing objects
 */
declare class STObject extends SerializedType {
    /**
     * Construct a STObject from a BinaryParser
     *
     * @param parser BinaryParser to read STObject from
     * @returns A STObject object
     */
    static fromParser(parser: BinaryParser): STObject;
    /**
     * Construct a STObject from a JSON object
     *
     * @param value An object to include
     * @param filter optional, denote which field to include in serialized object
     * @returns a STObject object
     */
    static from<T extends STObject | JsonObject>(value: T, filter?: (...any: any[]) => boolean): STObject;
    /**
     * Get the JSON interpretation of this.bytes
     *
     * @returns a JSON object
     */
    toJSON(): JsonObject;
}
export { STObject };
