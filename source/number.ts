import { ExpectedTypeError } from "./error"

/**
 * A union type that accepts any kind of numeric type
 */
export type NumberLike = number | bigint

/**
 * Check if `value` is a number
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a number
 */
export function checkNumber(value: number): void
export function checkNumber(value: unknown): never
export function checkNumber(value: unknown): void
{
    if(typeof value != "number")
        throw new ExpectedTypeError("valid number",value)
}

/**
 * Is `value` a valid number? Valid means it's finite and not `NaN`
 * @param value A value
 */
export function isValidNumber(value: unknown): value is number
{
    return typeof value == "number" && !isNaN(value) && isFinite(value)
}

/**
 * Check if `value` is a valid number. Valid means it's finite and not `NaN`
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a valid number
 */
export function checkValidNumber(value: number): void
export function checkValidNumber(value: unknown): never
export function checkValidNumber(value: unknown): void
{
    if(!isValidNumber(value))
        throw new ExpectedTypeError("valid number",value)
}

/**
 * Check if `value` is a big integer
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a big integer
 */
export function checkBigInt(value: bigint): void
export function checkBigInt(value: unknown): never
export function checkBigInt(value: unknown): void
{
    if(typeof value !== "bigint")
        throw new ExpectedTypeError("bigint",value)
}

/**
 * Is `value` any kind of numeric type?
 * @param value A value
 */
export function isNumberLike(value: unknown): value is NumberLike
{
    return typeof value == "number" || typeof value == "bigint"
}

/**
 * Check if `value` is any kind of numeric type
 * @param value A value
 * @throws {ExpectedTypeError} The value should be any kind of numeric type
 */
export function checkNumberLike(value: NumberLike): void
export function checkNumberLike(value: unknown): never
export function checkNumberLike(value: unknown): void
{
    if(!isNumberLike(value))
        throw new ExpectedTypeError("number or bigint",value)
}

/**
 * Is `value` a valid numeric type? Valid means it's finite and not `NaN`
 * @param value A value
 */
export function isValidNumberLike(value: unknown): value is NumberLike
{
    return isValidNumber(value) || typeof value == "bigint"
}

/**
 * Check if `value` is a valid numeric type. Valid means it's finite and not `NaN`
 * @param value A value
 * @throws {ExpectedTypeError} The value should be any kind of valid numeric type
 */
export function checkValidNumberLike(value: NumberLike): void
export function checkValidNumberLike(value: unknown): never
export function checkValidNumberLike(value: unknown): void
{
    if(!isValidNumberLike(value))
        throw new ExpectedTypeError("valid number or bigint",value)
}