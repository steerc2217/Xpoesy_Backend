import { BinaryParser } from './serdes/binary-parser';
import { AccountID } from './types/account-id';
import { BinarySerializer, BytesList } from './serdes/binary-serializer';
import { sha512Half, transactionID } from './hashes';
import { JsonObject } from './types/serialized-type';
import { Buffer } from 'buffer/';
/**
 * Construct a BinaryParser
 *
 * @param bytes hex-string to construct BinaryParser from
 * @returns A BinaryParser
 */
declare const makeParser: (bytes: string) => BinaryParser;
/**
 * Parse BinaryParser into JSON
 *
 * @param parser BinaryParser object
 * @returns JSON for the bytes in the BinaryParser
 */
declare const readJSON: (parser: BinaryParser) => JsonObject;
/**
 * Parse a hex-string into its JSON interpretation
 *
 * @param bytes hex-string to parse into JSON
 * @returns JSON
 */
declare const binaryToJSON: (bytes: string) => JsonObject;
/**
 * Interface for passing parameters to SerializeObject
 *
 * @field set signingFieldOnly to true if you want to serialize only signing fields
 */
interface OptionObject {
    prefix?: Buffer;
    suffix?: Buffer;
    signingFieldsOnly?: boolean;
}
/**
 * Function to serialize JSON object representing a transaction
 *
 * @param object JSON object to serialize
 * @param opts options for serializing, including optional prefix, suffix, and signingFieldOnly
 * @returns A Buffer containing the serialized object
 */
declare function serializeObject(object: JsonObject, opts?: OptionObject): Buffer;
/**
 * Serialize an object for signing
 *
 * @param transaction Transaction to serialize
 * @param prefix Prefix bytes to put before the serialized object
 * @returns A Buffer with the serialized object
 */
declare function signingData(transaction: JsonObject, prefix?: Buffer): Buffer;
/**
 * Interface describing fields required for a Claim
 */
interface ClaimObject extends JsonObject {
    channel: string;
    amount: string | number;
}
/**
 * Serialize a signingClaim
 *
 * @param claim A claim object to serialize
 * @returns the serialized object with appropriate prefix
 */
declare function signingClaimData(claim: ClaimObject): Buffer;
/**
 * Serialize a transaction object for multiSigning
 *
 * @param transaction transaction to serialize
 * @param signingAccount Account to sign the transaction with
 * @returns serialized transaction with appropriate prefix and suffix
 */
declare function multiSigningData(transaction: JsonObject, signingAccount: string | AccountID): Buffer;
export { BinaryParser, BinarySerializer, BytesList, ClaimObject, makeParser, serializeObject, readJSON, multiSigningData, signingData, signingClaimData, binaryToJSON, sha512Half, transactionID, };
