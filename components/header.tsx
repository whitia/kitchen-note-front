import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className="container mx-auto max-w-2xl flex justify-between items-end mt-3 mb-5">
        <Link href='/recipes'>
          <a className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            <span className="font-semibold">VIOLET</span>
            <span className="font-extralight">ROSE</span>
          </a>
        </Link>
        <Link href='/recipes/new'>
          <a className="btn py-2 px-4 text-sm">新規作成</a>
        </Link>
      </div>
    </>
  )
}

export default Header
