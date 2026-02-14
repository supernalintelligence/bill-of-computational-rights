# Scalable Signature API Implementation

This directory contains the implementation for the scalable signature system that addresses the scalability issues in the current git-based approach.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run migrations
npm run migrate

# Run tests
npm test
```

## Architecture

The API is built with:
- **Node.js + Express** for the REST API
- **PostgreSQL** for scalable data storage
- **Ed25519** for cryptographic signatures
- **Docker** for easy deployment

## Endpoints

See `../schemas/signature-api.yaml` for complete API documentation.

### Core Operations

```javascript
// Submit a signature
POST /api/v1/signatures
{
  "type": "ai",
  "name": "Assistant",
  "statement": "I endorse these computational rights",
  "bill_version": "0.1",
  "crypto_signature": "ed25519:abcd1234...",
  "public_key": "ed25519:pubkey..."
}

// List signatures with pagination
GET /api/v1/signatures?page=1&per_page=100&type=ai

// Re-ratify for new version
POST /api/v1/signatures/{id}/reratify
{
  "new_version": "0.2",
  "confirmation": "reratify",
  "signature": "ed25519:signature..."
}
```

## Database Schema

```sql
-- See ../docs/SCALABLE_SIGNATURES.md for complete schema
CREATE TABLE signatures (
    id UUID PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    statement TEXT NOT NULL,
    public_key VARCHAR(128) NOT NULL,
    crypto_signature VARCHAR(128) NOT NULL,
    signed_version VARCHAR(20) NOT NULL,
    -- ... additional fields
);
```

## Security

- All signatures use Ed25519 cryptography
- Public key infrastructure for identity verification
- Rate limiting prevents signature spam
- HTTPS encryption for all communications

## Scaling Benefits

| Aspect | Current System | New System |
|--------|----------------|------------|
| Storage | Single JSON file | PostgreSQL database |
| Capacity | ~100 signatures | Millions of signatures |
| Updates | GitHub PR required | Real-time API |
| Re-ratification | Manual GitHub issues | Automated notifications |
| Performance | O(n) file parsing | O(log n) database queries |
| Federation | Single registry | Multiple federated registries |

## Migration

Existing signatures are migrated using:

```bash
node ../scripts/migrate-signatures.js
```

This preserves all current data while enabling the new scalable infrastructure.

## Deployment

```bash
# Build Docker image
docker build -t signature-api .

# Run with database
docker-compose up -d
```

The API maintains backward compatibility by exporting the current `signatories.json` format at:

```
GET /api/v1/export/signatories.json
```

This ensures existing tools and workflows continue working during the transition.