import Header from './header'

const Layout = ({children}: any) => {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-2xl">
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
