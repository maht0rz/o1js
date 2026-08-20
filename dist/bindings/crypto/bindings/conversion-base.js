import { bigintToBytes32, bytesToBigint32 } from '../bigint-helpers.js';
import { Infinity } from './curve.js';
export { affineFromRust, affineToRust, fieldFromRust, fieldToRust, fieldsFromRustFlat, fieldsToRustFlat, maybeFieldToRust, };
// TODO: Hardcoding this is a little brittle
// TODO read from field
const fieldSizeBytes = 32;
// field, field vectors
function fieldToRust([, x], dest = new Uint8Array(32)) {
    return bigintToBytes32(x, dest);
}
function fieldFromRust(x) {
    // Some native bindings may return byte arrays as plain `number[]`.
    // Normalize so downstream code can rely on `Uint8Array` APIs.
    let bytes = x instanceof Uint8Array ? x : Uint8Array.from(x);
    return [0, bytesToBigint32(bytes)];
}
function fieldsToRustFlat([, ...fields]) {
    let n = fields.length;
    let flatBytes = new Uint8Array(n * fieldSizeBytes);
    for (let i = 0, offset = 0; i < n; i++, offset += fieldSizeBytes) {
        fieldToRust(fields[i], flatBytes.subarray(offset, offset + fieldSizeBytes));
    }
    return flatBytes;
}
function fieldsFromRustFlat(fieldBytes) {
    // Some native bindings may return byte arrays as plain `number[]`.
    fieldBytes =
        fieldBytes instanceof Uint8Array
            ? fieldBytes
            : Uint8Array.from(fieldBytes);
    let n = fieldBytes.length / fieldSizeBytes;
    if (!Number.isInteger(n)) {
        throw Error('fieldsFromRustFlat: invalid bytes');
    }
    let fields = Array(n);
    for (let i = 0, offset = 0; i < n; i++, offset += fieldSizeBytes) {
        // Use `subarray()` so we slice relative to the view (works for `Buffer` too),
        // and avoid relying on `byteOffset` alignment/pooling details.
        let fieldView = fieldBytes.subarray(offset, offset + fieldSizeBytes);
        fields[i] = fieldFromRust(fieldView);
    }
    return [0, ...fields];
}
function maybeFieldToRust(x) {
    return x && fieldToRust(x);
}
function affineFromRust(pt) {
    if (pt.infinity) {
        pt.free();
        return 0;
    }
    else {
        let x = fieldFromRust(pt.x);
        let y = fieldFromRust(pt.y);
        pt.free();
        return [0, [0, x, y]];
    }
}
function affineToRust(pt, makeAffine) {
    let res = makeAffine();
    if (pt === Infinity) {
        res.infinity = true;
    }
    else {
        let [, [, x, y]] = pt;
        res.x = fieldToRust(x);
        res.y = fieldToRust(y);
    }
    return res;
}
//# sourceMappingURL=conversion-base.js.map