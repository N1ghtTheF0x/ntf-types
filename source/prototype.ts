import { AbstractClassConstructor } from "./class"
import { ExpectedTypeError } from "./error"
import { Function } from "./function"
import { isNullLike, NullLike } from "./null"
import { hasProperty, hasTypedProperty } from "./object"
import { Typeof, TypeofKey } from "./typeof"

/**
 * Get the prototype object from `value`. Will return `undefined` if `value` is `undefined` or `null`
 * @param value A value
 */
export function getPrototypeOf(value: any): any
export function getPrototypeOf(value: NullLike): undefined
export function getPrototypeOf(value: any | NullLike): any | undefined
{
    if(isNullLike(value))
        return undefined
    if(typeof Object == "function" && "getPrototypeOf" in Object && typeof Object.getPrototypeOf == "function")
        return Object.getPrototypeOf(value)
    if(hasTypedProperty(value,"__proto__","object"))
        return value.__proto__
    throw new ExpectedTypeError(`prototype of '${value}'`,value)
}

/**
 * Get the derived prototypes of `value`. Will return an empty array if `value` is `undefined` or `null`
 * @param value A value
 */
export function getPrototypeChain(value: any): Array<any>
export function getPrototypeChain(value: NullLike): []
export function getPrototypeChain(value: any | NullLike): Array<any> | []
{
    if(isNullLike(value))
        return []
    let prototype = getPrototypeOf(value)
    const prototypes: Array<any> = [prototype]
    do
    {
        prototype = getPrototypeOf(prototype)
        if(isNullLike(prototype))
            break
        prototypes.push(prototype)
    } while(true)
    return prototypes
}

/**
 * Assign a method `name` to the `Class`'s prototype
 * @param Class A class
 * @param name The name of the method
 * @param method A function that represents the method
 */
export function setPrototypeField<T,ReturnType,Args extends Array<any>>(Class: AbstractClassConstructor<Array<any>,T>,name: PropertyKey,method: Function<Args,ReturnType,T>): void
/**
 * Assign a property `name` to the `Class`'s prototype
 * @param Class A class
 * @param name The name of the property
 * @param value A value
 */
export function setPrototypeField<T>(Class: AbstractClassConstructor<Array<any>,T>,name: PropertyKey,value: any): void
export function setPrototypeField<T>(Class: AbstractClassConstructor<Array<any>,T>,name: PropertyKey,value: any): void
{
    if(hasTypedProperty(Class,"prototype","object"))
        Object.defineProperty(Class.prototype,name,{value: value})
}

/**
 * Assign a readonly property `name` to the `Class`'s prototype
 * @param Class A class
 * @param name The name of the readonly property
 * @param value A value
 */
//export function setPrototypeReadonlyField(Class: AbstractClassConstructor,name: PropertyKey,value: any): void
//{
//    return setPrototypeField(Class,name,() => value,() => {throw new TypeError(`Cannot assign to '${String(name)}' because it is a read-only property.`)})
//}

/**
 * Get method `name` from `Class`'s prototype
 * @param Class A class
 * @param name The name of the method
 */
export function getPrototypeMethod<T,ReturnType,Args extends Array<any>>(Class: AbstractClassConstructor<Array<any>,T>,name: PropertyKey): Function<Args,ReturnType,T> | undefined
{
    if(hasTypedProperty(Class,"prototype","object") && hasTypedProperty(Class.prototype,name,"function"))
        return Class.prototype[name]
    return undefined
}

/**
 * Get field `name` from `Class`'s prototype
 * @param Class A class
 * @param name The name of the field
 */
export function getPrototypeField(Class: AbstractClassConstructor,name: PropertyKey): unknown
{
    if(hasTypedProperty(Class,"prototype","object") && hasProperty(Class.prototype,name))
        return Class.prototype[name]
    return undefined
}

/**
 * Get field `name` from `Class`'s prototype as `types`
 * @param Class A class
 * @param name The name of the field
 * @param types The type(s) of the field
 */
export function getPrototypeTypedField(Class: AbstractClassConstructor,name: PropertyKey): undefined
export function getPrototypeTypedField<T extends TypeofKey>(Class: AbstractClassConstructor,name: PropertyKey,...types: Array<T>): Typeof[T] | undefined
export function getPrototypeTypedField<T extends TypeofKey>(Class: AbstractClassConstructor,name: PropertyKey,...types: Array<T>): Typeof[T] | undefined
{
    if(hasTypedProperty(Class,"prototype","object") && hasTypedProperty(Class.prototype,name,...types))
        return Class.prototype[name]
    return undefined
}