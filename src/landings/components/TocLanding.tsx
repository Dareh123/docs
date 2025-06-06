import { useRouter } from 'next/router'
import cx from 'classnames'

import { useTocLandingContext } from '@/frame/components/context/TocLandingContext'
import { useTranslation } from '@/languages/components/useTranslation'
import { DefaultLayout } from '@/frame/components/DefaultLayout'
import { TableOfContents } from '@/landings/components/TableOfContents'
import { ArticleTitle } from '@/frame/components/article/ArticleTitle'
import { MarkdownContent } from '@/frame/components/ui/MarkdownContent'
import { ArticleList } from '@/landings/components/ArticleList'
import { ArticleGridLayout } from '@/frame/components/article/ArticleGridLayout'
import { PermissionsStatement } from '@/frame/components/ui/PermissionsStatement'
import { Lead } from '@/frame/components/ui/Lead'
import { LearningTrackNav } from '@/learning-track/components/article/LearningTrackNav'
import { ClientSideRedirects } from '@/rest/components/ClientSideRedirects'
import { RestRedirect } from '@/rest/components/RestRedirect'
import { Breadcrumbs } from '@/frame/components/page-header/Breadcrumbs'

export const TocLanding = () => {
  const router = useRouter()
  const {
    title,
    intro,
    tocItems,
    productCallout,
    variant,
    featuredLinks,
    renderedPage,
    currentLearningTrack,
    permissions,
  } = useTocLandingContext()
  const { t } = useTranslation('toc')

  return (
    <DefaultLayout>
      {router.route === '/[versionId]/rest/[category]' && <RestRedirect />}
      {/* Doesn't matter *where* this is included because it will
      never render anything. It always just return null. */}
      <ClientSideRedirects />

      <div className="container-xl px-3 px-md-6 my-4">
        <div className={cx('d-none d-xl-block mt-3 mr-auto width-full')}>
          <Breadcrumbs />
        </div>
        <ArticleGridLayout>
          <ArticleTitle>{title}</ArticleTitle>

          {intro && <Lead data-search="lead">{intro}</Lead>}

          <PermissionsStatement product={productCallout} permissions={permissions} />

          <div className="border-bottom border-xl-0 pb-4 mb-5 pb-xl-2 mb-xl-2" />

          <div className={variant === 'expanded' ? 'mt-5' : 'mt-2'}>
            {featuredLinks.gettingStarted && featuredLinks.popular && (
              <div className="pb-8 container-xl">
                <div className="gutter gutter-xl-spacious clearfix">
                  <div className="col-12 col-lg-6 mb-md-4 mb-lg-0 float-left">
                    <ArticleList
                      title={t('getting_started')}
                      articles={featuredLinks.gettingStarted}
                    />
                  </div>

                  <div className="col-12 col-lg-6 float-left">
                    <ArticleList title={t('popular')} articles={featuredLinks.popular} />
                  </div>
                </div>
              </div>
            )}

            {renderedPage && (
              <div id="article-contents" className="mb-5">
                <MarkdownContent>{renderedPage}</MarkdownContent>
              </div>
            )}

            <TableOfContents items={tocItems} variant={variant} />
          </div>
        </ArticleGridLayout>

        {currentLearningTrack?.trackName ? (
          <div className="mt-4">
            <LearningTrackNav track={currentLearningTrack} />
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  )
}
