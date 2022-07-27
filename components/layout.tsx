import Header from './header'

const Layout = ({children}: any) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
