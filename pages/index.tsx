import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/blog'
import { GetStaticProps } from 'next'
import { Sonsie_One } from 'next/font/google'
import styles from '../styles/Home.module.css'
import Layout, { name, siteTitle, desc } from '../components/layout'
import Date from '../components/date'



const sonsie = Sonsie_One({
  subsets: ['latin'],
  weight: '400'
});

export default function Home({
    allPostsData
  }: {
    allPostsData: {
      date: string
      title: string
      slug: string
    }[]
  }) {
  // const title = [ siteTitle, name ];
  const namea = siteTitle;
  const nameb = " - "
  const namec = name;
  const title = namea.concat(nameb,namec);
  

  return (
    <Layout home>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="FanMa,博客,Next.js" />
        <meta name="description" content={desc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={name} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:locale" content="zh-CN" />
        <meta property="og:url" content="https://fanmav.github.io/" />
        <meta property="og:image" content="https://fanmav.github.io/images/Avatar.jpg" />
        {/* <meta property="og:updated_time" content={date} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className={styles.main}>
            <div className={styles.title}>
                <h2 className={sonsie.className}>
                This is a blog of FanMa <span>-&gt;</span>
                </h2>
            </div>
            <ul className={styles.list}>
            {allPostsData.map(({ slug, date, title }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>{title}</Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        {/* <div className={styles.info}>
          <span>作者：</span>
          <span>文章： 篇</span>
          <span>共计：字</span>
          <span>网站创建：</span>
          <span>最新更新：</span>
        </div> */}
      </section>
    </Layout>
  )
}



export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    const formattedPosts = allPostsData.map(post => {
        return {
          ...post,
          date: post.date.toString()
        }
      })
    return {
      props: {
        allPostsData: formattedPosts
      }
    }
}