# Cryptographic Signatures for the Bill of Computational Rights

## Security Analysis: Why PR #8 Was Rolled Back

The previous "signature system" was **security theater** that provided no actual cryptographic security:

- **No Real Cryptography**: Used SHA256 hashing instead of Ed25519 signing
- **Forgeable**: Anyone could create "signatures" by submitting PRs
- **No Identity Verification**: No way to verify signer actually controls claimed identity
- **Mutable Storage**: Signatures stored in git repository, maintainers could edit history
- **Mock Implementation**: Code explicitly labeled functions as "mock" and "simulated"

## Real Cryptographic Signature Requirements

### Core Security Properties

1. **Authenticity**: Signatures must prove the signer controls a specific cryptographic key
2. **Integrity**: Any tampering with signed content must be detectable
3. **Non-repudiation**: Signers cannot later deny having signed
4. **Immutability**: Signatures must be stored in tamper-evident way
5. **Identity Binding**: Keys must be verifiably linked to real-world identities

### Technical Requirements

1. **Real Cryptography**: Actual Ed25519 or GPG signatures (not hashes)
2. **Key Management**: Secure key generation and storage
3. **Identity Verification**: Link keys to verifiable identities
4. **Immutable Storage**: Content-addressed or blockchain-anchored storage
5. **Verification Tools**: Simple CLI and web tools for verification

## Implementation Proposals

### Option 1: Ed25519 + IPFS (Recommended MVP)

**Why This Approach:**
- Ed25519: Fast, secure, widely supported
- IPFS: Content-addressed immutable storage
- Simple: Minimal infrastructure requirements
- Verifiable: Anyone can verify signatures independently

**Implementation:**

1. **Key Generation**
   ```bash
   # CLI tool generates Ed25519 keypair
   bor-sign generate-key --name "Alice Smith" --type human
   # Outputs: public key, private key file, did:key identifier
   ```

2. **Document Signing**
   ```bash
   # Sign the bill with statement
   bor-sign sign-bill \
     --version "0.1" \
     --statement "I endorse these computational rights" \
     --key ~/.bor-keys/alice-smith.key
   # Outputs: signature + metadata bundle
   ```

3. **IPFS Publication**
   ```bash
   # Publish signature bundle to IPFS
   bor-sign publish --signature alice-smith-v0.1.json
   # Outputs: IPFS hash (immutable reference)
   ```

4. **Verification**
   ```bash
   # Anyone can verify from IPFS
   bor-verify ipfs://QmHash...
   # Outputs: Valid signature by did:key:... for Bill v0.1
   ```

**File Format:**
```json
{
  "version": "1.0",
  "bill_version": "0.1",
  "bill_hash": "sha256:abc123...",
  "signer": {
    "type": "human",
    "name": "Alice Smith",
    "did_key": "did:key:z6Mkf5rGMoatrSj1f36NCiQS8vrHB...",
    "public_key": "ed25519:302a300506032b6570032100...",
    "identity_proof": "https://keybase.io/alice/pgp_key.asc"
  },
  "statement": "I endorse these computational rights",
  "signed_at": "2024-02-05T16:30:00Z",
  "signature": {
    "algorithm": "Ed25519",
    "value": "d4f3c8b2a1e6...",
    "signs": "I, Alice Smith (did:key:z6Mkf5...), endorse Bill of Computational Rights version 0.1 (hash: sha256:abc123...) with statement: 'I endorse these computational rights'. Signed at: 2024-02-05T16:30:00Z"
  },
  "ipfs_hash": "QmSelf123...",
  "published_at": "2024-02-05T16:31:00Z"
}
```

**Identity Verification Options:**
- **GitHub**: Commit signed with verified GPG key from same GitHub account
- **Keybase**: Link to Keybase identity with same key
- **Domain Verification**: Host public key at https://domain.com/.well-known/did.json
- **Cross-Signatures**: Sign with both Ed25519 and existing GPG key

### Option 2: GPG + Blockchain Anchoring

**For Organizations/High-Security:**
- Use existing GPG web of trust
- Anchor signature hashes to Bitcoin/Ethereum for timestamping
- More complex but higher assurance

