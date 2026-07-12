#!/usr/bin/env python3
"""
Downloads all Git LFS pointer PNG files from GitHub media CDN.
Run from the Portfolio_nextJs root directory.
"""
import os
import subprocess
import sys
import time

BASE_URL = "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public"

def is_lfs_pointer(path):
    try:
        with open(path, "r", errors="ignore") as f:
            return "git-lfs" in f.readline()
    except:
        return False

def download_file(local_path, remote_url, retries=3):
    for attempt in range(retries):
        result = subprocess.run(
            ["curl", "-L", "-s", "-f", "-o", local_path, remote_url],
            capture_output=True
        )
        if result.returncode == 0 and os.path.getsize(local_path) > 1000:
            return True
        time.sleep(1)
    return False

# Find all LFS pointer PNGs
lfs_files = []
for root, dirs, files in os.walk("public"):
    for f in files:
        if f.endswith(".png"):
            path = os.path.join(root, f)
            if is_lfs_pointer(path):
                lfs_files.append(path)

if not lfs_files:
    print("✅ No LFS pointer PNGs found — all images are real!")
    sys.exit(0)

print(f"📦 Found {len(lfs_files)} LFS pointer PNG files to download...\n")

success = 0
failed = []

for i, local_path in enumerate(lfs_files, 1):
    # Convert local path to remote URL
    # local: public/napa_tusitala/fullpagehome.png
    # remote: BASE_URL/napa_tusitala/fullpagehome.png
    rel = local_path[len("public/"):]  # strip "public/"
    remote_url = f"{BASE_URL}/{rel}"
    
    print(f"[{i:02d}/{len(lfs_files)}] {local_path} ...", end=" ", flush=True)
    
    if download_file(local_path, remote_url):
        size_kb = os.path.getsize(local_path) // 1024
        print(f"✅ {size_kb} KB")
        success += 1
    else:
        print(f"❌ FAILED")
        failed.append(local_path)

print(f"\n{'='*50}")
print(f"✅ Success: {success}/{len(lfs_files)}")
if failed:
    print(f"❌ Failed ({len(failed)}):")
    for f in failed:
        print(f"   {f}")
    sys.exit(1)
else:
    print("🎉 All images downloaded successfully!")
