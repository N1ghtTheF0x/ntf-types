import { isNotNullLike, NullLike } from "./null"
import { isAnyTypeof, Typeof } from "./typeof"

/**
 * A typed function constructor
 * @template Args The arguments that are required for the constructor
 * @template ReturnType The class instance that should be returned from the function constructor
 */
export type ClassConstructor<Args extends Array<any> = Array<any>,ReturnType = any> = new (...args: Args) => ReturnType
/**
 * A abstract typed function constructor
 * @template Args The arguments that are required for the constructor
 * @template ReturnType The class instance that should be returned from the function constructor
 */
export type AbstractClassConstructor<Args extends Array<any> = Array<any>,ReturnType = any> = abstract new (...args: Args) => ReturnType
/**
 * A compile-time class decorator that forces the target to implement `T`. Useful for implementing static methods, fields, accessors, etc.
 * @template T A object type
 */
export function ImplementsStatic<T>(): <Class extends T & AbstractClassConstructor>(Class: Class,context: ClassDecoratorContext<Class>) => Class
{
    return function<Class extends T & AbstractClassConstructor>(Class: Class,_: ClassDecoratorContext<Class>): Class
    {
        return Class
    }
}

/**
 * A mapped type that contains some primitive constructor types
 */
export type PrimitiveConstructors = {
    "string": StringConstructor
    "boolean": BooleanConstructor
    "number": NumberConstructor
    "bigint": BigIntConstructor
    "symbol": SymbolConstructor
}

/**
 * Get the constructor function from `value`. Will return `undefined` if `value` is `null` or `undefined`
 * @param value A value
 */
export function getConstructor<Args extends Array<any>,T>(value: T): ClassConstructor<Args,T>
export function getConstructor(value: NullLike): undefined
export function getConstructor<T extends keyof PrimitiveConstructors>(value: Typeof[T]): PrimitiveConstructors[T]
export function getConstructor<Args extends Array<any>,T>(value: T | NullLike): ClassConstructor<Args,T> | PrimitiveConstructors[keyof PrimitiveConstructors] | undefined
{
    if(typeof value == "bigint")
        return BigInt
    if(typeof value == "boolean")
        return Boolean
    if(typeof value == "number")
        return Number
    if(typeof value == "string")
        return String
    if(typeof value == "symbol")
        return Symbol
    if(isNotNullLike(value) && isAnyTypeof(value,"object","function") && "constructor" in value)
        return value.constructor as ClassConstructor<Args,T>
    return undefined
}