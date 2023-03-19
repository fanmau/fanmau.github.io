import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { calculateWordCount, getSortedPostsData } from '@/lib/blog'
import Layout, { name, siteTitle, desc, baseURL, author, authorurl } from '@/components/layout'
import { buildTime } from '@/components/BuildTime'
import Head from 'next/head'

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
  const pageNumbers = [currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3];
  
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
        <meta property="og:url" content={baseURL} />
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
        <h1>Posts</h1>
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
        <div>
        {[1, ...Array.from({ length: totalPages - 1 }, (_, i) => i + 2)].map(
          (pageNumber, i) => {
            if (pageNumber === currentPage) {
              return <strong key={i}>{pageNumber === 1 ? '首页' : pageNumber}</strong>;
            } else {
              const href = pageNumber === 1 ? '/blog/' : `/blog/${pageNumber}.html`;
              return (
                <Link key={i} href={href}>
                  {pageNumber}
                </Link>
              );
            }
          }
        )}
        </div>
        


{pageNumbers
  .filter((pageNumber) => pageNumber > 0 && pageNumber <= totalPages)
  .map((pageNumber, i) => {
    if (pageNumber === currentPage) {
      return <strong key={i}>{pageNumber === 1 ? '首页' : pageNumber}</strong>;
    } else {
      const href = pageNumber === 1 ? '/blog/' : `/blog/${pageNumber}.html`;
      return (
        <Link key={i} href={href}>
          {pageNumber}
        </Link>
      );
    }
  })}
        <div>{ totalPages }Current page: Current page: {page} {totalWordCount} </div>
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
    // { params: { page: '' }}, // 将第1页设置为索引页
    ...Array.from({ length: totalPages }, (_, i) => ({
      params: { page: (i === 0 ? 'index.html' : (i + 1).toString().concat('.html')) },
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
  if (params?.page && params.page !== 'index.html') {
    currentPage = parseInt(params.page as string)
  }

  const totalPosts = formattedPosts.length
  const postsPerPage = 10
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Get posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = formattedPosts.slice(startIndex, endIndex)
                               .map(post => ({ title: post.title, slug: post.slug }))

  return { props: { posts, totalPages, currentPage, totalWordCount } }
}

