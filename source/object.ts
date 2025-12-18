import { ExpectedTypeError } from "./error"
import { Typeof, TypeofKey } from "./typeof"

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
 * Is `value` an valid object. Valid means it's not `null`
 * @param value A value
 */
export function isValidObject(value: unknown): value is object
{
    return value !== null && typeof value == "object"
}

/**
 * Check if `value` is an valid object. Valid means it's not `null`
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
 * Has `value` a property called `property` as `type`?
 * @param value A value
 * @param property The name of the property
 * @param type The type of the property
 */
export function hasObjectProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,type: T): value is V & Record<K,Typeof[T]>
{
    return isValidObject(value) && property in value && typeof (value as any)[property] == type
}

/**
 * Check if `value` has a property called `property` as `type`
 * @param value A value
 * @param property The name of the property
 * @param type The type of the property
 * @throws {ExpectedTypeError} The value should have a property called `property` as `type`
 */
export function checkObjectProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,type: T): void
export function checkObjectProperty(value: unknown,property: PropertyKey,type: TypeofKey): never
export function checkObjectProperty<V,K extends PropertyKey,T extends TypeofKey>(value: V,property: K,type: T): void
{
    if(!hasObjectProperty(value,property,type))
        throw new ExpectedTypeError(`object with a property '${String(property)}' as a ${type}`,value)
}