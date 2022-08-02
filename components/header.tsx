import Link from 'next/link'

const Header = () => {
  const title = process.env.NEXT_PUBLIC_SITE_TITLE
  const titleSplit = title?.split(' ')
  return (
    <>
      <div className="container mx-auto max-w-2xl flex justify-between items-end mt-3 mb-5">
        <Link href='/recipes'>
          <a className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            <span className="font-semibold">{titleSplit && titleSplit[0]}</span>
            <span className="font-extralight">{titleSplit && titleSplit[1]}</span>
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
