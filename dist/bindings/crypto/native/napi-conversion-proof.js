import { MlArray, MlOption, MlTuple } from '../../../lib/ml/base.js';
import { fieldFromRust, fieldToRust, fieldsFromRustFlat, fieldsToRustFlat, } from '../bindings/conversion-base.js';
import { pointEvalsOptionFromRust, pointEvalsOptionToRust, proofEvaluationsFromRust, proofEvaluationsToRust, } from '../bindings/conversion-proof-shared.js';
import { asArrayLike, castCtor } from './napi-ffi.js';
export { napiProofConversion };
function napiProofConversion(napi, core) {
    return {
        fp: proofConversionPerField(core.fp, {
            ProverCommitments: napi.WasmFpProverCommitments,
            OpeningProof: napi.WasmFpOpeningProof,
            VecVec: napi.WasmVecVecFp,
            ProverProof: napi.WasmFpProverProof,
            LookupCommitments: napi.WasmFpLookupCommitments,
            LookupTable: napi.WasmPastaFpLookupTable,
        }),
        fq: proofConversionPerField(core.fq, {
            ProverCommitments: napi.WasmFqProverCommitments,
            OpeningProof: napi.WasmFqOpeningProof,
            VecVec: napi.WasmVecVecFq,
            ProverProof: napi.WasmFqProverProof,
            LookupCommitments: napi.WasmFqLookupCommitments,
            LookupTable: napi.WasmPastaFqLookupTable,
        }),
    };
}
function proofConversionPerField(core, { ProverCommitments, OpeningProof, VecVec, ProverProof, LookupCommitments, LookupTable, }) {
    const ProverCommitmentsCtor = castCtor(ProverCommitments);
    const OpeningProofCtor = castCtor(OpeningProof);
    const LookupCommitmentsCtor = castCtor(LookupCommitments);
    const ProverProofCtor = castCtor(ProverProof);
    function commitmentsToRust(commitments) {
        let wComm = core.polyCommsToRust(commitments[1]);
        let zComm = core.polyCommToRust(commitments[2]);
        let tComm = core.polyCommToRust(commitments[3]);
        let lookup = MlOption.mapFrom(commitments[4], lookupCommitmentsToRust);
        return new ProverCommitmentsCtor(wComm, zComm, tComm, lookup);
    }
    function commitmentsFromRust(commitments) {
        let wComm = core.polyCommsFromRust(commitments.w_comm);
        let zComm = core.polyCommFromRust(commitments.z_comm);
        let tComm = core.polyCommFromRust(commitments.t_comm);
        // Normalize optional lookup to an MlOption; mapTo expects a value or undefined.
        let lookup = MlOption.mapTo(commitments.lookup ?? undefined, (lk) => lookupCommitmentsFromRust(lk));
        return [0, wComm, zComm, tComm, lookup];
    }
    function lookupCommitmentsToRust(lookup) {
        let sorted = core.polyCommsToRust(lookup[1]);
        let aggreg = core.polyCommToRust(lookup[2]);
        let runtime = MlOption.mapFrom(lookup[3], core.polyCommToRust);
        return new LookupCommitmentsCtor(sorted, aggreg, runtime);
    }
    function lookupCommitmentsFromRust(lookup) {
        if (lookup == null)
            return undefined;
        let sorted = core.polyCommsFromRust(lookup.sorted);
        let aggreg = core.polyCommFromRust(lookup.aggreg);
        let runtime = MlOption.mapTo(lookup.runtime ?? undefined, core.polyCommFromRust);
        return [0, sorted, aggreg, runtime];
    }
    function openingProofToRust(proof) {
        let [_, [, ...lr], delta, z1, z2, sg] = proof;
        // We pass l and r as separate vectors over the FFI
        let l = [0];
        let r = [0];
        for (let [, li, ri] of lr) {
            l.push(li);
            r.push(ri);
        }
        return new OpeningProofCtor(core.pointsToRust(l), core.pointsToRust(r), core.pointToRust(delta), fieldToRust(z1), fieldToRust(z2), core.pointToRust(sg));
    }
    function openingProofFromRust(proof) {
        let [, ...l] = core.pointsFromRust(proof.lr_0);
        let [, ...r] = core.pointsFromRust(proof.lr_1);
        let n = l.length;
        if (n !== r.length)
            throw Error('openingProofFromRust: l and r length mismatch.');
        let lr = l.map((li, i) => [0, li, r[i]]);
        let delta = core.pointFromRust(proof.delta);
        let z1 = fieldFromRust(proof.z1);
        let z2 = fieldFromRust(proof.z2);
        let sg = core.pointFromRust(proof.sg);
        return [0, [0, ...lr], delta, z1, z2, sg];
    }
    function runtimeTableToRust([, id, data]) {
        return { id, data: core.vectorToRust(data) };
    }
    function runtimeTableCfgToRust([, id, firstColumn]) {
        return { id, firstColumn: core.vectorToRust(firstColumn) };
    }
    function lookupTableToRust([, id, [, ...data]]) {
        let n = data.length;
        let wasmData = new VecVec(n);
        for (let i = 0; i < n; i++) {
            wasmData.push(fieldsToRustFlat(data[i]));
        }
        return new LookupTable(id, wasmData);
    }
    return {
        proofToRust([, public_evals, proof]) {
            let commitments = commitmentsToRust(proof[1]);
            let openingProof = openingProofToRust(proof[2]);
            // NAPI expects proof evaluations as a plain object (camelCase keys), not an OCaml tuple.
            // This matches the `#[napi(object)] Wasm*ProofEvaluationsObject` accepted by Rust via
            // `FromNapiValue` for `Wasm*ProofEvaluations`.
            const evalsTuple = proofEvaluationsToRust(proof[3]);
            const publicEvalsTuple = pointEvalsOptionToRust(public_evals);
            const pointEvalsTupleToObject = (pe) => {
                const [, zeta, zeta_omega] = pe;
                return {
                    zeta: MlArray.from(zeta),
                    zetaOmega: MlArray.from(zeta_omega),
                };
            };
            const optionPointEvalsToObject = (opt) => {
                if (opt == null || opt === 0)
                    return undefined;
                return pointEvalsTupleToObject(opt[1]);
            };
            const publicObj = publicEvalsTuple === 0 ? undefined : pointEvalsTupleToObject(publicEvalsTuple[1]);
            const [, w, z, s, coefficients, genericSelector, poseidonSelector, completeAddSelector, mulSelector, emulSelector, endomulScalarSelector, rangeCheck0Selector, rangeCheck1Selector, foreignFieldAddSelector, foreignFieldMulSelector, xorSelector, rotSelector, lookupAggregation, lookupTable, lookupSorted, runtimeLookupTable, runtimeLookupTableSelector, xorLookupSelector, lookupGateLookupSelector, rangeCheckLookupSelector, foreignFieldMulLookupSelector,] = evalsTuple;
            const lookupSortedObjs = MlArray.from(lookupSorted).map((opt) => opt === 0 ? undefined : pointEvalsTupleToObject(opt[1]));
            const evalsActual = {
                public: publicObj,
                w: MlTuple.mapFrom(w, pointEvalsTupleToObject),
                z: pointEvalsTupleToObject(z),
                s: MlTuple.mapFrom(s, pointEvalsTupleToObject),
                coefficients: MlTuple.mapFrom(coefficients, pointEvalsTupleToObject),
                genericSelector: pointEvalsTupleToObject(genericSelector),
                poseidonSelector: pointEvalsTupleToObject(poseidonSelector),
                completeAddSelector: pointEvalsTupleToObject(completeAddSelector),
                mulSelector: pointEvalsTupleToObject(mulSelector),
                emulSelector: pointEvalsTupleToObject(emulSelector),
                endomulScalarSelector: pointEvalsTupleToObject(endomulScalarSelector),
                rangeCheck0Selector: optionPointEvalsToObject(rangeCheck0Selector),
                rangeCheck1Selector: optionPointEvalsToObject(rangeCheck1Selector),
                foreignFieldAddSelector: optionPointEvalsToObject(foreignFieldAddSelector),
                foreignFieldMulSelector: optionPointEvalsToObject(foreignFieldMulSelector),
                xorSelector: optionPointEvalsToObject(xorSelector),
                rotSelector: optionPointEvalsToObject(rotSelector),
                lookupAggregation: optionPointEvalsToObject(lookupAggregation),
                lookupTable: optionPointEvalsToObject(lookupTable),
                lookupSorted: lookupSortedObjs,
                runtimeLookupTable: optionPointEvalsToObject(runtimeLookupTable),
                runtimeLookupTableSelector: optionPointEvalsToObject(runtimeLookupTableSelector),
                xorLookupSelector: optionPointEvalsToObject(xorLookupSelector),
                lookupGateLookupSelector: optionPointEvalsToObject(lookupGateLookupSelector),
                rangeCheckLookupSelector: optionPointEvalsToObject(rangeCheckLookupSelector),
                foreignFieldMulLookupSelector: optionPointEvalsToObject(foreignFieldMulLookupSelector),
            };
            let ftEval1 = fieldToRust(proof[4]);
            let public_ = fieldsToRustFlat(proof[5]);
            let [, ...prevChallenges] = proof[6];
            let n = prevChallenges.length;
            let prevChallengeScalars = new VecVec(n);
            let prevChallengeCommsMl = [0];
            for (let [, scalars, comms] of prevChallenges) {
                prevChallengeScalars.push(fieldsToRustFlat(scalars));
                prevChallengeCommsMl.push(comms);
            }
            let prevChallengeComms = core.polyCommsToRust(prevChallengeCommsMl);
            return new ProverProofCtor(commitments, openingProof, evalsActual, ftEval1, public_, prevChallengeScalars, prevChallengeComms);
        },
        proofFromRust(napiProof) {
            // If we received the full prover proof (with commitments field), use it directly.
            // Otherwise fall back to an older wrapper shape `{ proof, public_input }`.
            let commitments = commitmentsFromRust(napiProof.commitments);
            let openingProof = openingProofFromRust(napiProof.proof);
            // NAPI returns `evals` as an object with getters; convert it into the OCaml tuple shape
            // expected by `proofEvaluationsFromRust`.
            const evalsSource = napiProof.evals;
            const toPointEvals = (pe) => {
                const zeta = MlArray.to(asArrayLike(pe?.zeta));
                const zetaOmega = MlArray.to(asArrayLike(pe?.zetaOmega));
                return [0, zeta, zetaOmega];
            };
            const toMlOption = (value, f) => MlOption.mapTo(value ?? undefined, f);
            const publicEvalsBytes = toMlOption(evalsSource?.public, toPointEvals);
            const publicEvals = pointEvalsOptionFromRust(publicEvalsBytes);
            const w = MlArray.to(asArrayLike(evalsSource?.w).map(toPointEvals));
            const z = toPointEvals(evalsSource?.z);
            const s = MlArray.to(asArrayLike(evalsSource?.s).map(toPointEvals));
            const coefficients = MlArray.to(asArrayLike(evalsSource?.coefficients).map(toPointEvals));
            const lookupSorted = MlArray.map([
                0,
                ...asArrayLike(evalsSource?.lookupSorted),
            ], (x) => toMlOption(x, toPointEvals));
            const evalsBytes = [
                0,
                w,
                z,
                s,
                coefficients,
                toPointEvals(evalsSource?.genericSelector),
                toPointEvals(evalsSource?.poseidonSelector),
                toPointEvals(evalsSource?.completeAddSelector),
                toPointEvals(evalsSource?.mulSelector),
                toPointEvals(evalsSource?.emulSelector),
                toPointEvals(evalsSource?.endomulScalarSelector),
                toMlOption(evalsSource?.rangeCheck0Selector, toPointEvals),
                toMlOption(evalsSource?.rangeCheck1Selector, toPointEvals),
                toMlOption(evalsSource?.foreignFieldAddSelector, toPointEvals),
                toMlOption(evalsSource?.foreignFieldMulSelector, toPointEvals),
                toMlOption(evalsSource?.xorSelector, toPointEvals),
                toMlOption(evalsSource?.rotSelector, toPointEvals),
                toMlOption(evalsSource?.lookupAggregation, toPointEvals),
                toMlOption(evalsSource?.lookupTable, toPointEvals),
                lookupSorted,
                toMlOption(evalsSource?.runtimeLookupTable, toPointEvals),
                toMlOption(evalsSource?.runtimeLookupTableSelector, toPointEvals),
                toMlOption(evalsSource?.xorLookupSelector, toPointEvals),
                toMlOption(evalsSource?.lookupGateLookupSelector, toPointEvals),
                toMlOption(evalsSource?.rangeCheckLookupSelector, toPointEvals),
                toMlOption(evalsSource?.foreignFieldMulLookupSelector, toPointEvals),
            ];
            const evals = proofEvaluationsFromRust(evalsBytes);
            let ftEval1 = fieldFromRust(napiProof.ft_eval1);
            let public_ = fieldsFromRustFlat(napiProof.public_);
            let prevChallengeScalars = napiProof.prev_challenges_scalars;
            let [, ...prevChallengeComms] = core.polyCommsFromRust(napiProof.prev_challenges_comms);
            let prevChallenges = prevChallengeComms.map((comms, i) => {
                let scalars = fieldsFromRustFlat(prevChallengeScalars.get(i));
                return [0, scalars, comms];
            });
            let proof = [
                0,
                commitments,
                openingProof,
                evals,
                ftEval1,
                public_,
                [0, ...prevChallenges],
            ];
            return [0, publicEvals, proof];
        },
        runtimeTablesToRust([, ...tables]) {
            return tables.map(runtimeTableToRust);
        },
        runtimeTableCfgsToRust([, ...tableCfgs]) {
            return tableCfgs.map(runtimeTableCfgToRust);
        },
        lookupTablesToRust([, ...tables]) {
            return tables.map(lookupTableToRust);
        },
    };
}
//# sourceMappingURL=napi-conversion-proof.js.map