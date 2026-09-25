# Treasury account-update security backport

Base: `87bc121acad6ba4d81df499e49ff44800c130ded`.
Source: the official `o1js@3.1.0` npm package, published on 2026-09-23.
Tarball: https://registry.npmjs.org/o1js/-/o1js-3.1.0.tgz
Tarball SHA-1: `18914ce5b08cfff8b62b1cf8d3b5777e7da3abaa`.

The inspected public GitHub history did not identify the release commit for these changes.
No public 3.2.0 package or matching security release was found on 2026-09-25.
This branch is a backport to the Treasury fork, not a claim to be upstream 3.2.0.

The backport includes:

- Full checks for witnessed account updates. The `skipCheck` bypass is removed.
- Nested calls bind the witnessed token ID to the callee's `this.tokenId`.
- Ordinary account updates are not omitted because their public key is empty.
- Conditional updates use `OptionalAccountUpdate` and an explicit `isSome` value.

The two implementation modules match the published package source.
The related example and batch-reducer test use the new optional-update API.
The fork retains UInt128, VerificationKey.fromData, extra exports, and LocalBlockchain.setNetworkState.
The Mina, WASM, and native backend artifacts are unchanged.
Node ESM, Node CommonJS, browser modules, declarations, bundles, and source maps were rebuilt.
The browser rebundle script now gives the map its referenced filename.

## Validation

The three security regression cases fail on the base and pass after the backport.
The explicit conditional-update regression also passes.
These tests exercise the installed outputs, not only the TypeScript source.
The checks also passed against the CommonJS and browser bundles.
A real-proof test includes a valid nested call and rejects a wrong-token prover witness.

```sh
node --test tests/o1js-security-regression.test.mjs
O1JS_TEST_MODULE=../dist/node/index.cjs node --test tests/o1js-security-regression.test.mjs
O1JS_SECURITY_PROOFS=true node --test tests/o1js-security-proof.test.mjs
```

Treasury integration results are recorded in the consuming repository.
These circuit changes require new verification keys.
Installing this branch does not update already deployed contracts.
