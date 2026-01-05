import { AbstractClassConstructor } from "./class"
import { ExpectedTypeError } from "./error"
import { Compare } from "./function"

/**
 * The unique symbol used for custom inspect function inside a object
 */
export const NodeJSCustomInspect = Symbol.for("nodejs.util.inspect.custom")
export namespace NodeJSCustomInspect
{
    /**
     * Options passed to the `inspect` function from `node:util`. Consult the {@link https://nodejs.org/api/util.html#utilinspectobject-options docs} for more information
     */
    export interface IOptions
    {
        showHidden?: boolean
        depth?: number | null
        colors?: boolean
        customInspect?: boolean
        showProxy?: boolean
        maxArrayLength?: number | null
        maxStringLength?: number | null
        breakLength?: number
        compact?: boolean | number
        sorted?: boolean | Compare<string>
        getters?: boolean | "get" | "set"
        numericSeperator?: boolean
    }
    /**
     * The inspect function signature from `node:util`
     */
    export type Inspect = (object: unknown,options?: IOptions) => string
    /**
     * The value type of `object[NodeJSCustomInspect]`
     */
    export type Type<This = any> = (this: This,depth: number,options: IOptions,inspect: Inspect) => string
}

/**
 * Assign `value` a custom inspect method for NodeJS runtimes
 * @param Class A value
 * @param inspect The custom inspect method
 */
export function setNodeJSCustomInspect<T>(Class: AbstractClassConstructor<Array<any>,T>,inspect: NodeJSCustomInspect.Type<T>): void
{
    Object.defineProperty(Class.prototype,NodeJSCustomInspect,{value: inspect})
}

/**
 * Check if `value` is a symbol
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a symbol
 */
export function checkSymbol(value: symbol): void
export function checkSymbol(value: unknown): never
export function checkSymbol(value: unknown): void
{
    if(typeof value != "symbol")
        throw new ExpectedTypeError("symbol",value)
}