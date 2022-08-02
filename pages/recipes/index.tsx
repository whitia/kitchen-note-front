import Link from 'next/link'
import action from '../../lib/recipes/action'

const Index = ({ data }: any) => {
  const recipes: Recipe[] = data['data']['recipes']
  const image_urls: string[] = data['data']['image_urls']

  return (
    <>
      <div className="mb-4 md:mb-3">
        <Link href={`/recipes/${encodeURIComponent(recipes[0].uuid)}`}>
          <a>
            <img title={recipes[0].title} src={image_urls[0]} className="img-cover h-64 md:h-[28rem]" />
          </a>
        </Link>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-3">
        {recipes.map((recipe: Recipe, index: number) => {
          if (index == 0) return
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

export default Index

export const getStaticProps = async () => {
  const data = await action.index()
  return { props: { data } }
}