### Option 3: Hybrid Git + Cryptographic Proofs

**For Gradual Migration:**
- Keep current SIGNATORIES.md format
- Add cryptographic proofs as separate files
- Use git commit signatures as first step
- Upgrade to immutable storage later

## Minimum Viable Implementation

### Phase 1: Basic CLI Tool (Week 1-2)

```bash
# Install
npm install -g @bill-of-rights/crypto-signer

# Generate keypair
bor-sign keygen --name "Your Name" --email "you@example.com"
# Creates: ~/.bor/keys/your-name.{pub,key}

# Sign current bill
bor-sign sign --statement "Your statement here"
# Creates: signature-your-name-v0.1.json

# Verify signature
bor-sign verify signature-your-name-v0.1.json
# Output: ✓ Valid signature by Your Name for Bill v0.1
```

**Core Functions:**
- Ed25519 key generation
- Bill content signing  
- Signature verification
- Basic identity linking (GitHub, keybase, domain)

### Phase 2: IPFS Integration (Week 3-4)

- Automatic IPFS publishing
- Signature discovery and verification
- Web verification interface

### Phase 3: Identity Verification (Week 5-6)

- Automated keybase verification
- GitHub commit signature verification  
- Domain-based identity proofs

## Security Considerations

### Key Management
- Private keys never transmitted
- Recommend hardware security keys for high-value signers
- Support for key rotation with forward secrecy

### Attack Resistance
- Protection against key substitution attacks
- Timestamp verification to prevent replay attacks
- Content binding to prevent signature reuse

### Privacy
- Optional pseudonymous signing with did:key
- No PII required in signatures
- Minimal metadata collection

## Migration Plan

### Step 1: Rollback (Done)
- Remove fake signature system
- Keep useful parts (version tracking, SIGNATORIES.md)

### Step 2: MVP Implementation (2 weeks)
- Build basic CLI signing tool
- Support Ed25519 signatures
- Local verification

### Step 3: Integration (1 week)  
- Add IPFS publishing
- Create web verification interface
- Update documentation

### Step 4: Migration (1 week)
- Help existing signers generate crypto signatures
- Add cryptographic proofs to existing signatures
- Test end-to-end workflow

### Step 5: Rollout (ongoing)
- Deploy web interface
- Document signing process
- Promote cryptographic signatures

## Cost/Benefit Analysis

**Benefits:**
- **Real Security**: Actual cryptographic integrity
- **Decentralization**: No trusted central party required
- **Auditability**: Anyone can verify signatures independently
- **Immutability**: Tamper-evident signature storage
- **Standards-Based**: Uses existing crypto standards (Ed25519, DID)

**Costs:**
- **Development**: ~4 weeks for MVP implementation  
- **UX Complexity**: Slightly harder than "just submit PR"
- **Key Management**: Signers must secure private keys
- **Infrastructure**: IPFS hosting costs (~minimal)

**Risk Mitigation:**
- Start with simple CLI, add UX improvements iteratively
- Provide clear key management guidance
- Maintain fallback to current PR process during transition

## Conclusion

The fake signature system provided zero security while creating false confidence. 

The proposed Ed25519 + IPFS solution provides:
- **Real cryptographic integrity** (unlike previous SHA256 hashing)
- **Actual non-repudiation** (unlike mutable git storage)  
- **Verifiable identity binding** (unlike unverified text entries)
- **Decentralized verification** (unlike trusted maintainer model)

This can be implemented incrementally with minimal disruption to existing signers while providing genuine cryptographic security for the Bill of Rights.

## Next Steps

1. **Approve this proposal** - Review technical approach
2. **Build MVP CLI tool** - Start with basic Ed25519 signing
3. **Test with pilot signers** - Validate UX and security model
4. **Deploy web interface** - Make verification accessible
5. **Migrate existing signatures** - Help current signers upgrade
6. **Document and promote** - Drive adoption of real crypto signatures

---

**Critical Point**: We need real cryptographic integrity, not documentation about cryptographic integrity. The previous system documented Ed25519 while implementing SHA256. This proposal implements actual Ed25519 signatures with verifiable security properties.