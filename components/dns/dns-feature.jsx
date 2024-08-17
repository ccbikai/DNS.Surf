import hero from '!!raw-loader!../../assets/hero.svg'

export function DNSFeature() {
  return <section className="pt-10 lg:pt-20 lg:pb-10">
    <div className="items-center sm:px-20 md:px-32 lg:px-16">
      <div className="flex flex-wrap items-center -mx-3">
        <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
          <div className="w-full lg:max-w-md">
            <p className="mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl font-heading">Exploring the Fascinating Journey of DNS Resolution Worldwide!</p>
            <p className="mb-4 font-medium tracking-tight text-gray-500 xl:mb-6">Querying DNS Resolution Results in Different Regions Worldwide.</p>
            <ul>
              <li className="flex items-center py-2 space-x-4 xl:py-3">
                <span className="icon-[subway--world] w-8 h-8 text-teal-500"></span>
                <span className="font-medium text-gray-500">Supporting DNS Queries from 18 Regions</span>
              </li>
              <li className="flex items-center py-2 space-x-4 xl:py-3">
                <span className="icon-[ant-design--cloud-server-outlined] w-8 h-8 text-sky-500"></span>
                <span className="font-medium text-gray-500">Supporting 100+ DNS Resolvers</span>
              </li>
              <li className="flex items-center py-2 space-x-4 xl:py-3">
                <span className="icon-[devicon--vercel] w-8 h-8"></span>
                <span className="font-medium text-gray-500">100% Run on Vercel</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
          {/* <img className="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image"> */}
          <div className='mx-auto md:w-3/4' dangerouslySetInnerHTML={{ __html: hero }}>
          </div>
        </div>
      </div>
    </div>
  </section>
}