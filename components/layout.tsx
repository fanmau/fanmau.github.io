import Head from 'next/head'
import Link from 'next/link'
import NavBar from './NavBar';
import React, { useEffect } from 'react'
import prism from 'prismjs'

export const name = 'FanMa';
export const enname = '使用 Next.js 的博客框架程序';
export const siteTitle = 'FanMa 博客';
export const  desc = '这是一个 FanMa 的博客。';


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

