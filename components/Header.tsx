'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Footer() {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <section className="pb-6 bg-white">
      <nav className="container relative z-50 h-24 select-none">
        <div
          className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center px-0"
        >
          <div className="flex items-center justify-start w-1/4 h-full pr-4">
            <a
              href="/"
              title="DNS.Surf"
              className="flex items-center py-4 space-x-2 font-extrabold text-xl text-gray-900 md:py-0"
            >
              <span
                className="flex items-center justify-center w-8 h-8 text-white bg-gray-900 rounded-full"
              >
                <span className="w-6 h-6 icon-[mdi--dots-triangle]"></span>
              </span>
              <h1 className="mx-2">
                DNS
                <span className="text-indigo-600">.</span>
                Surf
              </h1>
            </a>
          </div>
          <div
            className={
              cn(
                'top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex touch-none',
                { 'flex fixed': showMenu, 'hidden': !showMenu },
              )
            }
          >
            <div
              className="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row"
            >
              <a
                href="/"
                title="DNS.Surf"
                className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 text-white bg-gray-900 rounded-full"
                >
                  <span className="w-6 h-6 icon-[mdi--dots-triangle]"></span>
                </span>
                <span className="mx-2">
                  DNS
                  <span className="text-indigo-600">.</span>
                  Surf
                </span>
              </a>
              <div className="w-full">
              </div>
              <div
                className="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0"
              >
                <a
                  className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                  href="/privacy"
                  title="Privacy"
                >
                  Privacy
                </a>
                <a
                  className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                  href="/terms"
                  title="Terms"
                >
                  Terms
                </a>
                <span
                  className="w-full px-6 py-2 mr-0 text-gray-700 cursor-pointer md:px-3 md:mr-2 lg:mr-3 md:w-auto"
                  onClick={() => { navigator.share({ title: document.title, url: location.href }) }}
                >
                  Share
                </span
                >
                <a
                  href="https://github.com/ccbikai/DNS.Surf"
                  target="_blank"
                  rel="noopener"
                  title="GitHub"
                  className="inline-flex items-center w-full px-5 px-6 py-3 text-sm font-medium leading-4 text-white bg-gray-900 md:w-auto md:rounded-full hover:bg-gray-800 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-gray-800"
                >
                  GitHub
                </a
                >
              </div>
            </div>
          </div>
          <div
            className={cn('absolute flex flex-col items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100', showMenu ? 'right-2' : 'right-0')}
            onClick={() => { setShowMenu(!showMenu) }}
          >
            <span className={cn('w-6 h-6', showMenu ? 'icon-[mdi--window-close]' : 'icon-[mdi--dots-horizontal]')}></span>
          </div>
        </div>
      </nav>
    </section>
  )
}
