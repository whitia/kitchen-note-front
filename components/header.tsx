import Link from 'next/link'
import Search from './search'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const title = process.env.NEXT_PUBLIC_SITE_TITLE
  const titleSplit = title?.split(' ')
  return (
    <>
      <div className="container mx-auto max-w-full md:max-w-2xl flex justify-between items-center my-4">
        <Link href='/'>
          <a className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-sky-500 hover:text-transparent hover:from-violet-600 hover:to-sky-600">
            <span className="font-semibold">{titleSplit && titleSplit[0]}</span>
            <span className="font-extralight">{titleSplit && titleSplit[1]}</span>
          </a>
        </Link>
        <div className="basis-2/5 ml-auto mr-4"><Search /></div>
        <Link href='/recipes/new'>
          <a className="btn py-2 px-4 text-sm">
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;
            Create
          </a>
        </Link>
      </div>
    </>
  )
}

export default Header
