import { ExpectedTypeError } from "./error"

/**
 * A typed function
 * @template Args The arguments the function expects to be called with
 * @template ReturnType The type that the function should return at the end
 * @template This The type that was passed during a bind or method call of a class
 */
export type Function<Args extends Array<any> = Array<any>,ReturnType = void,This = void> = (this: This,...args: Args) => ReturnType
/**
 * A typed function that compares `A` and `B`
 * @template A Any kind of type
 * @template B Any kind of type
 * @template ReturnType The type that the comparer should return at the end. Normally it's a number
 */
export type Compare<A,B = A,ReturnType = number> = Function<[a: A,b: B],ReturnType>
/**
 * A typed function that checks the passed arguments and returns a boolean if the type is expected
 * @template T The type to check
 * @template RT The type that is expected 
 */
export type Predicate<T> = (item: unknown) => item is T

/**
 * Check if `value` is a function
 * @param value A value
 * @throws {ExpectedTypeError} The value should be a function
 */
export function checkFunction(value: Function): void
export function checkFunction(value: unknown): never
export function checkFunction(value: unknown): void
{
    if(typeof value != "function")
        throw new ExpectedTypeError("function",value)
}