import { fieldFromRust, fieldToRust, fieldsFromRustFlat, fieldsToRustFlat, } from '../bindings/conversion-base.js';
import { mapTuple } from '../bindings/util.js';
import { asArrayLike, } from './napi-ffi.js';
export { napiConversionCore };
function wireToRust([, row, col]) {
    return { row, col };
}
function wireFromRust({ row, col }) {
    return [0, row, col];
}
function napiConversionCore(napi) {
    const fpCore = conversionCorePerField({
        makeAffine: napi.caml_vesta_affine_one,
        PolyComm: napi.WasmFpPolyComm,
    });
    const fqCore = conversionCorePerField({
        makeAffine: napi.caml_pallas_affine_one,
        PolyComm: napi.WasmFqPolyComm,
    });
    return {
        fp: {
            ...fpCore,
        },
        fq: {
            ...fqCore,
        },
        wireToRust,
        mapMlArrayToRustVector([, ...array], map) {
            return array.map(map);
        },
    };
}
function conversionCorePerField({ makeAffine, PolyComm }) {
    const vectorToRust = (fields) => fieldsToRustFlat(fields);
    const vectorFromRust = fieldsFromRustFlat;
    const gateToRust = (gate) => {
        const [, typ, [, ...wires], coeffs] = gate;
        const mapped = mapTuple(wires, wireToRust);
        const nativeWires = {
            w0: mapped[0],
            w1: mapped[1],
            w2: mapped[2],
            w3: mapped[3],
            w4: mapped[4],
            w5: mapped[5],
            w6: mapped[6],
        };
        return {
            typ,
            wires: nativeWires,
            coeffs: Array.from(fieldsToRustFlat(coeffs)),
        };
    };
    const gateFromRust = (gate) => {
        const { w0, w1, w2, w3, w4, w5, w6 } = gate.wires;
        const wiresTuple = [
            0,
            wireFromRust(w0),
            wireFromRust(w1),
            wireFromRust(w2),
            wireFromRust(w3),
            wireFromRust(w4),
            wireFromRust(w5),
            wireFromRust(w6),
        ];
        const coeffBytes = gate.coeffs instanceof Uint8Array ? gate.coeffs : Uint8Array.from(gate.coeffs);
        const coeffs = fieldsFromRustFlat(coeffBytes);
        return [0, gate.typ, wiresTuple, coeffs];
    };
    const affineToRust = (pt) => {
        function isFinitePoint(point) {
            return Array.isArray(point);
        }
        let res = makeAffine();
        if (!isFinitePoint(pt)) {
            res.infinity = true;
        }
        else {
            const [, pair] = pt;
            const [, x, y] = pair;
            // `WasmGVesta` / `WasmGPallas` are `#[napi(object)]` (plain JS objects), so assigning the
            // same backing buffer to both `x` and `y` corrupts the point. Always use distinct byte
            // arrays for each coordinate.
            res.x = fieldToRust(x);
            res.y = fieldToRust(y);
        }
        return res;
    };
    const affineFromRust = (pt) => {
        if (pt.infinity)
            return 0;
        const xField = fieldFromRust(pt.x);
        const yField = fieldFromRust(pt.y);
        return [0, [0, xField, yField]];
    };
    const pointsToRust = ([, ...points]) => points.map(affineToRust);
    const pointsFromRust = (points) => [
        0,
        ...Array.from(points, affineFromRust),
    ];
    const polyCommToRust = (polyComm) => {
        const [, camlElems] = polyComm;
        const unshifted = pointsToRust(camlElems);
        const PolyCommClass = PolyComm;
        return new PolyCommClass(unshifted, undefined);
    };
    const polyCommFromRust = (polyComm) => {
        const rustUnshifted = asArrayLike(polyComm.unshifted, 'polyComm.unshifted');
        const mlUnshifted = rustUnshifted.map(affineFromRust);
        return [0, [0, ...mlUnshifted]];
    };
    const polyCommsToRust = ([, ...comms]) => comms.map(polyCommToRust);
    const polyCommsFromRust = (rustComms) => {
        if (rustComms == null) {
            throw Error('polyCommsFromRust: expected array-like native values');
        }
        const comms = asArrayLike(rustComms, 'polyCommsFromRust');
        return [0, ...comms.map(polyCommFromRust)];
    };
    const self = {
        vectorToRust,
        vectorFromRust,
        wireToRust,
        gateToRust,
        gateFromRust,
        affineToRust,
        affineFromRust,
        pointToRust: affineToRust,
        pointFromRust: affineFromRust,
        pointsToRust,
        pointsFromRust,
        polyCommToRust,
        polyCommFromRust,
        polyCommsToRust,
        polyCommsFromRust,
    };
    return self;
}
//# sourceMappingURL=napi-conversion-core.js.map