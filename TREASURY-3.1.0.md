# Treasury fork: o1js 3.1.0

This release includes the complete o1js 3.1.0 runtime source changes.
The release retains the Treasury extensions: UInt128, VerificationKey.fromData,
LocalBlockchain.setNetworkState, and additional public exports.
It includes the account-update security fixes and the UInt128 integer constraints.

The official npm 3.1.0 tarball is the comparison baseline.
All src/lib implementation files match that baseline except the required
extensions in int.ts, verification-key.ts, and local-blockchain.ts, plus the
nested-call instance-cache correction in zkapp.ts.
The entry point exports those extensions and the existing additional APIs.
The compiled cryptographic backend remains unchanged.

The native package stays at 3.0.0. The registry has no @o1js/native 3.1.0 package.
This explicit pin preserves the existing Mesa/native backend.

Validation: ten account-update and arithmetic regressions pass.
Real native nested-call and UInt128 proofs pass. Browser security checks pass.
The nested-call regression now passes with explicit post-call approval.
All nine full Treasury lifecycle proof tests and all three Proposal-specific
reducer proof tests pass with the native backend.
The fork refreshes the SmartContract.self instance cache with the checked
witnessed update in both compilation and proving. This corrects the
FieldVector bounds errors in Treasury vote and tally methods.

Recompile the Treasury contracts and deploy matching verification keys.
Existing on-chain contracts do not receive these changes from a package update.
