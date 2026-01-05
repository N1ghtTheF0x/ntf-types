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

/**
 * Is `value` any kind of type of `types`
 * @param value A value
 * @param types The type(s) of value
 */
export function isAnyTypeof<T extends TypeofKey>(value: unknown,...types: Array<T>): value is Typeof[T]
{
    return types.length > 0 && types.reduce((result,type) => result || typeof value == type,true)
}

/**
 * An expanded mapped type of `typeof`. This puts `null`, arrays, async function into their own category
 */
export type ExpandedTypeof = Typeof & {
    "null": null
    "array": Array<any>
    // sadly this cannot be achieved correctly :(
    //"async-function": AsyncFunction
}

/**
 * The value that {@link expandedTypeof} returns
 */
export type ExpandedTypeofKey = keyof ExpandedTypeof
/**
 * Valid values that can be passed through the {@link expandedTypeof} function
 */
export type ExpandedTypeofValue = ExpandedTypeof[ExpandedTypeofKey]

/**
 * A "better" `typeof` keyword replacement
 * @param value A value
 */
export function expandedTypeof(value: unknown): ExpandedTypeofKey
{
    if(value === null)
        return "null"
    if(Array.isArray(value))
        return "array"
    return typeof value
}

/**
 * Is `value` any kind of type of `types`. This uses {@link expandedTypeof} instead of the `typeof` keyword
 * @param value A value
 * @param types The type(s) of value
 */
export function isExpandedTypeof<T extends ExpandedTypeofKey>(value: unknown,...types: Array<T>): value is ExpandedTypeof[T]
{
    return types.length > 0 && types.reduce((result,type) => result || expandedTypeof(value) === type,true)
}