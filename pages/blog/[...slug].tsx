import Layout, { name, siteTitle, desc, baseURL, author, authorurl } from '@/components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Date from '../../components/date'
import { useRouter } from 'next/router'
import slugify from 'slug'

export default function Post({
  postData
}: {
  postData: {
    slug: string
    title: string
    date: string
    birthtime: string
    mtime: string
    wordCount: string
    contentHtml: string
  }
}) {

    const namea = postData.title;
    const nameb = " | "
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
          "datePublished": "${postData.birthtime}",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <article>
        <h1 className='title'>{postData.title}<div className='title-date'><small><Date dateString={postData.date} /> - <span>约 {postData.wordCount} 字</span></small></div></h1>
        {/* <div>{postData.mtime}</div>
        <div>{postData.ctime}</div> */}
        {/* <div>{postData.slug}</div> */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  
  // console.log(`文章路径：${JSON.stringify(paths)}`)
  // console.log(`文章路径：${paths}`)
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const originalSlug = params?.slug?.toString().split(",").join("/")
  const slug = originalSlug.replace(/\.html$/, '')
  // const slug = originalSlug.endsWith(".html") ? originalSlug.replace(/\.html$/, '') : originalSlug
  // 将 .html 扩展名删除
  const postData = await getPostData(slug as string)
  // const postData = await getPostData(params?.slug as string)
  return {
    props: {
      postData
    }
  }
}

// console.log(`文章路径：${JSON.stringify(paths)}`)

export const Comment = (props:any) => {
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const di = slug.join('/')

  return ({
    directory: 'out',
    trailingSlash: false,
    extension: 'html',
    filename: props.params.slug  // 使用 `props.params.slug` 来访问 slug 属性
  })
}
// export const config = {
//   // use .html file extension
//   // set the output directory as out/blog/2023/
//   // to generate file inside blog's subfolder
//   // and remove the default trailing slash
//   // from the generated URL
//   // e.g. /blog/2023/1.html instead of /blog/2023/1.html/
//   output: {
//     filename: `${params.slug}`,
//     directory: 'out',
//     trailingSlash: false,
//     // you can also use `html` instead of `html.html`
//     extension: 'html',
//   },
// }