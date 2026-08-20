export type Ctor<Args extends unknown[], T> = new (...args: Args) => T;
export declare function castCtor<C>(value: unknown): C;
export declare function asArrayLike<T>(value: unknown, context?: string): T[];
