import Head from 'next/head'
import Header from './header'
import Footer from './footer'

const Layout = ({children}: any) => {
  let title = process.env.NEXT_PUBLIC_SITE_TITLE
  if (children.props['data']) {
    const recipe = children.props['data']['data']['recipe']
    if (recipe) title = recipe['title'] + ' | ' + title
  }
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col h-screen justify-between px-4 md:px-0">
        <Header />
        <main className="container mx-auto max-w-full md:max-w-2xl mb-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
