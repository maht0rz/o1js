/**
 * This file contains bindings for JSOO written in TS and integrated with our normal code base.
 * It is exposed to JSOO by populating a global variable with an object.
 * It gets imported as the first thing in ../../bindings.js so that the global variable is ready by the time JSOO code gets executed.
 */
import type * as rustNamespace from '../compiled/node_bindings/kimchi_wasm.cjs';
import { fieldsFromRustFlat, fieldsToRustFlat } from './bindings/conversion-base.js';
export { Napi, Wasm, RustConversion, getRustConversion };
type Rust = typeof rustNamespace;
type Wasm = Rust;
type Napi = Rust;
type BackendKind = 'wasm' | 'native';
type WasmConversion = ReturnType<typeof buildWasmRustConversion>;
type NapiConversion = ReturnType<typeof buildNapiRustConversion>;
type RustConversion<B extends BackendKind = BackendKind> = B extends 'wasm' ? WasmConversion : NapiConversion;
declare function getRustConversion(rust: Rust): RustConversion;
declare function buildWasmRustConversion(wasm: Rust): {
    fp: {
        proofToRust([, public_evals, proof]: import("./bindings/kimchi-types.js").ProofWithPublic): rustNamespace.WasmFpProverProof | rustNamespace.WasmFqProverProof;
        proofFromRust(wasmProof: rustNamespace.WasmFpProverProof | rustNamespace.WasmFqProverProof): import("./bindings/kimchi-types.js").ProofWithPublic;
        runtimeTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTable>): Uint32Array;
        runtimeTableCfgsToRust([, ...tableCfgs]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTableCfg>): Uint32Array;
        lookupTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").LookupTable>): Uint32Array;
        oraclesToRust(oracles: import("./bindings/kimchi-types.js").Oracles): rustNamespace.WasmFpOracles | rustNamespace.WasmFqOracles;
        oraclesFromRust(oracles: rustNamespace.WasmFpOracles | rustNamespace.WasmFqOracles): import("./bindings/kimchi-types.js").Oracles;
        shiftsToRust([, ...shifts]: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>): rustNamespace.WasmFpShifts | rustNamespace.WasmFqShifts;
        shiftsFromRust(s: rustNamespace.WasmFpShifts | rustNamespace.WasmFqShifts): import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>;
        verifierIndexToRust(vk: import("./bindings/kimchi-types.js").VerifierIndex): rustNamespace.WasmFpPlonkVerifierIndex | rustNamespace.WasmFqPlonkVerifierIndex;
        verifierIndexFromRust(vk: rustNamespace.WasmFpPlonkVerifierIndex | rustNamespace.WasmFqPlonkVerifierIndex): import("./bindings/kimchi-types.js").VerifierIndex;
        wireToRust([, row, col]: import("./bindings/kimchi-types.js").Wire): rustNamespace.Wire;
        vectorToRust: typeof fieldsToRustFlat;
        vectorFromRust: typeof fieldsFromRustFlat;
        gateToRust(gate: import("./bindings/kimchi-types.js").Gate): rustNamespace.WasmFpGate | rustNamespace.WasmFqGate;
        gateFromRust(wasmGate: rustNamespace.WasmFpGate | rustNamespace.WasmFqGate): never;
        pointToRust(point: import("./bindings/curve.js").OrInfinity): import("./bindings/conversion-base.js").WasmAffine;
        pointFromRust: typeof import("./bindings/conversion-base.js").affineFromRust;
        pointsToRust([, ...points]: import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>): Uint32Array;
        pointsFromRust(points: Uint32Array): import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>;
        polyCommToRust(polyComm: import("./bindings/kimchi-types.js").PolyComm): rustNamespace.WasmFpPolyComm | rustNamespace.WasmFqPolyComm;
        polyCommFromRust(polyComm: rustNamespace.WasmFpPolyComm | rustNamespace.WasmFqPolyComm): import("./bindings/kimchi-types.js").PolyComm;
        polyCommsToRust([, ...comms]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>): Uint32Array;
        polyCommsFromRust(rustComms: Uint32Array): import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>;
    };
    fq: {
        proofToRust([, public_evals, proof]: import("./bindings/kimchi-types.js").ProofWithPublic): rustNamespace.WasmFpProverProof | rustNamespace.WasmFqProverProof;
        proofFromRust(wasmProof: rustNamespace.WasmFpProverProof | rustNamespace.WasmFqProverProof): import("./bindings/kimchi-types.js").ProofWithPublic;
        runtimeTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTable>): Uint32Array;
        runtimeTableCfgsToRust([, ...tableCfgs]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTableCfg>): Uint32Array;
        lookupTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").LookupTable>): Uint32Array;
        oraclesToRust(oracles: import("./bindings/kimchi-types.js").Oracles): rustNamespace.WasmFpOracles | rustNamespace.WasmFqOracles;
        oraclesFromRust(oracles: rustNamespace.WasmFpOracles | rustNamespace.WasmFqOracles): import("./bindings/kimchi-types.js").Oracles;
        shiftsToRust([, ...shifts]: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>): rustNamespace.WasmFpShifts | rustNamespace.WasmFqShifts;
        shiftsFromRust(s: rustNamespace.WasmFpShifts | rustNamespace.WasmFqShifts): import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>;
        verifierIndexToRust(vk: import("./bindings/kimchi-types.js").VerifierIndex): rustNamespace.WasmFpPlonkVerifierIndex | rustNamespace.WasmFqPlonkVerifierIndex;
        verifierIndexFromRust(vk: rustNamespace.WasmFpPlonkVerifierIndex | rustNamespace.WasmFqPlonkVerifierIndex): import("./bindings/kimchi-types.js").VerifierIndex;
        wireToRust([, row, col]: import("./bindings/kimchi-types.js").Wire): rustNamespace.Wire;
        vectorToRust: typeof fieldsToRustFlat;
        vectorFromRust: typeof fieldsFromRustFlat;
        gateToRust(gate: import("./bindings/kimchi-types.js").Gate): rustNamespace.WasmFpGate | rustNamespace.WasmFqGate;
        gateFromRust(wasmGate: rustNamespace.WasmFpGate | rustNamespace.WasmFqGate): never;
        pointToRust(point: import("./bindings/curve.js").OrInfinity): import("./bindings/conversion-base.js").WasmAffine;
        pointFromRust: typeof import("./bindings/conversion-base.js").affineFromRust;
        pointsToRust([, ...points]: import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>): Uint32Array;
        pointsFromRust(points: Uint32Array): import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>;
        polyCommToRust(polyComm: import("./bindings/kimchi-types.js").PolyComm): rustNamespace.WasmFpPolyComm | rustNamespace.WasmFqPolyComm;
        polyCommFromRust(polyComm: rustNamespace.WasmFpPolyComm | rustNamespace.WasmFqPolyComm): import("./bindings/kimchi-types.js").PolyComm;
        polyCommsToRust([, ...comms]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>): Uint32Array;
        polyCommsFromRust(rustComms: Uint32Array): import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>;
    };
    fieldsToRustFlat: typeof fieldsToRustFlat;
    fieldsFromRustFlat: typeof fieldsFromRustFlat;
    wireToRust: ([, row, col]: import("./bindings/kimchi-types.js").Wire) => rustNamespace.Wire;
    mapMlArrayToRustVector: <TMl, TRust extends {}>([, ...array]: import("../../lib/ml/base.js").MlArray<TMl>, map: (x: TMl) => TRust) => Uint32Array;
};
declare function buildNapiRustConversion(napi: Rust): {
    fp: {
        oraclesToRust(oracles: import("./bindings/kimchi-types.js").Oracles): import("./native/napi-wrappers.js").NapiOracles;
        oraclesFromRust(oracles: import("./native/napi-wrappers.js").NapiOracles): import("./bindings/kimchi-types.js").Oracles;
        shiftsToRust([, ...shifts]: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>): import("./native/napi-wrappers.js").NapiShiftsShape;
        shiftsFromRust(s: import("./native/napi-wrappers.js").NapiShiftsShape): import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>;
        verifierIndexToRust(vk: import("./bindings/kimchi-types.js").VerifierIndex): import("./native/napi-wrappers.js").NapiVerifierIndex;
        verifierIndexFromRust(vk: import("./native/napi-wrappers.js").NapiVerifierIndex): import("./bindings/kimchi-types.js").VerifierIndex;
        proofToRust([, public_evals, proof]: import("./bindings/kimchi-types.js").ProofWithPublic): import("./native/napi-wrappers.js").NapiProverProof;
        proofFromRust(napiProof: import("./native/napi-wrappers.js").NapiProverProof): import("./bindings/kimchi-types.js").ProofWithPublic;
        runtimeTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTable>): import("./native/napi-wrappers.js").NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTableCfg>): import("./native/napi-wrappers.js").NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").LookupTable>): import("./native/napi-wrappers.js").NapiLookupTable[];
        vectorToRust: (fields: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: ([, row, col]: import("./bindings/kimchi-types.js").Wire) => {
            row: number;
            col: number;
        };
        gateToRust: (gate: import("./bindings/kimchi-types.js").Gate) => {
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
        }) => import("./bindings/kimchi-types.js").Gate;
        affineToRust: (pt: import("./bindings/curve.js").OrInfinity) => import("./native/napi-wrappers.js").NapiAffine;
        affineFromRust: (pt: import("./native/napi-wrappers.js").NapiAffine) => import("./bindings/curve.js").OrInfinity;
        pointToRust: (pt: import("./bindings/curve.js").OrInfinity) => import("./native/napi-wrappers.js").NapiAffine;
        pointFromRust: (pt: import("./native/napi-wrappers.js").NapiAffine) => import("./bindings/curve.js").OrInfinity;
        pointsToRust: ([, ...points]: import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>) => import("./native/napi-wrappers.js").NapiAffine[];
        pointsFromRust: (points: ArrayLike<import("./native/napi-wrappers.js").NapiAffine>) => import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>;
        polyCommToRust: (polyComm: import("./bindings/kimchi-types.js").PolyComm) => import("./native/napi-wrappers.js").NapiPolyComm;
        polyCommFromRust: (polyComm: import("./native/napi-wrappers.js").NapiPolyComm) => import("./bindings/kimchi-types.js").PolyComm;
        polyCommsToRust: ([, ...comms]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>) => import("./native/napi-wrappers.js").NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>;
    };
    fq: {
        oraclesToRust(oracles: import("./bindings/kimchi-types.js").Oracles): import("./native/napi-wrappers.js").NapiOracles;
        oraclesFromRust(oracles: import("./native/napi-wrappers.js").NapiOracles): import("./bindings/kimchi-types.js").Oracles;
        shiftsToRust([, ...shifts]: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>): import("./native/napi-wrappers.js").NapiShiftsShape;
        shiftsFromRust(s: import("./native/napi-wrappers.js").NapiShiftsShape): import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>;
        verifierIndexToRust(vk: import("./bindings/kimchi-types.js").VerifierIndex): import("./native/napi-wrappers.js").NapiVerifierIndex;
        verifierIndexFromRust(vk: import("./native/napi-wrappers.js").NapiVerifierIndex): import("./bindings/kimchi-types.js").VerifierIndex;
        proofToRust([, public_evals, proof]: import("./bindings/kimchi-types.js").ProofWithPublic): import("./native/napi-wrappers.js").NapiProverProof;
        proofFromRust(napiProof: import("./native/napi-wrappers.js").NapiProverProof): import("./bindings/kimchi-types.js").ProofWithPublic;
        runtimeTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTable>): import("./native/napi-wrappers.js").NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").RuntimeTableCfg>): import("./native/napi-wrappers.js").NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").LookupTable>): import("./native/napi-wrappers.js").NapiLookupTable[];
        vectorToRust: (fields: import("../../lib/ml/base.js").MlArray<import("./bindings/field.js").Field>) => Uint8Array;
        vectorFromRust: typeof fieldsFromRustFlat;
        wireToRust: ([, row, col]: import("./bindings/kimchi-types.js").Wire) => {
            row: number;
            col: number;
        };
        gateToRust: (gate: import("./bindings/kimchi-types.js").Gate) => {
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
        }) => import("./bindings/kimchi-types.js").Gate;
        affineToRust: (pt: import("./bindings/curve.js").OrInfinity) => import("./native/napi-wrappers.js").NapiAffine;
        affineFromRust: (pt: import("./native/napi-wrappers.js").NapiAffine) => import("./bindings/curve.js").OrInfinity;
        pointToRust: (pt: import("./bindings/curve.js").OrInfinity) => import("./native/napi-wrappers.js").NapiAffine;
        pointFromRust: (pt: import("./native/napi-wrappers.js").NapiAffine) => import("./bindings/curve.js").OrInfinity;
        pointsToRust: ([, ...points]: import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>) => import("./native/napi-wrappers.js").NapiAffine[];
        pointsFromRust: (points: ArrayLike<import("./native/napi-wrappers.js").NapiAffine>) => import("../../lib/ml/base.js").MlArray<import("./bindings/curve.js").OrInfinity>;
        polyCommToRust: (polyComm: import("./bindings/kimchi-types.js").PolyComm) => import("./native/napi-wrappers.js").NapiPolyComm;
        polyCommFromRust: (polyComm: import("./native/napi-wrappers.js").NapiPolyComm) => import("./bindings/kimchi-types.js").PolyComm;
        polyCommsToRust: ([, ...comms]: import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>) => import("./native/napi-wrappers.js").NapiPolyComm[];
        polyCommsFromRust: (rustComms: unknown) => import("../../lib/ml/base.js").MlArray<import("./bindings/kimchi-types.js").PolyComm>;
    };
    fieldsToRustFlat: typeof fieldsToRustFlat;
    fieldsFromRustFlat: typeof fieldsFromRustFlat;
    wireToRust: ([, row, col]: import("./bindings/kimchi-types.js").Wire) => {
        row: number;
        col: number;
    };
    mapMlArrayToRustVector: <TMl, TRust>([, ...array]: [0, ...TMl[]], map: (x: TMl) => TRust) => TRust[];
};
