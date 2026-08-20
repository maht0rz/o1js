import { Oracles } from '../bindings/kimchi-types.js';
import type { Napi, NapiOracles } from './napi-wrappers.js';
export { napiOraclesConversion };
declare function napiOraclesConversion(napi: Napi): {
    fp: {
        oraclesToRust(oracles: Oracles): NapiOracles;
        oraclesFromRust(oracles: NapiOracles): Oracles;
    };
    fq: {
        oraclesToRust(oracles: Oracles): NapiOracles;
        oraclesFromRust(oracles: NapiOracles): Oracles;
    };
};
