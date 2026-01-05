import { ExpectedTypeError } from "./error"
import { isNotNullLike } from "./null"
import { isAnyTypeof, Typeof, TypeofKey } from "./typeof"

/**
 * Check if `value` is an object
 * @param value A value
 * @throws {ExpectedTypeError} The value should be an object
 */
export function checkObject(value: object | null): void
export function checkObject(value: unknown): never
export function checkObject(value: unknown): void
{
    if(typeof value != "object")
        throw new ExpectedTypeError("object",value)
}

/**
 * Is `value` an valid object. Valid means it's not `null` or `undefined`
 * @param value A value
 */
export function isValidObject(value: unknown): value is object
{
    return isNotNullLike(value) && typeof value == "object"
}

/**
 * Check if `value` is an valid object. Valid means it's not `null` or `undefined`
 * @param value A value
 * @throws {ExpectedTypeError} The value should be an valid object
 */
export function checkValidObject(value: object): void
export function checkValidObject(value: unknown): never
export function checkValidObject(value: unknown): void
{
    if(!isValidObject(value))
        throw new ExpectedTypeError("valid object",value)
}

/**
 * Has `value` a property called `property`?
 * @param value A value
 * @param property The name of the property
 */
export function hasProperty<V,K extends PropertyKey>(value: V,property: K): value is V & Record<K,unknown>
{
    return isNotNullLike(value) && isAnyTypeof(value,"function","object") && property in value
}

/**
 * Has `value` a property called `property` as `type`?
 * @param value A value
 * @param property The name of the property
 * @param types The type(s) of the property
 */
export function hasTypedProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,...types: Array<T>): value is V & Record<K,Typeof[T]>
export function hasTypedProperty<V,K extends PropertyKey>(value: V,property: K): false
export function hasTypedProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,...types: Array<T>): value is V & Record<K,Typeof[T]>
{
    return hasProperty(value,property) && types.length > 0 && types.reduce((result,type) => result || typeof (value as any)[property] == type,true)
}

/**
 * Check if `value` has a property called `property`
 * @param value A value
 * @param property The name of the property
 * @throws {ExpectedTypeError} The value should have a property called `property`
 */
export function checkProperty<V,K extends PropertyKey>(value: V,property: K): void
export function checkProperty(value: unknown,property: PropertyKey): never
export function checkProperty<V,K extends PropertyKey>(value: V,property: K): void
{
    if(!hasProperty(value,property))
        throw new ExpectedTypeError(`object with a property '${String(property)}'`,value)
}

/**
 * Check if `value` has a property called `property` as `type`
 * @param value A value
 * @param property The name of the property
 * @param types The type(s) of the property
 * @throws {ExpectedTypeError} The value should have a property called `property` as `type`
 */
export function checkTypedProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,...types: Array<T>): void
export function checkTypedProperty(value: unknown,property: PropertyKey,...types: Array<TypeofKey>): never
export function checkTypedProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,...types: Array<T>): void
{
    if(!hasTypedProperty(value,property,...types))
        throw new ExpectedTypeError(`object with a property '${String(property)}' as ${types.map(type => `'${type}'`).join(" or ")}`,value)
}