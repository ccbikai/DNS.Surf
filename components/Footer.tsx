'use client'

import { useEffect, useRef } from 'react'

export default function Footer() {
  const email = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (email.current) {
      email.current.href = email.current.href.replace('$', '@')
    }
  }, [])
  return (
    <section className="bg-white text-gray-700 md:pt-6">
      <div className="container mx-auto flex flex-col items-center py-8 sm:flex-row">
        <a
          href="/"
          title="DNS.Surf"
          className="logo select-none text-xl font-black leading-none text-gray-900"
        >
          DNS
          <dot className="text-indigo-600">.</dot>
          Surf
        </a>
        <a
          className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l sm:border-gray-200 sm:pl-4"
          href="https://html.zone"
          target="_blank"
          rel="noopener"
          title="HTML.ZONE"
        >
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          Products of HTML.ZONE
        </a>
        <span className="mt-4 inline-flex justify-center space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          <a
            href="mailto:dns.surf$miantiao.me"
            title="Email"
            className="text-gray-400 hover:text-gray-500"
            ref={email}
          >
            <span className="sr-only">Email</span>
            <span className="icon-[mdi--email] h-6 w-6"></span>
          </a>
          <a
            href="https://t.me/htmlzone"
            target="_blank"
            rel="noopener"
            title="Telegram"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Telegram</span>
            <span className="icon-[mdi--telegram] h-6 w-6"></span>
          </a>
          <a
            href="https://mt.ci"
            target="_blank"
            rel="noopener"
            title="Blog"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Blog</span>
            <span className="icon-[mdi--blogger] h-6 w-6"></span>
          </a>

          <a
            href="https://x.com/0xKaiBi"
            target="_blank"
            rel="noopener"
            title="Twitter"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <span className="icon-[mdi--twitter] h-6 w-6"></span>
          </a>

          <a
            href="https://c.im/@mt"
            target="_blank"
            rel="noopener"
            title="Mastodon"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Mastodon</span>
            <span className="icon-[mdi--mastodon] h-6 w-6"></span>
          </a>

          <a
            href="https://github.com/ccbikai/DNS.Surf"
            target="_blank"
            rel="noopener"
            title="GitHub"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <span className="icon-[mdi--github] h-6 w-6"></span>
          </a>
        </span>
      </div>
    </section>
  )
}
