import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { calculateWordCount, getSortedPostsData } from '@/lib/blog'
import Layout, { name, siteTitle, desc, baseURL, author, authorurl } from '@/components/layout'
import { buildTime } from '@/components/BuildTime'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

interface Post {
  title: string
  slug: string
}

interface Props {
  posts: Post[]
  totalPages: number
  currentPage: number
  totalWordCount: number
}

export default function BlogPage({ posts, totalPages, currentPage, totalWordCount }: Props) {
  const page = currentPage === 1 ? '首页' : currentPage;
  const namea = siteTitle;
  const nameb = "博客文章列表 | "
  const named = "第 "
  const namec = currentPage === 1 ? '首页 | ' : named.concat(page.toString(), ' 页 | ');
  const title = nameb.concat(namec.toString(), namea);

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "http://schema.org",
        "@type": "Article",
        "name": "${name}",
        "headline": "${title}",
        "author": {
          "@type": "Person",
          "name": "${author}",
          "url": "${authorurl}"
        },
        "datePublished": "${buildTime}",
        "image": "${baseURL}/images/fanma.jpg",
        "articleSection": "${desc}",
        "url": "${baseURL}"
      }
  `,
    };
  }
const pageNumbers = [
  currentPage - 4 >= 1 ? 1 : null,
  currentPage - 3 >= 1 ? currentPage - 3 : null,
  currentPage - 2 >= 1 ? currentPage - 2 : null,
  currentPage - 1 >= 1 ? currentPage - 1 : null,
  currentPage,
  currentPage + 1 <= totalPages ? currentPage + 1 : null,
  currentPage + 2 <= totalPages ? currentPage + 2 : null,
  currentPage + 3 <= totalPages ? currentPage + 3 : null,
  currentPage + 4 <= totalPages ? totalPages : null,
].filter((pageNumber) => pageNumber !== null);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="FanMa,博客,Next.js" />
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={name} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:locale" content="zh-CN" />
        <meta property="og:url" content={`${baseURL}/blog/page-${currentPage}.html`} />
        <meta property="og:image" content={"https://fanmau.github.io/images/fanma.jpg"} />
        {/* <meta property="og:updated_time" content={date} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <section>
        <h1>文章列表页 - 第 {page} 页 （共 { totalPages } 页）</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
              <div></div>
            </li>
          ))}
        </ul>

{pageNumbers
  .filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages)
  .map((pageNumber, i, arr) => {
    const isLastPage = pageNumber === totalPages;
    if (pageNumber === currentPage) {
      return <strong key={i}>{pageNumber === 1 ? '首页' : (pageNumber === totalPages ? `${pageNumber} 最后一页` : pageNumber)}</strong>;
    } else {
      const href = pageNumber === 1 ? '/blog/' : `/blog/page-${pageNumber}.html`;
      if (i > 0 && pageNumber - arr[i - 1] > 1) {
        // 如果前一页与当前页不相连，则插入省略号
        return (
          <React.Fragment key={i}>
            <span>...</span>
            {isLastPage && (
              <Link href={`/blog/page-${totalPages}.html`}>{totalPages}</Link>
            )}
          </React.Fragment>
        );
      } else if (isLastPage && i === arr.length - 1) {
        // 如果是列表最后一项并且最后一页还未添加到页码列表，则添加最后一页链接
        return (
          <Link key={i} href={`/blog/page-${totalPages}.html`}>
            {totalPages}
          </Link>
        );
      } else {
        return (
          <Link key={i} href={href}>
            {pageNumber}
          </Link>
        );
      }
    }
  })
}
        <div>当前页码：{page} ，网站字数：{totalWordCount} 字 </div>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = getSortedPostsData()
  const formattedPosts = allPostsData.map(post => {
      return {
        ...post,
        date: post.date.toString()
      };
    });
  // Assume there are 100 posts in the database
  const totalPosts = formattedPosts.length
  const postsPerPage = 10
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Generate paths for all pages
  const paths = [
    ...Array.from({ length: totalPages }, (_, i) => ({
    params: { page: `page-${i + 1}.html` }
  }))
]

  return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

  const allPostsData = getSortedPostsData()
  const formattedPosts = allPostsData.map(post => {
      return {
        ...post,
        date: post.date.toString()
      };
    });

    const totalWordCount = calculateWordCount();

  // 设置当前页数 currentPage
  let currentPage = 1
  if (params?.page && params.page !== '1') {
    currentPage = parseInt(params.page.toString().replace('page-', ''))
  }

  const totalPosts = formattedPosts.length
  const postsPerPage = 10
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Get posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = formattedPosts.slice(startIndex, endIndex).map(post => ({ title: post.title, slug: post.slug }))

  return { props: { posts, totalPages, currentPage, totalWordCount } }
}
