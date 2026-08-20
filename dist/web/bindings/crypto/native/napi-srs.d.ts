import { MlArray } from '../../../lib/ml/base.js';
import type { RustConversion } from '../bindings.js';
import type { Napi, NapiSrs } from './napi-wrappers.js';
import { PolyComm } from '../bindings/kimchi-types.js';
export { srs };
declare function srs(napi: Napi, conversion: RustConversion<'native'>): {
    fp: {
        /**
         * returns existing stored SRS or falls back to creating a new one
         */
        create(size: number): NapiSrs;
        /**
         * returns ith Lagrange basis commitment for a given domain size
         */
        lagrangeCommitment(srs: NapiSrs, domainSize: number, i: number): PolyComm;
        /**
         * Returns the Lagrange basis commitments for the whole domain
         */
        lagrangeCommitmentsWholeDomain(srs: NapiSrs, domainSize: number): MlArray<PolyComm>;
        /**
         * adds Lagrange basis for a given domain size
         */
        addLagrangeBasis(srs: NapiSrs, logSize: number): void;
    };
    fq: {
        /**
         * returns existing stored SRS or falls back to creating a new one
         */
        create(size: number): NapiSrs;
        /**
         * returns ith Lagrange basis commitment for a given domain size
         */
        lagrangeCommitment(srs: NapiSrs, domainSize: number, i: number): PolyComm;
        /**
         * Returns the Lagrange basis commitments for the whole domain
         */
        lagrangeCommitmentsWholeDomain(srs: NapiSrs, domainSize: number): MlArray<PolyComm>;
        /**
         * adds Lagrange basis for a given domain size
         */
        addLagrangeBasis(srs: NapiSrs, logSize: number): void;
    };
};
