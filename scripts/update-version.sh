#!/bin/bash
#
# Update the Bill's frontmatter with a new version identifier
# Usage: ./scripts/update-version.sh [major|minor|patch]
#

set -e

BILL_PATH="docs/BILL.md"
SCRIPT_DIR="$(dirname "$0")"

# Generate new version ID
VERSION_ID=$("$SCRIPT_DIR/version-hash.sh" "$BILL_PATH")

echo "Generated version ID: $VERSION_ID"

# Check if frontmatter already exists
if grep -q "^---$" "$BILL_PATH"; then
    # Update existing version_id in frontmatter
    if grep -q "^version_id:" "$BILL_PATH"; then
        sed -i '' "s/^version_id:.*/version_id: $VERSION_ID/" "$BILL_PATH"
    else
        # Add version_id after first ---
        sed -i '' "0,/^---$/s/^---$/---\nversion_id: $VERSION_ID/" "$BILL_PATH"
    fi
else
    # Add frontmatter at the beginning
    TEMP_FILE=$(mktemp)
    {
        echo "---"
        echo "version_id: $VERSION_ID"
        echo "---"
        echo ""
        cat "$BILL_PATH"
    } > "$TEMP_FILE"
    mv "$TEMP_FILE" "$BILL_PATH"
fi

echo "Updated $BILL_PATH with version_id: $VERSION_ID"
