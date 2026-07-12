#!/bin/bash
# Downloads real PNG files from GitHub LFS to replace pointer stubs
# Usage: bash download_lfs.sh

REPO="samir20-23/Portfolio"
LFS_BATCH_URL="https://github.com/${REPO}.git/info/lfs/objects/batch"
PUBLIC_DIR="$(dirname "$0")/public"

echo "🔍 Finding all LFS pointer PNG files in public/..."
PNG_FILES=$(find "$PUBLIC_DIR" -name "*.png" -size -500c)

if [ -z "$PNG_FILES" ]; then
  echo "✅ No LFS pointer files found — all PNGs are already real images."
  exit 0
fi

# Build JSON array of objects for LFS batch API
OBJECTS=""
declare -A OID_TO_PATH

while IFS= read -r filepath; do
  # Check if it's actually an LFS pointer
  first_line=$(head -1 "$filepath" 2>/dev/null)
  if [[ "$first_line" != "version https://git-lfs.github.com/spec/v1" ]]; then
    continue
  fi

  oid=$(grep "^oid sha256:" "$filepath" | cut -d: -f3)
  size=$(grep "^size " "$filepath" | cut -d' ' -f2)

  if [ -n "$oid" ] && [ -n "$size" ]; then
    OID_TO_PATH["$oid"]="$filepath"
    if [ -n "$OBJECTS" ]; then
      OBJECTS="${OBJECTS},"
    fi
    OBJECTS="${OBJECTS}{\"oid\":\"${oid}\",\"size\":${size}}"
  fi
done <<< "$PNG_FILES"

if [ -z "$OBJECTS" ]; then
  echo "✅ All PNGs are real images already."
  exit 0
fi

TOTAL=${#OID_TO_PATH[@]}
echo "📦 Found $TOTAL LFS pointer PNG(s). Requesting download URLs from GitHub LFS..."

# Call LFS batch API
BATCH_BODY="{\"operation\":\"download\",\"transfers\":[\"basic\"],\"objects\":[${OBJECTS}]}"

RESPONSE=$(curl -s -X POST "$LFS_BATCH_URL" \
  -H "Accept: application/vnd.git-lfs+json" \
  -H "Content-Type: application/vnd.git-lfs+json" \
  -d "$BATCH_BODY")

if [ -z "$RESPONSE" ]; then
  echo "❌ GitHub LFS API returned empty response. Check your network."
  exit 1
fi

echo "📥 Downloading files..."
COUNT=0
FAILED=0

# Parse each object from response using python (more reliable than bash JSON parsing)
python3 - <<PYEOF
import json, subprocess, os, sys

response = '''$RESPONSE'''
oid_to_path = {}
$(for oid in "${!OID_TO_PATH[@]}"; do echo "oid_to_path['$oid'] = '${OID_TO_PATH[$oid]}'"; done)

try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    print(f"❌ Failed to parse LFS batch response: {e}")
    print(f"Response was: {response[:500]}")
    sys.exit(1)

objects = data.get('objects', [])
total = len(objects)
success = 0
failed = 0

for obj in objects:
    oid = obj.get('oid', '')
    filepath = oid_to_path.get(oid)
    
    if not filepath:
        continue
    
    if 'error' in obj:
        print(f"  ❌ {os.path.basename(filepath)}: {obj['error'].get('message', 'unknown error')}")
        failed += 1
        continue
    
    download_url = obj.get('actions', {}).get('download', {}).get('href')
    if not download_url:
        print(f"  ❌ {os.path.basename(filepath)}: No download URL")
        failed += 1
        continue
    
    print(f"  ⬇️  Downloading {os.path.relpath(filepath)} ...", end=' ', flush=True)
    
    result = subprocess.run(
        ['curl', '-L', '-s', '-o', filepath, download_url],
        capture_output=True
    )
    
    if result.returncode == 0:
        size = os.path.getsize(filepath)
        print(f"✅ ({size // 1024} KB)")
        success += 1
    else:
        print(f"❌ curl failed: {result.stderr.decode()}")
        failed += 1

print(f"\n📊 Done: {success} downloaded, {failed} failed out of {total} files.")
if failed > 0:
    sys.exit(1)
PYEOF
