import { MlArray, MlOption, MlTuple } from '../../../lib/ml/base.js';
import { fieldFromRust, fieldToRust } from './conversion-base.js';
export { fieldToRust_, proofEvaluationsToRust, proofEvaluationsFromRust, pointEvalsOptionToRust, pointEvalsOptionFromRust, createMapPointEvals, mapPointEvalsOption, mapProofEvaluations, };
const fieldToRust_ = (x) => fieldToRust(x);
const proofEvaluationsToRust = mapProofEvaluations(fieldToRust_);
const proofEvaluationsFromRust = mapProofEvaluations(fieldFromRust);
const pointEvalsOptionToRust = mapPointEvalsOption(fieldToRust_);
const pointEvalsOptionFromRust = mapPointEvalsOption(fieldFromRust);
function createMapPointEvals(map) {
    return (evals) => {
        let [, zeta, zeta_omega] = evals;
        return [0, MlArray.map(zeta, map), MlArray.map(zeta_omega, map)];
    };
}
function mapPointEvalsOption(map) {
    return (evals) => MlOption.map(evals, createMapPointEvals(map));
}
function mapProofEvaluations(map) {
    const mapPointEvals = createMapPointEvals(map);
    const mapPointEvalsOption = (evals) => MlOption.map(evals, mapPointEvals);
    return function mapProofEvaluations(evals) {
        let [, w, z, s, coeffs, genericSelector, poseidonSelector, completeAddSelector, mulSelector, emulSelector, endomulScalarSelector, rangeCheck0Selector, rangeCheck1Selector, foreignFieldAddSelector, foreignFieldMulSelector, xorSelector, rotSelector, lookupAggregation, lookupTable, lookupSorted, runtimeLookupTable, runtimeLookupTableSelector, xorLookupSelector, lookupGateLookupSelector, rangeCheckLookupSelector, foreignFieldMulLookupSelector,] = evals;
        return [
            0,
            MlTuple.map(w, mapPointEvals),
            mapPointEvals(z),
            MlTuple.map(s, mapPointEvals),
            MlTuple.map(coeffs, mapPointEvals),
            mapPointEvals(genericSelector),
            mapPointEvals(poseidonSelector),
            mapPointEvals(completeAddSelector),
            mapPointEvals(mulSelector),
            mapPointEvals(emulSelector),
            mapPointEvals(endomulScalarSelector),
            mapPointEvalsOption(rangeCheck0Selector),
            mapPointEvalsOption(rangeCheck1Selector),
            mapPointEvalsOption(foreignFieldAddSelector),
            mapPointEvalsOption(foreignFieldMulSelector),
            mapPointEvalsOption(xorSelector),
            mapPointEvalsOption(rotSelector),
            mapPointEvalsOption(lookupAggregation),
            mapPointEvalsOption(lookupTable),
            MlArray.map(lookupSorted, mapPointEvalsOption),
            mapPointEvalsOption(runtimeLookupTable),
            mapPointEvalsOption(runtimeLookupTableSelector),
            mapPointEvalsOption(xorLookupSelector),
            mapPointEvalsOption(lookupGateLookupSelector),
            mapPointEvalsOption(rangeCheckLookupSelector),
            mapPointEvalsOption(foreignFieldMulLookupSelector),
        ];
    };
}
//# sourceMappingURL=conversion-proof-shared.js.map