#!/bin/bash

# Enable strict mode
set -euxo pipefail

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp could not be found. Please install it first."
    exit 1
fi

# Loop through all .jpg files in the current directory
for file in *.png; do
    # Skip if no .jpg files found
    [ -e "$file" ] || { echo "No .jpg files found."; exit 0; }

    # Get the filename without the extension
    filename="${file%.*}"

    # Convert the .jpg file to .webp
    cwebp -q 80 "$file" -o "$filename.webp"

    # Remove the original .jpg file after successful conversion
    rm "$file"

    echo "Converted $file to $filename.webp and removed the original .jpg file."
done
