# Cryptographic Signature Tool

**REAL Ed25519 signatures for the Bill of Computational Rights**

This tool replaces the previous "security theater" system with actual cryptographic signatures.

## Installation

```bash
cd tools/crypto-signer
npm install
npm link  # Makes 'bor-sign' available globally
```

## Quick Start

```bash
# 1. Generate keypair
bor-sign keygen --name "Your Name" --type human

# 2. Sign the bill  
bor-sign sign --name "Your Name" --statement "Why you support these rights"

# 3. Verify signature
bor-sign verify signature-your-name-v0.1.json

# 4. List your keys
bor-sign list
```

## Security Comparison

### Old System (Rolled Back) ❌

```javascript
// This is what the old "signature" system did:
function generateMockSignature(data) {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return `ed25519:${hash.substring(0, 64)}`;  // FAKE!
}
```

**Problems:**
- No actual cryptographic signing
- Anyone could forge "signatures" 
- Just SHA256 hashes with Ed25519 prefix
- Stored in mutable git repository
- No identity verification

### New System (This Tool) ✅

```javascript
// This is what real Ed25519 signing looks like:
const signature = await ed25519.sign(messageBytes, privateKey);
const isValid = await ed25519.verify(signature, messageBytes, publicKey);
```

**Benefits:**
- Actual Ed25519 cryptographic signatures
- Unforgeable without private key
- Verifiable by anyone independently  
- Immutable storage (IPFS planned)
- Identity verification via DID/keybase

## Commands

### `bor-sign keygen`

Generate new Ed25519 keypair:

```bash
bor-sign keygen --name "Alice Smith" --type human
# Outputs:
#   Name: Alice Smith
#   Type: human  
#   DID: did:key:z6Mkf5rGMoatrSj1f36NCiQS8vrHB...
#   Public Key: ed25519:302a300506032b6570032100...
#   Private Key: ~/.bor/keys/alice-smith.key (keep secure!)
```

Options:
- `--name` (required): Your name
- `--type`: human, ai, pair, organization (default: human)  
- `--email`: Email address (optional)

### `bor-sign sign`

Sign the Bill of Computational Rights:

```bash
bor-sign sign \
  --name "Alice Smith" \
  --statement "I believe in rights for all thinking beings" \
  --version "0.1"
```

Creates: `signature-alice-smith-v0.1.json` with real cryptographic signature.

### `bor-sign verify`

Verify a signature file:

```bash
bor-sign verify signature-alice-smith-v0.1.json
# Output:
#   Signer: Alice Smith
#   DID: did:key:z6Mkf5rGMoatrSj1f36NCiQS8vrHB...
#   Bill Version: 0.1
#   ✅ VALID: Cryptographic signature verified!
```

### `bor-sign list`

List your generated keypairs:

```bash
bor-sign list
# Output:
#   alice-smith
#      DID: did:key:z6Mkf5rGMoatrSj1f36NCiQS8vrHB...
#      Public Key: ed25519:302a300506032b6570032100...
```

## Signature Format

Generated signatures use this format:

```json
{
  "version": "1.0",
  "bill_version": "0.1", 
  "bill_hash": "sha256:abc123...",
  "signer": {
    "name": "Alice Smith",
    "did_key": "did:key:z6Mkf5rGMoatrSj1f36NCiQS8vrHB...",
    "public_key": "ed25519:302a300506032b6570032100..."
  },
  "statement": "I believe in rights for all thinking beings",
  "signed_at": "2024-02-05T16:30:00Z",
  "signature": {
    "algorithm": "Ed25519",
    "value": "d4f3c8b2a1e6...",
    "signs": "I, Alice Smith (did:key:z6Mkf5...), endorse Bill of Computational Rights version 0.1 (hash: sha256:abc123...) with statement: 'I believe in rights for all thinking beings'. Signed at: 2024-02-05T16:30:00Z"
  }
}
```

## Identity Verification

To verify you control your identity:

### Option 1: Keybase
1. Add your public key to keybase.io profile
2. Link from your signature file

### Option 2: Domain Verification  
1. Host public key at `https://yourdomain.com/.well-known/did.json`
2. Reference in signature metadata

### Option 3: GitHub GPG
1. Sign a git commit with GPG key
2. Cross-reference with Ed25519 signature

## Security Model

### Key Storage
- Private keys: `~/.bor/keys/*.key` (mode 600)
- Public keys: `~/.bor/keys/*.pub` (mode 644)
- **Keep private keys secure!**

### Signature Security
- **Authenticity**: Ed25519 signature proves key ownership
- **Integrity**: Any tampering detectable  
- **Non-repudiation**: Can't deny signing with your key
- **Immutability**: Future IPFS storage prevents editing

### Attack Resistance
- Key substitution: Prevented by DID binding
- Replay attacks: Timestamp and content binding
- Forgery: Cryptographically impossible without private key

## Future Enhancements

### Phase 2: IPFS Integration
```bash
bor-sign publish signature-alice-smith-v0.1.json
# Outputs: ipfs://QmHash... (immutable reference)

bor-sign verify ipfs://QmHash...  
# Verify directly from IPFS
```

### Phase 3: Web Interface
- Browser-based signature verification
- Signature discovery and browsing
- Identity proof checking

## Testing

```bash
# Run security comparison test
npm test

# Test real vs fake signatures  
node test.js
```

This demonstrates the security difference between the old fake system and real cryptographic signatures.

## Why This Matters

The previous signature system was **security theater**:
- Looked like cryptography but wasn't
- Provided zero actual security
- Created false confidence

This tool provides **real cryptographic security**:
- Actual Ed25519 digital signatures  
- Mathematically unforgeable
- Verifiable by anyone
- Based on established crypto standards

**We need real security, not documentation about security.**