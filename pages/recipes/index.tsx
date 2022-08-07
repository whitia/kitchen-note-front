import Link from 'next/link'
import action from '../../lib/recipes/action'

const Index = ({ data }: any) => {
  const total: string = data['data']['total']
  const recipes: Recipe[] = data['data']['recipes']
  const image_urls: string[] = data['data']['image_urls']

  return (
    <>
    <div className="mb-8 mt-2 md:mt-2">
      <h2 className="text-3xl">
        All Recipes
      </h2>
      <p className="text-sm text-neutral-400">
        {total} recipe(s) found.
      </p>
    </div>
      <div className="mt-6">
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
      </div>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const data = await action.index()
  return { props: { data } }
}
