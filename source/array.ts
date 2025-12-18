import { ExpectedTypeError } from "./error"
import { Predicate } from "./function"

/**
 * An array with a fixed length
 * @template T The type of the array elements
 * @template Length The exact size of the array
 */
export type FixedArray<T,Length extends number> = Array<T> & {length: Length}
/**
 * An readonly array with a fixed length
 * @template T The type of the array elements
 * @template Length The exact size of the array
 */
export type ReadonlyFixedArray<T,Length extends number> = ReadonlyArray<T> & {length: Length}

/**
 * Check if `value` is an array
 * @param value A value
 * @throws {ExpectedTypeError} The value should be an array
 */
export function checkArray(value: Array<any>): void
export function checkArray(value: unknown): never
export function checkArray(value: unknown): void
{
    if(!Array.isArray(value))
        throw new ExpectedTypeError("array",value)
}

/**
 * Is `value` an fixed array?
 * @param value A value
 * @param length The exact size of the array
 */
export function isFixedArray<T,Length extends number>(value: unknown,length: Length): value is FixedArray<T,Length>
{
    return Array.isArray(value) && value.length === length
}

/**
 * Check if `value` is an fixed array
 * @param value A value
 * @param length The exact size of the array
 * @throws {ExpectedTypeError} The value should be an fixed array
 */
export function checkFixedArray<T,Length extends number>(value: FixedArray<T,Length>,length: Length): void
export function checkFixedArray(value: unknown,length: number): never
export function checkFixedArray(value: unknown,length: number): void
{
    if(!isFixedArray(value,length))
        throw new ExpectedTypeError(`array with a length of ${length}`,value)
}

/**
 * Is `value` an array with specific types?
 * @param value A value
 * @param predicate A function that has the array's element as an argument and should return true if this is the expected element
 */
export function isTypeArray<T>(value: unknown,predicate: Predicate<T>): value is Array<T>
{
    return Array.isArray(value) && value.reduce((prev,cur) => prev && predicate(cur),true)
}

/**
 * Check if `value` is an array with specific types?
 * @param value A value
 * @param predicate A function that has the array's element as an argument and should return true if this is the expected element
 * @throws {ExpectedTypeError} The value should be an array with specific types
 */
export function checkTypedArray<T>(value: Array<T>,predicate: Predicate<T>): void
export function checkTypedArray<T>(value: unknown,predicate: Predicate<T>): never
export function checkTypedArray<T>(value: unknown,predicate: Predicate<T>): void
{
    if(!isTypeArray(value,predicate))
        throw new ExpectedTypeError("type array",value)
}

/**
 * Is `value` an fixed array with specific types?
 * @param value A value
 * @param predicate A function that has the array's element as an argument and should return true if this is the expected element
 * @param length The exact size of the array
 */
export function isFixedTypeArray<T,Length extends number>(value: unknown,predicate: Predicate<T>,length: Length): value is FixedArray<T,Length>
{
    return isTypeArray(value,predicate) && value.length === length
}

/**
 * Check if `value` is an fixed array with specific types?
 * @param value A value
 * @param predicate A function that has the array's element as an argument and should return true if this is the expected element
 * @param length The exact size of the array
 * @throws {ExpectedTypeError} The value should be an fixed array with specific types
 */
export function checkFixedTypeArray<T,Length extends number>(value: FixedArray<T,Length>,predicate: Predicate<T>,length: Length): void
export function checkFixedTypeArray<T>(value: unknown,predicate: Predicate<T>,length: number): never
export function checkFixedTypeArray<T>(value: unknown,predicate: Predicate<T>,length: number): void
{
    if(!isFixedTypeArray(value,predicate,length))
        throw new ExpectedTypeError(`type array with a length of ${length}`,value)
}