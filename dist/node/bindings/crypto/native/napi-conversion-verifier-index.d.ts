import { MlArray } from '../../../lib/ml/base.js';
import { Field, VerifierIndex } from '../bindings/kimchi-types.js';
import { ConversionCores } from './napi-conversion-core.js';
import type { Napi, NapiShiftsShape, NapiVerifierIndex } from './napi-wrappers.js';
export { napiVerifierIndexConversion };
declare function napiVerifierIndexConversion(napi: Napi, core: ConversionCores): {
    fp: {
        shiftsToRust([, ...shifts]: MlArray<Field>): NapiShiftsShape;
        shiftsFromRust(s: NapiShiftsShape): MlArray<Field>;
        verifierIndexToRust(vk: VerifierIndex): NapiVerifierIndex;
        verifierIndexFromRust(vk: NapiVerifierIndex): VerifierIndex;
    };
    fq: {
        shiftsToRust([, ...shifts]: MlArray<Field>): NapiShiftsShape;
        shiftsFromRust(s: NapiShiftsShape): MlArray<Field>;
        verifierIndexToRust(vk: VerifierIndex): NapiVerifierIndex;
        verifierIndexFromRust(vk: NapiVerifierIndex): VerifierIndex;
    };
};
