export { berkeleyVectors };
declare let berkeleyVectors: {
    keypair: {
        privateKey: string;
        publicKey: string;
    };
    network: string;
    payment: {
        input: {
            to: string;
            from: string;
            fee: string;
            nonce: string;
            validUntil: string;
            memo: string;
            amount: string;
        };
        output: {
            signature: {
                field: string;
                scalar: string;
            };
            publicKey: string;
            data: {
                to: string;
                from: string;
                fee: string;
                amount: string;
                nonce: string;
                memo: string;
                validUntil: string;
            };
        };
    };
    stakeDelegation: {
        input: {
            to: string;
            from: string;
            fee: string;
            nonce: string;
            validUntil: string;
            memo: string;
        };
        output: {
            signature: {
                field: string;
                scalar: string;
            };
            publicKey: string;
            data: {
                to: string;
                from: string;
                fee: string;
                nonce: string;
                memo: string;
                validUntil: string;
            };
        };
    };
    message: {
        input: string;
        output: {
            signature: {
                field: string;
                scalar: string;
            };
            publicKey: string;
            data: string;
        };
    };
    fields: {
        input: string[];
        output: {
            signature: string;
            publicKey: string;
            data: string[];
        };
    };
    nullifier: {
        input: string[];
        output: {
            publicKey: {
                x: string;
                y: string;
            };
            private: {
                c: string;
                g_r: {
                    x: string;
                    y: string;
                };
                h_m_pk_r: {
                    x: string;
                    y: string;
                };
            };
            public: {
                nullifier: {
                    x: string;
                    y: string;
                };
                s: string;
            };
        };
    };
    zkapp1: {
        input: {
            zkappCommand: {
                accountUpdates: {
                    body: {
                        publicKey: string;
                        tokenId: string;
                        update: {
                            delegate: null;
                            verificationKey: null;
                            permissions: null;
                            zkappUri: null;
                            tokenSymbol: null;
                            timing: null;
                            votingFor: null;
                        };
                        balanceChange: {
                            magnitude: string;
                            sgn: string;
                        };
                        incrementNonce: boolean;
                        events: never[];
                        actions: never[];
                        callData: string;
                        callDepth: number;
                        preconditions: {
                            network: {
                                snarkedLedgerHash: null;
                                blockchainLength: null;
                                minWindowDensity: null;
                                totalCurrency: null;
                                globalSlotSinceGenesis: null;
                                stakingEpochData: {
                                    ledger: {
                                        hash: null;
                                        totalCurrency: null;
                                    };
                                    seed: null;
                                    startCheckpoint: null;
                                    lockCheckpoint: null;
                                    epochLength: null;
                                };
                                nextEpochData: {
                                    ledger: {
                                        hash: null;
                                        totalCurrency: null;
                                    };
                                    seed: null;
                                    startCheckpoint: null;
                                    lockCheckpoint: null;
                                    epochLength: null;
                                };
                            };
                            account: {
                                balance: null;
                                nonce: null;
                                receiptChainHash: null;
                                delegate: null;
                                state: null[];
                                actionState: null;
                                provedState: null;
                                isNew: null;
                            };
                            validWhile: null;
                        };
                        useFullCommitment: boolean;
                        implicitAccountCreationFee: boolean;
                        mayUseToken: {
                            parentsOwnToken: boolean;
                            inheritFromParent: boolean;
                        };
                        authorizationKind: {
                            isSigned: boolean;
                            isProved: boolean;
                            verificationKeyHash: string;
                        };
                    };
                    authorization: {
                        proof: null;
                        signature: null;
                    };
                }[];
                memo: string;
            };
            feePayer: {
                feePayer: string;
                fee: string;
                nonce: string;
                memo: string;
                validUntil: string;
            };
        };
        output: {
            signature: string;
            publicKey: string;
            data: {
                zkappCommand: {
                    feePayer: {
                        body: {
                            publicKey: string;
                            fee: string;
                            validUntil: string;
                            nonce: string;
                        };
                        authorization: string;
                    };
                    accountUpdates: {
                        body: {
                            publicKey: string;
                            tokenId: string;
                            update: {
                                appState: null[];
                                delegate: null;
                                verificationKey: null;
                                permissions: null;
                                zkappUri: null;
                                tokenSymbol: null;
                                timing: null;
                                votingFor: null;
                            };
                            balanceChange: {
                                magnitude: string;
                                sgn: string;
                            };
                            incrementNonce: boolean;
                            events: never[];
                            actions: never[];
                            callData: string;
                            callDepth: number;
                            preconditions: {
                                network: {
                                    snarkedLedgerHash: null;
                                    blockchainLength: null;
                                    minWindowDensity: null;
                                    totalCurrency: null;
                                    globalSlotSinceGenesis: null;
                                    stakingEpochData: {
                                        ledger: {
                                            hash: null;
                                            totalCurrency: null;
                                        };
                                        seed: null;
                                        startCheckpoint: null;
                                        lockCheckpoint: null;
                                        epochLength: null;
                                    };
                                    nextEpochData: {
                                        ledger: {
                                            hash: null;
                                            totalCurrency: null;
                                        };
                                        seed: null;
                                        startCheckpoint: null;
                                        lockCheckpoint: null;
                                        epochLength: null;
                                    };
                                };
                                account: {
                                    balance: null;
                                    nonce: null;
                                    receiptChainHash: null;
                                    delegate: null;
                                    state: null[];
                                    actionState: null;
                                    provedState: null;
                                    isNew: null;
                                };
                                validWhile: null;
                            };
                            useFullCommitment: boolean;
                            implicitAccountCreationFee: boolean;
                            mayUseToken: {
                                parentsOwnToken: boolean;
                                inheritFromParent: boolean;
                            };
                            authorizationKind: {
                                isSigned: boolean;
                                isProved: boolean;
                                verificationKeyHash: string;
                            };
                        };
                        authorization: {
                            proof: null;
                            signature: null;
                        };
                    }[];
                    memo: string;
                };
                feePayer: {
                    feePayer: string;
                    fee: string;
                    nonce: string;
                    memo: string;
                    validUntil: string;
                };
            };
        };
    };
    zkapp2: {
        input: {
            zkappCommand: {
                accountUpdates: {
                    body: {
                        publicKey: string;
                        tokenId: string;
                        update: {
                            appState: null[];
                            delegate: null;
                            verificationKey: null;
                            permissions: {
                                editState: string;
                                access: string;
                                send: string;
                                receive: string;
                                setDelegate: string;
                                setPermissions: string;
                                setVerificationKey: {
                                    auth: string;
                                };
                                setZkappUri: string;
                                editActionState: string;
                                setTokenSymbol: string;
                                incrementNonce: string;
                                setVotingFor: string;
                                setTiming: string;
                            };
                            zkappUri: null;
                            tokenSymbol: null;
                            timing: null;
                            votingFor: null;
                        };
                        balanceChange: {
                            magnitude: string;
                            sgn: string;
                        };
                        incrementNonce: boolean;
                        events: never[];
                        actions: never[];
                        callData: string;
                        callDepth: number;
                        preconditions: {
                            network: {
                                snarkedLedgerHash: null;
                                blockchainLength: null;
                                minWindowDensity: null;
                                totalCurrency: null;
                                globalSlotSinceGenesis: null;
                                stakingEpochData: {
                                    ledger: {
                                        hash: null;
                                        totalCurrency: null;
                                    };
                                    seed: null;
                                    startCheckpoint: null;
                                    lockCheckpoint: null;
                                    epochLength: null;
                                };
                                nextEpochData: {
                                    ledger: {
                                        hash: null;
                                        totalCurrency: null;
                                    };
                                    seed: null;
                                    startCheckpoint: null;
                                    lockCheckpoint: null;
                                    epochLength: null;
                                };
                            };
                            account: {
                                balance: null;
                                nonce: null;
                                receiptChainHash: null;
                                delegate: null;
                                state: null[];
                                actionState: null;
                                provedState: null;
                                isNew: null;
                            };
                            validWhile: null;
                        };
                        useFullCommitment: boolean;
                        implicitAccountCreationFee: boolean;
                        mayUseToken: {
                            parentsOwnToken: boolean;
                            inheritFromParent: boolean;
                        };
                        authorizationKind: {
                            isSigned: boolean;
                            isProved: boolean;
                            verificationKeyHash: string;
                        };
                    };
                    authorization: {
                        proof: null;
                        signature: null;
                    };
                }[];
                memo: string;
            };
            feePayer: {
                feePayer: string;
                fee: string;
                nonce: string;
                memo: string;
                validUntil: string;
            };
        };
        output: {
            signature: string;
            publicKey: string;
            data: {
                zkappCommand: {
                    feePayer: {
                        body: {
                            publicKey: string;
                            fee: string;
                            validUntil: string;
                            nonce: string;
                        };
                        authorization: string;
                    };
                    accountUpdates: {
                        body: {
                            publicKey: string;
                            tokenId: string;
                            update: {
                                appState: null[];
                                delegate: null;
                                verificationKey: null;
                                permissions: {
                                    editState: string;
                                    access: string;
                                    send: string;
                                    receive: string;
                                    setDelegate: string;
                                    setPermissions: string;
                                    setVerificationKey: {
                                        auth: string;
                                        txnVersion: string;
                                    };
                                    setZkappUri: string;
                                    editActionState: string;
                                    setTokenSymbol: string;
                                    incrementNonce: string;
                                    setVotingFor: string;
                                    setTiming: string;
                                };
                                zkappUri: null;
                                tokenSymbol: null;
                                timing: null;
                                votingFor: null;
                            };
                            balanceChange: {
                                magnitude: string;
                                sgn: string;
                            };
                            incrementNonce: boolean;
                            events: never[];
                            actions: never[];
                            callData: string;
                            callDepth: number;
                            preconditions: {
                                network: {
                                    snarkedLedgerHash: null;
                                    blockchainLength: null;
                                    minWindowDensity: null;
                                    totalCurrency: null;
                                    globalSlotSinceGenesis: null;
                                    stakingEpochData: {
                                        ledger: {
                                            hash: null;
                                            totalCurrency: null;
                                        };
                                        seed: null;
                                        startCheckpoint: null;
                                        lockCheckpoint: null;
                                        epochLength: null;
                                    };
                                    nextEpochData: {
                                        ledger: {
                                            hash: null;
                                            totalCurrency: null;
                                        };
                                        seed: null;
                                        startCheckpoint: null;
                                        lockCheckpoint: null;
                                        epochLength: null;
                                    };
                                };
                                account: {
                                    balance: null;
                                    nonce: null;
                                    receiptChainHash: null;
                                    delegate: null;
                                    state: null[];
                                    actionState: null;
                                    provedState: null;
                                    isNew: null;
                                };
                                validWhile: null;
                            };
                            useFullCommitment: boolean;
                            implicitAccountCreationFee: boolean;
                            mayUseToken: {
                                parentsOwnToken: boolean;
                                inheritFromParent: boolean;
                            };
                            authorizationKind: {
                                isSigned: boolean;
                                isProved: boolean;
                                verificationKeyHash: string;
                            };
                        };
                        authorization: {
                            proof: null;
                            signature: null;
                        };
                    }[];
                    memo: string;
                };
                feePayer: {
                    feePayer: string;
                    fee: string;
                    nonce: string;
                    memo: string;
                    validUntil: string;
                };
            };
        };
    };
};
