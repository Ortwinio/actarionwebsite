#!/bin/bash
# List all English blog posts that need translation
find content/blogs -name "*.mdx" -type f | \
  grep -vE "(nl|de)\.mdx$" | \
  grep -v "index.mdx" | \
  sort
