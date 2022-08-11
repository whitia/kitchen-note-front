import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const Search = () => {
  const router = useRouter()
  const inputSearch = useRef<HTMLInputElement>(null)

  if (inputSearch.current) {
    const regexp = new RegExp(/search/)
    if (regexp.test(router.pathname)) {
      inputSearch.current.value = decodeURI(router.query.keyword as string)
    } else {
      inputSearch.current.value = ''
    }
  }

  const handleSearchSubmit = async (event: any) => {
    event.preventDefault()

    if (inputSearch.current?.value) {
      const keyword = inputSearch.current?.value
      router.push({
        pathname: '/recipes/search',
        query: {
          type: 'ingredient',
          keyword: encodeURI(keyword)
        }
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="relative">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3.5 left-4 cursor-pointer" onClick={handleSearchSubmit} />
        <input ref={inputSearch} className="input-text m-0 pl-10 pr-4 py-2 rounded-full" type="text" id="search" name="search" placeholder="Search..." />
      </form>
    </>
  )
}

export default Search
