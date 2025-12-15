# Blog Post Translation Guide

This guide helps translate blog posts from English to Dutch (NL) and German (DE).

## Translation Pattern

For each English blog post (`filename.mdx`), create two translations:
- `filename-nl.mdx` (Dutch)
- `filename-de.mdx` (German)

## Frontmatter Changes

1. **title**: Translate to target language
2. **description**: Translate to target language  
3. **slug**: Keep the same (routing uses locale prefix)
4. **locale**: Set to `"nl"` or `"de"`
5. **tags**: Translate human-readable tags, keep technical tags as-is
6. **image**: Keep the same
7. **publishedAt/updatedAt**: Keep the same
8. **author**: Keep the same

## Content Translation Guidelines

1. **Preserve structure**: Keep all headings, lists, and formatting
2. **Translate links**: Update internal links to use correct locale prefix (`/nl/` or `/de/`)
3. **Keep URLs**: External links stay the same
4. **Product names**: Keep "ActARion" and "Deep Sight" as-is
5. **Technical terms**: Translate where appropriate, but keep industry-standard terms
6. **Tone**: Maintain professional, technical tone matching the original

## Example

English: `/en/blog/ar-onboarding-manufacturing`
Dutch: `/nl/blog/ar-onboarding-manufacturing`  
German: `/de/blog/ar-onboarding-manufacturing`

All use the same slug but different locale in frontmatter.

## Checklist

- [ ] Frontmatter translated correctly
- [ ] All headings translated
- [ ] Body content translated
- [ ] Internal links updated with locale prefix
- [ ] External links preserved
- [ ] Tags translated appropriately
- [ ] Code blocks and technical content preserved
- [ ] Image references unchanged









