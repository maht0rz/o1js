import { MlArray } from '../../../lib/ml/base.js';
import type { LookupTable, ProofWithPublic, RuntimeTable, RuntimeTableCfg } from '../bindings/kimchi-types.js';
import { ConversionCores } from './napi-conversion-core.js';
import type { Napi, NapiLookupTable, NapiProverProof, NapiRuntimeTable, NapiRuntimeTableCfg } from './napi-wrappers.js';
export { napiProofConversion };
declare function napiProofConversion(napi: Napi, core: ConversionCores): {
    fp: {
        proofToRust([, public_evals, proof]: ProofWithPublic): NapiProverProof;
        proofFromRust(napiProof: NapiProverProof): ProofWithPublic;
        runtimeTablesToRust([, ...tables]: MlArray<RuntimeTable>): NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: MlArray<RuntimeTableCfg>): NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: MlArray<LookupTable>): NapiLookupTable[];
    };
    fq: {
        proofToRust([, public_evals, proof]: ProofWithPublic): NapiProverProof;
        proofFromRust(napiProof: NapiProverProof): ProofWithPublic;
        runtimeTablesToRust([, ...tables]: MlArray<RuntimeTable>): NapiRuntimeTable[];
        runtimeTableCfgsToRust([, ...tableCfgs]: MlArray<RuntimeTableCfg>): NapiRuntimeTableCfg[];
        lookupTablesToRust([, ...tables]: MlArray<LookupTable>): NapiLookupTable[];
    };
};
