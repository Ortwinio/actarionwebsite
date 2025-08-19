import { Metadata } from 'next'
import { getDictionary } from '@/lib/getDictionary'
import BlogListClient from './BlogListClient'

interface BlogListPageProps {
  params: Promise<{ locale: 'en' | 'de' | 'nl' }>
}

export async function generateMetadata({ params }: BlogListPageProps): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const blogDescription = dictionary.pages?.blog?.description || 'Insights and updates from ActARion'
  const siteTitle = dictionary.metadata?.title || 'ActARion'

  return {
    title: `Blog - ${siteTitle}`,
    description: blogDescription,
    openGraph: {
      title: `Blog - ${siteTitle}`,
      description: blogDescription,
      type: 'website',
      locale: locale,
      alternateLocale: ['en', 'de', 'nl'].filter(l => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Blog - ${siteTitle}`,
      description: blogDescription,
    },
  }
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  // Fallback values in case the blog section is not found
  const blogTitle = dictionary.pages?.blog?.title || 'Blog'
  const blogDescription = dictionary.pages?.blog?.description || 'Insights and updates from ActARion'

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blogTitle}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {blogDescription}
            </p>
          </div>
          
          <BlogListClient locale={locale} />
        </div>
      </div>
    </div>
  )
}



