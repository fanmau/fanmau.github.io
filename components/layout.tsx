import Head from 'next/head'
import Link from 'next/link'
import NavBar from './NavBar';
import React, { useEffect } from 'react'
import prism from 'prismjs'


export const name = 'FanMa';
export const author = '黄胜丰';
export const authorurl = 'https://fanmav.github.io';
export const enname = '使用 Next.js 的博客框架程序';
export const siteTitle = 'FanMa 博客';
export const desc = 'FanMa 博客 包含了关于前端学习的一系列内容，涵盖了 HTML、CSS、JavaScript、TypeScript、React、Next.js 等全栈方面的学习笔记。博客以技术为核心，深入浅出地讲解了这些技术的基础概念、实际应用以及最佳实践，并且结合了博主的个人经验和实践经历进行分享，有助于读者更好地理解和掌握这些技术。如果你有前端学习的需求或者对这些技术感兴趣，那么 FanMa 博客 将是帮助你实现这些目标的绝佳资源。';
export const baseURL = 'https://fanmau.github.io';

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  useEffect(() => {
    prism.highlightAll();
  }, []);


  return (
    <div className='fanma'>
      <div className='maw'>
        <Head>
          <title>{name}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <NavBar />
        <header className='header'>
            <div className='works'>
                <p>{desc}</p>
            </div>
          {home ? (
            <>
              {/* <Image
                priority
                src="/images/profile.jpg"
                height={152}
                width={152}
                alt={name}
              /> */}
              {/* <h2>{name}</h2> */}
            </>
          ) : (
            <>
              {/* <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  height={108}
                  width={108}
                  alt={name}
                />
              </Link> */}
              {/* <h2>{name}</h2> */}
            </>
          )}
        </header>
        <main className='main'><div className='book'>{children}</div>
        </main>
        {!home && (
          <div className='back'>
            <Link href="/">← Back to home</Link>
          </div>
        )}
        <footer className='footer'>Copyright © 1985-2023 FanMa All Rights Reserved.</footer>
      </div>
    </div>
  )
}

