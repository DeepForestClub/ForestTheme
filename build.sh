#!/bin/bash
set -eu

# For use in the GitHub workflow process.
# Run in the root of the repository to produce a dist/ directory.

# Create directory structure
mkdir -p dist

# Copy images, html and others
cp -a tlbdata others pages images dist

# Move Html files
mv dist/pages/* dist/
rm -r dist/pages

# Copy and minify CSS
mkdir -p dist/css
cp Forest.css ForestDark.css dist/css
npm run minify
[[ -f dist/css/Forest.min.css ]]
[[ -f dist/css/ForestDark.min.css ]]