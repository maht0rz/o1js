import { prefixHashes, prefixHashesLegacy } from '../crypto/constants.js';
import { Bigint256Bindings } from './bindings/bigint256.js';
import { fieldsFromRustFlat, fieldsToRustFlat } from './bindings/conversion-base.js';
import { conversionCore as wasmConversionCore } from './bindings/conversion-core.js';
import { oraclesConversion as wasmOraclesConversion } from './bindings/conversion-oracles.js';
import { proofConversion as wasmProofConversion } from './bindings/conversion-proof.js';
import { verifierIndexConversion as wasmVerifierIndexConversion } from './bindings/conversion-verifier-index.js';
import { PallasBindings, VestaBindings } from './bindings/curve.js';
import { jsEnvironment } from './bindings/env.js';
import { FpBindings, FqBindings } from './bindings/field.js';
import { FpVectorBindings, FqVectorBindings } from './bindings/vector.js';
import { srs as wasmSrs } from './bindings/srs.js';
import { srs as napiSrs } from './native/napi-srs.js';
import { napiConversionCore } from './native/napi-conversion-core.js';
import { napiProofConversion } from './native/napi-conversion-proof.js';
import { napiVerifierIndexConversion } from './native/napi-conversion-verifier-index.js';
import { napiOraclesConversion } from './native/napi-conversion-oracles.js';
export { getRustConversion };
const tsBindings = {
    jsEnvironment,
    prefixHashes,
    prefixHashesLegacy,
    ...Bigint256Bindings,
    ...FpBindings,
    ...FqBindings,
    ...VestaBindings,
    ...PallasBindings,
    ...FpVectorBindings,
    ...FqVectorBindings,
    rustConversion: (rust) => getConversionBundle(rust).conversion,
    srs: (rust) => getConversionBundle(rust).srs,
};
// this is put in a global variable so that mina/src/lib/crypto/kimchi_bindings/js/bindings.js finds it
globalThis.__snarkyTsBindings = tsBindings;
// Whether or not native backend is in use
function getKimchiBackend(rust) {
    const backend = rust.__kimchi_backend ?? globalThis?.__kimchi_backend;
    return backend === 'native' ? 'native' : 'wasm';
}
function getRustConversion(rust) {
    return getKimchiBackend(rust) === 'wasm'
        ? buildWasmRustConversion(rust)
        : buildNapiRustConversion(rust);
}
function buildWasmRustConversion(wasm) {
    let core = wasmConversionCore(wasm);
    let proof = wasmProofConversion(wasm, core);
    let oracles = wasmOraclesConversion(wasm);
    let verifierIndex = wasmVerifierIndexConversion(wasm, core);
    return {
        fp: { ...core.fp, ...verifierIndex.fp, ...oracles.fp, ...proof.fp },
        fq: { ...core.fq, ...verifierIndex.fq, ...oracles.fq, ...proof.fq },
        fieldsToRustFlat,
        fieldsFromRustFlat,
        wireToRust: core.wireToRust,
        mapMlArrayToRustVector: core.mapMlArrayToRustVector,
    };
}
function buildNapiRustConversion(napi) {
    let core = napiConversionCore(napi);
    let proof = napiProofConversion(napi, core);
    let oracles = napiOraclesConversion(napi);
    let verifierIndex = napiVerifierIndexConversion(napi, core);
    return {
        fp: { ...core.fp, ...proof.fp, ...verifierIndex.fp, ...oracles.fp },
        fq: { ...core.fq, ...proof.fq, ...verifierIndex.fq, ...oracles.fq },
        fieldsToRustFlat,
        fieldsFromRustFlat,
        wireToRust: core.wireToRust,
        mapMlArrayToRustVector: core.mapMlArrayToRustVector,
    };
}
function getConversionBundle(rust) {
    if (getKimchiBackend(rust) === 'wasm') {
        const conversion = buildWasmRustConversion(rust);
        return { kind: 'wasm', rust, conversion, srs: wasmSrs(rust, conversion) };
    }
    const conversion = buildNapiRustConversion(rust);
    return { kind: 'native', rust, conversion, srs: napiSrs(rust, conversion) };
}
//# sourceMappingURL=bindings.js.map