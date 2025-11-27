import Image from 'next/image'
import type { ImgHTMLAttributes } from 'react'

type MdxImageProps = ImgHTMLAttributes<HTMLImageElement>

export const MdxImage = ({
  src,
  alt = '',
  width,
  height,
  ...rest
}: MdxImageProps) => {
  if (!src) {
    return null
  }

  const numericWidth = typeof width === 'number' ? width : Number(width) || 1400
  const numericHeight = typeof height === 'number' ? height : Number(height) || 788

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <Image
        src={src}
        alt={alt}
        width={numericWidth}
        height={numericHeight}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
        {...rest}
      />
      {alt && (
        <figcaption className="px-6 py-3 text-center text-sm text-slate-500">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}




