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