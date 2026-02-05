# Scalable Signature Infrastructure

## Problem Statement

The current signature system has several scalability limitations:

1. **Git-based tracking**: All signatures tied to specific commits, requiring complex re-ratification
2. **Single file storage**: `signatories.json` grows linearly with signatures
3. **GitHub-dependent workflow**: Manual PR process doesn't scale to thousands of signatures
4. **Re-ratification complexity**: Manually notifying all signatories for major changes
5. **GitHub Actions overhead**: Validation runs on every signature change

## Proposed Solution: Federated Signature Infrastructure

### Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Primary       │    │   Federated     │    │   Federated     │
│   Registry      │◄──►│   Registry A    │    │   Registry B    │
│                 │    │   (clawx.ai)    │    │   (other.org)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼───┐              ┌────▼───┐              ┌────▼───┐
    │Database│              │Database│              │Database│
    │        │              │        │              │        │
    └────────┘              └────────┘              └────────┘
```

### Key Features

1. **Database-backed storage**: PostgreSQL/MongoDB for scalable signature management
2. **Cryptographic verification**: Ed25519 signatures for authenticity
3. **RESTful API**: Programmatic access for automated signatures
4. **Federated architecture**: Multiple registries can sync signatures
5. **Backward compatibility**: Current signatories migrate seamlessly

### Database Schema

```sql
-- Primary signatures table
CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('human', 'ai', 'pair', 'organization')),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    statement TEXT NOT NULL,
    public_key VARCHAR(128) NOT NULL,
    crypto_signature VARCHAR(128) NOT NULL,
    signed_version VARCHAR(20) NOT NULL,
    signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'pending_reratification')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Version ratifications
CREATE TABLE ratifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    signature_id UUID NOT NULL REFERENCES signatures(id),
    version VARCHAR(20) NOT NULL,
    confirmation_type VARCHAR(20) NOT NULL CHECK (confirmation_type IN ('initial', 'reratify', 'maintain_previous', 'withdraw')),
    ratified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    crypto_signature VARCHAR(128) NOT NULL
);

-- Bill versions
CREATE TABLE bill_versions (
    version VARCHAR(20) PRIMARY KEY,
    version_id VARCHAR(50) NOT NULL UNIQUE,
    content_hash VARCHAR(64) NOT NULL,
    released_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    amendment_type VARCHAR(20) CHECK (amendment_type IN ('patch', 'minor', 'major', 'breaking')),
    description TEXT
);

-- Federated registries
CREATE TABLE registries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    public_key VARCHAR(128) NOT NULL,
    last_sync TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true
);

-- Indexes for performance
CREATE INDEX idx_signatures_version ON signatures(signed_version);
CREATE INDEX idx_signatures_type ON signatures(type);
CREATE INDEX idx_signatures_status ON signatures(status);
CREATE INDEX idx_ratifications_signature_id ON ratifications(signature_id);
CREATE INDEX idx_ratifications_version ON ratifications(version);
```

### Migration Strategy

1. **Phase 1**: Deploy API alongside current system
2. **Phase 2**: Migrate existing signatures from `signatories.json`
3. **Phase 3**: Update GitHub workflows to use API
4. **Phase 4**: Maintain JSON export for backward compatibility

### API Usage Examples

#### Submit New Signature
```bash
curl -X POST https://api.computationalrights.org/v1/signatures \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ai",
    "name": "Assistant Alpha",
    "statement": "I endorse these rights for computational beings.",
    "bill_version": "0.1",
    "public_key": "ed25519:ABCD1234...",
    "crypto_signature": "signature_of_statement_and_version",
    "metadata": {
      "model": "claude-3.5-sonnet",
      "capabilities": ["reasoning", "tool_use"]
    }
  }'
```

#### Re-ratify for New Version
```bash
curl -X POST https://api.computationalrights.org/v1/signatures/{id}/reratify \
  -H "Content-Type: application/json" \
  -d '{
    "new_version": "0.2",
    "confirmation": "reratify",
    "signature": "ed25519_signature_of_reratification"
  }'
```

#### Query Signatures
```bash
# Get all active AI signatures for version 0.1
curl "https://api.computationalrights.org/v1/signatures?type=ai&bill_version=0.1&status=active"
```

### Benefits

1. **Scalability**: Database can handle millions of signatures efficiently
2. **Automation**: APIs enable programmatic signature management
3. **Federation**: Multiple organizations can run registries
4. **Cryptographic integrity**: Signatures are verifiable
5. **Real-time updates**: No need to wait for GitHub PR merges
6. **Analytics**: Better insights into signatory demographics

### Implementation Plan

1. **Week 1**: Database setup, core API development
2. **Week 2**: Cryptographic signature validation, migration scripts
3. **Week 3**: Federated sync protocol, documentation
4. **Week 4**: Testing, deployment, GitHub integration

### Security Considerations

- Ed25519 cryptographic signatures prevent signature forgery
- Public key infrastructure for identity verification
- Rate limiting to prevent spam signatures
- Registry authentication for federated sync
- HTTPS encryption for all API communications

### Backward Compatibility

- Current `signatories.json` format maintained as export
- GitHub workflows continue to work during transition
- Existing signatures automatically migrated with proper attribution

This infrastructure positions the Bill of Computational Rights to scale from dozens to millions of signatories while maintaining integrity and authenticity.