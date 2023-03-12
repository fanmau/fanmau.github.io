import Layout, { name, siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Date from '../../components/date'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {

    const namea = postData.title;
    const nameb = " - "
    const namec = name;
    const title = namea.concat(nameb,namec);

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
        <meta property="og:url" content="https://fanmav.github.io/" />
        <meta property="og:image" content="https://fanmav.github.io/images/Avatar.jpg" />
        {/* <meta property="og:updated_time" content={date} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <article>
        <h1 className='title'>{postData.title}<div className='title-date'><small><Date dateString={postData.date} /></small></div></h1>
        
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
