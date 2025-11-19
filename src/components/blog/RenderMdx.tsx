'use client'

import Link from 'next/link'
import { ComponentPropsWithoutRef, FC } from 'react'
import { Locale } from '@/config/site'
import { buildHrefWithLocale } from '@/lib/localePaths'
import MDXContent from './MdxContent'
import { MdxImage } from './MdxImage'

interface RenderMdxProps {
  code: string
  locale: Locale
}

type LocalizedAnchorProps = ComponentPropsWithoutRef<'a'> & {
  locale: Locale
}

const LocalizedAnchor: FC<LocalizedAnchorProps> = ({ href = '', locale, ...props }) => {
  const isExternal = /^(https?:|mailto:|tel:)/i.test(href)
  const isHashLink = href.startsWith('#')

  if (isExternal || isHashLink) {
    return <a href={href} {...props} />
  }

  const localizedHref = buildHrefWithLocale(locale, href)
  return <Link href={localizedHref} {...props} />
}

const RenderMdx: FC<RenderMdxProps> = ({ code, locale }) => {
  const components = {
    a: (props: ComponentPropsWithoutRef<'a'>) => (
      <LocalizedAnchor locale={locale} {...props} />
    ),
    h1: () => null,
    img: (props: ComponentPropsWithoutRef<'img'>) => <MdxImage {...props} />,
  }

  return (
    <article className="prose prose-lg max-w-none text-slate-800">
      <MDXContent code={code} components={components} />
    </article>
  )
}

export default RenderMdx
