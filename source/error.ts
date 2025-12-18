/**
 * A error class that represents that a type was expected but received something else
 */
export class ExpectedTypeError extends TypeError
{
    /**
     * 
     * @param expected The type that was expected
     * @param received The value that was recevied instead
     * @param options Additional error options
     */
    public constructor(public readonly expected: string,public readonly received: unknown,options?: ErrorOptions)
    {
        super(`expected '${expected}', received '${received}'`,options)
    }
}