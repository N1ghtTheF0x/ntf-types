import { ExpectedTypeError } from "./error"
import { NodeJSCustomInspect } from "./symbol"

/**
 * A string that has a fixed length
 */
export type FixedString<Length extends number> = string & {length: Length}

/**
 * Check if `value` is a string
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a string
 */
export function checkString(value: string): void
export function checkString(value: unknown): never
export function checkString(value: unknown): void
{
    if(typeof value != "string")
        throw new ExpectedTypeError("string",value)
}

/**
 * Is `value` a valid string. Valid means it has content
 * @param value A value
 */
export function isValidString(value: unknown): value is string
{
    return typeof value == "string" && value.length > 0
}

/**
 * Check if `value` is a valid string. Valid means it has content
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a valid string
 */
export function checkValidString(value: string): void
export function checkValidString(value: unknown): never
export function checkValidString(value: unknown): void
{
    if(!isValidString(value))
        throw new ExpectedTypeError("valid string",value)
}

/**
 * Is `value` a fixed string?
 * @param value A value
 * @param length The exact size of the string
 */
export function isFixedString<Length extends number>(value: unknown,length: Length): value is FixedString<Length>
{
    return typeof value == "string" && value.length === length
}

/**
 * Check if `value` is a fixed string
 * @param value A value
 * @param length The exact size of the string
 * @throws {ExpectedTypeError} The value should be a fixed string
 */
export function checkFixedString<Length extends number>(value: FixedString<Length>,length: Length): void
export function checkFixedString(value: unknown,length: number): never
export function checkFixedString(value: unknown,length: number): void
{
    if(!isFixedString(value,length))
        throw new ExpectedTypeError(`string with a length of ${length}`,value)
}

/**
 * A interface that implements `toString` and other string coercion
 */
export interface IToString
{
    /**
     * Return a string representing this object
     */
    toString(): string
    /**
     * The string description of this object
     */
    readonly [Symbol.toStringTag]?: string
    /**
     * The custom inspect method for NodeJS `node:util` `inspect` function
     * @param depth The current recurrsion depth
     * @param options Options passed through the first `inspect` call
     * @param inspect The inspect function itself
     */
    [NodeJSCustomInspect]?(depth: number,options: NodeJSCustomInspect.IOptions,inspect: NodeJSCustomInspect.Inspect): string 
}

