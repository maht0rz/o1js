/// This file contains utility functions for N-API bindings, to improve
/// type safety and ergonomics.
export function castCtor(value) {
    return value;
}
export function asArrayLike(value, context = 'asArrayLike') {
    if (value == null)
        return [];
    if (Array.isArray(value))
        return value;
    if (ArrayBuffer.isView(value))
        return Array.from(value);
    if (typeof value === 'object' && value !== null && 'length' in value) {
        const { length } = value;
        if (typeof length === 'number')
            return Array.from(value);
    }
    throw Error(`${context}: expected array-like native values`);
}
//# sourceMappingURL=napi-ffi.js.map