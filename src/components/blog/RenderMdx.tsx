'use client'

import { FC } from 'react'
import MDXContent from './MdxContent'

interface RenderMdxProps {
  code: string
}

const RenderMdx: FC<RenderMdxProps> = ({ code }) => {
  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <MDXContent code={code} />
    </article>
  )
}

export default RenderMdx
