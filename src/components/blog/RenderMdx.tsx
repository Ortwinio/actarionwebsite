'use client'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { FC } from 'react'

interface RenderMdxProps {
  content: string
}

const RenderMdx: FC<RenderMdxProps> = ({ content }) => {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <MDXRemote source={content} />
    </article>
  )
}

export default RenderMdx
