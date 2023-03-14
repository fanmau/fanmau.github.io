import Layout, { name, siteTitle, desc, baseURL, author, authorurl } from '@/components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Date from '../../components/date'
import { useRouter } from 'next/router'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    ctime: string
    mtime: string
    wordCount: string
    contentHtml: string
  }
}) {

    const namea = postData.title;
    const nameb = " - "
    const namec = name;
    const title = namea.concat(nameb,namec);
    const router = useRouter();

    function addProductJsonLd() {
      return {
        __html: `{
          "@context": "http://schema.org",
          "@type": "Article",
          "name": "${name}",
          "headline": "${postData.title}",
          "author": {
            "@type": "Person",
            "name": "${author}",
            "url": "${authorurl}"
          },
          "datePublished": "${postData.date}",
          "image": "",
          "articleSection": "",
          "url": "https://fanmav.github.io${router.asPath}"
        }
    `,
      };
    }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="FanMa,博客,Next.js" />
        {/* <meta name="description" content={desc} /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={name} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:locale" content="zh-CN" />
        <meta property="og:url" content={baseURL} />
        <meta property="og:image" content="https://fanmav.github.io/images/fanma.jpg" />
        {/* <meta property="og:updated_time" content={date} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <article>
        <h1 className='title'>{postData.title}<div className='title-date'><small><Date dateString={postData.date} /> - </small></div></h1>
        <div>{postData.mtime}</div>
        <div>{postData.ctime}</div>
        <div>文章字数为：{postData.wordCount}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string)
  return {
    props: {
      postData
    }
  }
}

export const Comment = () => {
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const di = slug.join('/')

  return ({
    dir: {di},
  })
}