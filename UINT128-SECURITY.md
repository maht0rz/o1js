# UInt128 integer arithmetic fix: audit #09

Base: `25c616cdaa63827cb07e5199ac73058163fc60a9`. The production change is
limited to `src/lib/provable/int.ts`. It retains the API, full UInt128 range,
and constant division behavior. No backend, dependency, or other integer type
changes are required.

## Minimal implementation

Use the existing checked `divMod64` gadget to split both multiplication inputs
into 64-bit limbs. Reject a nonzero product of their high limbs. Split the
low-limb product, include its carry in the cross products, and require the
result to fit in 64 bits. Reassemble the two output limbs.

Division uses this checked multiplication for `quotient * divisor` before
computing its remainder. The existing quotient/remainder bounds and
`remainder < divisor` checks remain. The quotient callback is only a witness
generator; the constraints must reject a malicious replacement.

## Integer argument

Let `B = 2^64`, `x = x0 + B*x1`, and `y = y0 + B*y1`. The existing gadget
constrains each limb to `[0, B)` and constrains both reconstructions. Write
`x0*y0 = low + B*carry`, with `low, carry < B`. Then the exact integer product
is:

```text
x*y = low + B*(x1*y0 + x0*y1 + carry) + B^2*x1*y1
```

Each limb product is below `2^128`; the cross sum is below `2^129 + 2^64`. These
bounds are below the Pasta field modulus, so none of these intermediate
operations can wrap. The constraints require `x1*y1 = 0` and the cross sum to be
less than `B`. They are necessary and sufficient for the unsigned product to fit
in 128 bits. This accepts every valid product, including `MAX * 1` and products
with one input above the 64-bit range.

For division, checked multiplication requires `q*y < 2^128`. The input and
remainder also fit in 128 bits. Thus the remainder relation cannot hold by
adding a field modulus; it proves the integer relation `x = q*y + r`. The check
`r < y` excludes zero divisors and determines the unique quotient and remainder.
Every valid unsigned division has `q*y <= x`, so the multiplication bound
excludes no valid input pair.

## Verification

The two audit regressions fail on the base revision and pass after this change.
The tests cover full-range valid products, ordinary and modular overflow,
constants, witnessed and mixed inputs, zero divisors, and malicious quotients.
Deterministic full-width samples are compared with JavaScript BigInt results.
ESM and CommonJS pass all six UInt128 tests and the four earlier account-update
regressions. Chromium accepts valid limb-boundary arithmetic and rejects both
audit attacks.

Real ZkProgram proofs pass on WASM and native backends. They verify a
maximum-value product and a division with a nonzero remainder. They reject both
audit attacks, ordinary overflow, division by zero, and an oversized limb whose
reconstruction still matches the input. Treasury's actual acceptance/approval
functions also compile, prove, and verify for ordinary, zero-approval-vote, and
large UInt64 inputs. The selected Treasury contract tests and source type checks
pass.

`Provable.runAndCheck()` does not validate custom range-check gates used by
`divMod64`. The malicious-limb real-proof case is required evidence; a passing
fast checker alone would be insufficient. The final high-limb check uses the
existing `rangeCheckN(64, ...)` constraint path.

Measured rows, including two witnessed UInt128 inputs:

| Operation               | Before | After |
| ----------------------- | -----: | ----: |
| Multiplication          |     26 |    32 |
| Division with remainder |     43 |    57 |

```sh
node --test tests/uint128-security.test.mjs
O1JS_TEST_MODULE=../dist/node/index.cjs node --test tests/uint128-security.test.mjs
O1JS_SECURITY_PROOFS=true node --test tests/uint128-security-proof.test.mjs
O1JS_BACKEND=native O1JS_SECURITY_PROOFS=true node --test tests/uint128-security-proof.test.mjs
```

The native command requires the optional native package for the current
platform. Changed constraints require new verification keys for circuits that
use these operations. This source change does not replace already deployed keys.
