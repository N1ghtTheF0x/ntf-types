import { Function } from "./function"

/**
 * A mapped type containing the results of `typeof` keyword including their fitting type
 */
export type Typeof = {
    "string": string
    "number": number
    "bigint": bigint
    "boolean": boolean
    "symbol": symbol
    "undefined": undefined
    "object": object
    "function": Function
}

/**
 * The value that `typeof` returns
 */
export type TypeofKey = keyof Typeof
/**
 * "Valid" values that can be passed through the `typeof` keyword
 */
export type TypeofValue = Typeof[TypeofKey]