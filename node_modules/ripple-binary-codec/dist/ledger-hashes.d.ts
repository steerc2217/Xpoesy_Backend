import { Hash256 } from './types/hash-256';
import { JsonObject } from './types/serialized-type';
import * as bigInt from 'big-integer';
/**
 * Function computing the hash of a transaction tree
 *
 * @param param An array of transaction objects to hash
 * @returns A Hash256 object
 */
declare function transactionTreeHash(param: Array<JsonObject>): Hash256;
/**
 * Function computing the hash of accountState
 *
 * @param param A list of accountStates hash
 * @returns A Hash256 object
 */
declare function accountStateHash(param: Array<JsonObject>): Hash256;
/**
 * Interface describing a ledger header
 */
interface ledgerObject {
    ledger_index: number;
    total_coins: string | number | bigInt.BigInteger;
    parent_hash: string;
    transaction_hash: string;
    account_hash: string;
    parent_close_time: number;
    close_time: number;
    close_time_resolution: number;
    close_flags: number;
}
/**
 * Serialize and hash a ledger header
 *
 * @param header a ledger header
 * @returns the hash of header
 */
declare function ledgerHash(header: ledgerObject): Hash256;
/**
 * Decodes a serialized ledger header
 *
 * @param binary A serialized ledger header
 * @returns A JSON object describing a ledger header
 */
declare function decodeLedgerData(binary: string): object;
export { accountStateHash, transactionTreeHash, ledgerHash, decodeLedgerData };
