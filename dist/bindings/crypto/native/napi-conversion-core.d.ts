import { MlArray } from '../../../lib/ml/base.js';
import { fieldsFromRustFlat } from '../bindings/conversion-base.js';
import { Field, Gate, OrInfinity, PolyComm, Wire } from '../bindings/kimchi-types.js';
import type { Napi, NapiAffine, NapiPolyComm, NapiCoreClasses } from './napi-wrappers.js';
export { ConversionCore, ConversionCores, napiConversionCore };
type ConversionCore = ReturnType<typeof conversionCorePerField>;
type ConversionCores = ReturnType<typeof napiConversionCore>;
declare function wireToRust([, row, col]: Wire): {
    row: number;
    col: number;
};
declare function napiConversionCore(napi: Napi): {
    fp: {
        vectorToRust: (fields: MlArray<Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: typeof wireToRust;
        gateToRust: (gate: Gate) => {
            typ: number;
            wires: {
                readonly w0: {
                    row: number;
                    col: number;
                };
                readonly w1: {
                    row: number;
                    col: number;
                };
                readonly w2: {
                    row: number;
                    col: number;
                };
                readonly w3: {
                    row: number;
                    col: number;
                };
                readonly w4: {
                    row: number;
                    col: number;
                };
                readonly w5: {
                    row: number;
                    col: number;
                };
                readonly w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[];
        };
        gateFromRust: (gate: {
            typ: number;
            wires: {
                w0: {
                    row: number;
                    col: number;
                };
                w1: {
                    row: number;
                    col: number;
                };
                w2: {
                    row: number;
                    col: number;
                };
                w3: {
                    row: number;
                    col: number;
                };
                w4: {
                    row: number;
                    col: number;
                };
                w5: {
                    row: number;
                    col: number;
                };
                w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[] | Uint8Array;
        }) => Gate;
        affineToRust: (pt: OrInfinity) => NapiAffine;
        affineFromRust: (pt: NapiAffine) => OrInfinity;
        pointToRust: (pt: OrInfinity) => NapiAffine;
        pointFromRust: (pt: NapiAffine) => OrInfinity;
        pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
        pointsFromRust: (points: ArrayLike<NapiAffine>) => MlArray<OrInfinity>;
        polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
        polyCommFromRust: (polyComm: NapiPolyComm) => PolyComm;
        polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
    };
    fq: {
        vectorToRust: (fields: MlArray<Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: typeof wireToRust;
        gateToRust: (gate: Gate) => {
            typ: number;
            wires: {
                readonly w0: {
                    row: number;
                    col: number;
                };
                readonly w1: {
                    row: number;
                    col: number;
                };
                readonly w2: {
                    row: number;
                    col: number;
                };
                readonly w3: {
                    row: number;
                    col: number;
                };
                readonly w4: {
                    row: number;
                    col: number;
                };
                readonly w5: {
                    row: number;
                    col: number;
                };
                readonly w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[];
        };
        gateFromRust: (gate: {
            typ: number;
            wires: {
                w0: {
                    row: number;
                    col: number;
                };
                w1: {
                    row: number;
                    col: number;
                };
                w2: {
                    row: number;
                    col: number;
                };
                w3: {
                    row: number;
                    col: number;
                };
                w4: {
                    row: number;
                    col: number;
                };
                w5: {
                    row: number;
                    col: number;
                };
                w6: {
                    row: number;
                    col: number;
                };
            };
            coeffs: number[] | Uint8Array;
        }) => Gate;
        affineToRust: (pt: OrInfinity) => NapiAffine;
        affineFromRust: (pt: NapiAffine) => OrInfinity;
        pointToRust: (pt: OrInfinity) => NapiAffine;
        pointFromRust: (pt: NapiAffine) => OrInfinity;
        pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
        pointsFromRust: (points: ArrayLike<NapiAffine>) => MlArray<OrInfinity>;
        polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
        polyCommFromRust: (polyComm: NapiPolyComm) => PolyComm;
        polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
    };
    wireToRust: typeof wireToRust;
    mapMlArrayToRustVector<TMl, TRust>([, ...array]: [0, ...TMl[]], map: (x: TMl) => TRust): TRust[];
};
declare function conversionCorePerField({ makeAffine, PolyComm }: NapiCoreClasses): {
    vectorToRust: (fields: MlArray<Field>) => Uint8Array;
    vectorFromRust: typeof fieldsFromRustFlat;
    wireToRust: typeof wireToRust;
    gateToRust: (gate: Gate) => {
        typ: number;
        wires: {
            readonly w0: {
                row: number;
                col: number;
            };
            readonly w1: {
                row: number;
                col: number;
            };
            readonly w2: {
                row: number;
                col: number;
            };
            readonly w3: {
                row: number;
                col: number;
            };
            readonly w4: {
                row: number;
                col: number;
            };
            readonly w5: {
                row: number;
                col: number;
            };
            readonly w6: {
                row: number;
                col: number;
            };
        };
        coeffs: number[];
    };
    gateFromRust: (gate: {
        typ: number;
        wires: {
            w0: {
                row: number;
                col: number;
            };
            w1: {
                row: number;
                col: number;
            };
            w2: {
                row: number;
                col: number;
            };
            w3: {
                row: number;
                col: number;
            };
            w4: {
                row: number;
                col: number;
            };
            w5: {
                row: number;
                col: number;
            };
            w6: {
                row: number;
                col: number;
            };
        };
        coeffs: Uint8Array | number[];
    }) => Gate;
    affineToRust: (pt: OrInfinity) => NapiAffine;
    affineFromRust: (pt: NapiAffine) => OrInfinity;
    pointToRust: (pt: OrInfinity) => NapiAffine;
    pointFromRust: (pt: NapiAffine) => OrInfinity;
    pointsToRust: ([, ...points]: MlArray<OrInfinity>) => NapiAffine[];
    pointsFromRust: (points: ArrayLike<NapiAffine>) => MlArray<OrInfinity>;
    polyCommToRust: (polyComm: PolyComm) => NapiPolyComm;
    polyCommFromRust: (polyComm: NapiPolyComm) => PolyComm;
    polyCommsToRust: ([, ...comms]: MlArray<PolyComm>) => NapiPolyComm[];
    polyCommsFromRust: (rustComms: unknown) => MlArray<PolyComm>;
};
