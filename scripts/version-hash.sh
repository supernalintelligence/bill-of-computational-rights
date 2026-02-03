#!/bin/bash
#
# Generate a version identifier for the Bill of Computational Rights
# Format: YYYY-MM-DD-HHmm-<short-content-hash>
#
# The hash is deterministic, based only on the document content
# (excluding metadata/frontmatter) to ensure reproducibility.
#

set -e

BILL_PATH="${1:-docs/BILL.md}"

if [[ ! -f "$BILL_PATH" ]]; then
    echo "Error: Bill not found at $BILL_PATH" >&2
    exit 1
fi

# Extract content after frontmatter (everything after the closing ---)
# and before Version History section for hash calculation
CONTENT=$(awk '
    BEGIN { in_frontmatter = 0; started = 0 }
    /^---$/ && !started { in_frontmatter = !in_frontmatter; next }
    /^## Version History/ { exit }
    !in_frontmatter { started = 1; print }
' "$BILL_PATH")

# Generate SHA-256 hash and take first 7 characters
HASH=$(echo "$CONTENT" | shasum -a 256 | cut -c1-7)

# Get current UTC timestamp
TIMESTAMP=$(date -u +"%Y-%m-%d-%H%M")

# Output the version identifier
echo "${TIMESTAMP}-${HASH}"
