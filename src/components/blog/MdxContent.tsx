'use client'

import * as runtime from 'react/jsx-runtime'
import Image from 'next/image'

type SharedComponents = {
  Image: typeof Image
}

const sharedComponents: SharedComponents = {
  Image,
}

function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXContentProps {
  code: string
  components?: Record<string, any>
}

const MDXContent = ({ code, components, ...props }: MDXContentProps) => {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...(components || {}) }} {...props} />
}

export default MDXContent



