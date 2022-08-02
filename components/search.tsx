import { useRouter } from 'next/router'

const Search = () => {
  const router = useRouter()
  const handleSearchSubmit = async (event: any) => {
    event.preventDefault()

    const query = event.target.search.value
    router.push({
      pathname: '/recipes/search',
      query: { query: encodeURI(query) }
    })
  }

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input className="input-text m-0 px-4 py-2 rounded-full" type="text" id="search" name="search" placeholder="Search by ingredient" />
      </form>
    </>
  )
}

export default Search
