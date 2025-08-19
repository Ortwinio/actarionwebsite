# Blog Posting Instructions for ActARion Website

## Overview
The ActARion website uses a blog system built with **Velite CMS** and **MDX** (Markdown with JSX). Blog posts are stored in the `content/blogs/` directory and automatically processed during the build.

## Prerequisites
- Access to the ActARion website codebase
- Basic knowledge of Markdown syntax
- Text editor (VS Code recommended)

## Step-by-Step Instructions

### 1. Create a New Blog Post Directory

Navigate to the `content/blogs/` directory and create a new folder for your blog post:

```bash
cd content/blogs/
mkdir your-blog-post-slug
```

**Naming Convention:**
- Use lowercase letters, numbers, and hyphens only
- Make it descriptive and SEO-friendly
- Example: `ar-sops-next-frontier`, `safety-compliance-ar`

### 2. Create the Blog Post File

Inside your new directory, create an `index.mdx` file:

```bash
cd your-blog-post-slug
touch index.mdx
```

### 3. Add Frontmatter Metadata

At the top of your `index.mdx` file, add the required frontmatter:

```yaml
---
title: "Your Blog Post Title"
description: "A compelling description of your blog post (150-200 characters recommended)"
image: "/path/to/your/image.jpg"  # Optional: Add to public/ directory
publishedAt: "2024-01-15"
updatedAt: "2024-01-15"
author: "Your Name"
tags: ["AR", "SOPs", "Manufacturing"]  # Add relevant tags
isPublished: true
slug: "your-blog-post-slug"
locale: "en"  # Options: "en", "de", "nl"
---
```

**Frontmatter Fields Explained:**
- `title`: The main title of your blog post
- `description`: Brief summary for SEO and preview cards
- `image`: Featured image path (optional)
- `publishedAt`: Publication date (YYYY-MM-DD format)
- `updatedAt`: Last update date (YYYY-MM-DD format)
- `author`: Author name
- `tags`: Array of relevant tags for categorization
- `isPublished`: Set to `false` to save as draft
- `slug`: URL-friendly version of the title (same as folder name)
- `locale`: Language of the post

### 4. Write Your Blog Content

After the frontmatter, write your blog content using Markdown syntax:

```markdown
# Your Blog Post Title

## Introduction

Start with an engaging introduction that hooks the reader...

## Main Content

### Section 1: Key Points

- Point 1
- Point 2
- Point 3

### Section 2: Detailed Explanation

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

## Conclusion

Wrap up your blog post with a compelling conclusion...

## Call to Action

Ready to transform your operations? [Contact us](/contact) to learn more about our AR solutions.
```

### 5. Add Images (Optional)

If you want to include images:

1. Place image files in the `public/` directory
2. Reference them in your MDX file:

```markdown
![Alt text](/path/to/image.jpg)
```

### 6. Preview Your Blog Post

To see your blog post locally:

```bash
# Start the development server
npm run dev

# Visit the blog page
http://localhost:3000/en/blog

# Or directly access your post
http://localhost:3000/en/blog/your-blog-post-slug
```

### 7. Publish Your Blog Post

When ready to publish:

1. Set `isPublished: true` in the frontmatter
2. Commit your changes:

```bash
git add content/blogs/your-blog-post-slug/
git commit -m "Add new blog post: Your Blog Post Title"
git push origin main
```

3. Deploy to production (if using Vercel, this happens automatically)

## Blog Post Best Practices

### Content Guidelines
- **Length**: Aim for 800-2000 words for comprehensive posts
- **Structure**: Use clear headings and subheadings
- **Readability**: Break up text with bullet points and short paragraphs
- **SEO**: Include relevant keywords naturally in your content

### Image Guidelines
- **Format**: Use JPG, PNG, or WebP formats
- **Size**: Optimize images for web (max 1200px width)
- **Alt Text**: Always include descriptive alt text for accessibility

### Tagging Strategy
Use consistent tags across posts:
- Technology: `AR`, `VR`, `XR`, `AI`, `IoT`
- Industries: `Manufacturing`, `Healthcare`, `Aerospace`, `Energy`
- Topics: `SOPs`, `Training`, `Safety`, `Compliance`, `Productivity`

## Example Blog Post Structure

```
content/blogs/
└── ar-training-revolution/
    └── index.mdx
```

**Example `index.mdx` content:**

```yaml
---
title: "The AR Training Revolution: Transforming How We Learn"
description: "Discover how Augmented Reality is revolutionizing training programs across industries, from manufacturing to healthcare."
image: "/ar-training-demo.jpg"
publishedAt: "2024-01-15"
updatedAt: "2024-01-15"
author: "Mark Dercksen"
tags: ["AR", "Training", "Manufacturing", "Healthcare"]
isPublished: true
slug: "ar-training-revolution"
locale: "en"
---

# The AR Training Revolution: Transforming How We Learn

## Introduction

Augmented Reality is not just changing how we work—it's revolutionizing how we learn...

## The Current State of Training

Traditional training methods have several limitations...

## How AR Transforms Learning

### 1. Immersive Learning Experiences

AR creates immersive environments where learners can...

### 2. Real-time Feedback

Unlike traditional training, AR provides immediate feedback...

### 3. Cost-effective Scalability

AR training solutions can be deployed across multiple locations...

## Real-world Applications

### Manufacturing Sector

In manufacturing, AR training has shown remarkable results...

### Healthcare Industry

Medical professionals are using AR for surgical training...

## Conclusion

The future of training is here, and it's powered by Augmented Reality...

## Get Started with AR Training

Ready to revolutionize your training programs? [Contact us](/contact) to learn how ActARion can help you implement AR training solutions.
```

## Troubleshooting

### Common Issues

1. **Blog post not appearing**: Check that `isPublished: true`
2. **Images not loading**: Verify the path starts with `/` and image exists in `public/`
3. **Build errors**: Check for syntax errors in frontmatter (YAML format)
4. **404 errors**: Ensure the slug matches the folder name exactly

### Getting Help

If you encounter issues:
1. Check the terminal output for error messages
2. Verify your frontmatter syntax
3. Test locally before pushing to production
4. Contact the development team for technical support

## Multi-language Blog Posts

To create blog posts in multiple languages:

1. Create separate folders for each language:
   ```
   content/blogs/
   ├── ar-training-revolution/
   │   └── index.mdx (English)
   ├── ar-training-revolution-de/
   │   └── index.mdx (German)
   └── ar-training-revolution-nl/
       └── index.mdx (Dutch)
   ```

2. Set the appropriate `locale` in each post's frontmatter
3. Translate the content while maintaining the same structure

## SEO Optimization

To maximize your blog post's visibility:

1. **Title**: Include primary keywords naturally
2. **Description**: Write compelling meta descriptions
3. **Headings**: Use H1, H2, H3 tags with relevant keywords
4. **Internal Links**: Link to other relevant pages on the website
5. **Tags**: Use consistent, relevant tags for categorization

---

**Last Updated**: January 2024
**Maintained by**: ActARion Development Team
