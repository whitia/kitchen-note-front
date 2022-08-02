import Link from 'next/link'
import { useRouter } from 'next/router';
import action from '../../lib/recipes/action'

const Search = ({ data }: any) => {
  const router = useRouter()
  const query = decodeURI(router.query.query as string)

  const recipes: Recipe[] = data['data']['recipes']
  const image_urls: string[] = data['data']['image_urls']
  const total: string[] = data['data']['total']

  return (
    <>
      <div className="mb-8 mt-2 md:mt-2">
        <h2 className="text-3xl">
          Search result for "{query}"
        </h2>
        <p className="text-sm text-neutral-400">
          {total} recipe(s) found.
        </p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-3">
        {recipes.map((recipe: Recipe, index: number) => {
          return (
            <li key={recipe.id}>
              <Link href={`/recipes/${encodeURIComponent(recipe.uuid)}`}>
                <a>
                  <img title={recipe.title} src={image_urls[index]} className="img-cover h-32 md:h-44" />
                </a>
              </Link>
            </li>
          )
        }).filter(e => e)}
      </ul>
    </>
  )
}

export default Search

export const getServerSideProps = async ({ params, query }: any) => {
  const data = await action.search(query.query)
  return { props: { data } }
}
