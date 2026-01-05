import { ExpectedTypeError } from "./error"

/**
 * Any kind of type that represents null. JavaScript has two types: `undefined` and `null`
 */
export type NullLike = undefined | null

/**
 * Is `value` `null` or `undefined`
 * @param value A value
 */
export function isNullLike(value: unknown): value is NullLike
{
    return value === null || value === undefined
}

/**
 * Is `value` not `null` or `undefined`
 * @param value A value
 */
export function isNotNullLike<T>(value: T | NullLike): value is T
{
    return !isNullLike(value)
}

/**
 * Check if `value` is `null` or `undefined`
 * @param value A value
 * @throws {ExpectedTypeError} The value should be `null` or `undefined`
 */
export function checkNullLike(value: NullLike): void
export function checkNullLike(value: unknown): never
export function checkNullLike(value: unknown): void | never
{
    if(!isNullLike(value))
        throw new ExpectedTypeError("null or undefined",value)
}