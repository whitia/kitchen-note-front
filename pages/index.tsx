import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import action from '../lib/recipes/action'

const Index = ({ data }: any) => {
  const recipes: Recipe[] = data['data']['recipes']
  const image_urls: string[] = data['data']['image_urls']
  const categories: string[] = data['data']['categories']
  const ingredients: string[] = data['data']['ingredients']

  return (
    <>
      <div className="mb-4 mt-6 md:mb-3">
        <Link href={`/recipes/${encodeURIComponent(recipes[0].uuid)}`}>
          <a>
            <img title={recipes[0].title} src={image_urls[0]} className="img-cover h-64 md:h-[28rem]" />
          </a>
        </Link>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-3">
        {recipes.map((recipe: Recipe, index: number) => {
          if (index == 0 || index >= 4) return
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
      <div className="mt-4 mb-8 text-right">
        <Link href='/recipes'>
          <a>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            &nbsp;
            All Recipes
          </a>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl">Categories</h2>
        <ul className="flex flex-wrap">
          {categories.map((category: string, index: number) => {
            return (
              <li key={index} className="mr-3 my-3">
                <Link href={{
                  pathname: '/recipes/search',
                  query: {
                    type: 'category',
                    keyword: encodeURIComponent(category)
                  },
                }}>
                  <a className="badge">
                    {category === '' ? '未分類' : category}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl">Ingredients</h2>
        <ul className="flex flex-wrap justify-between">
          {ingredients.map((ingredient: string, index: number) => {
            return (
              <li key={index} className="mr-3 my-3">
                <Link href={{
                  pathname: '/recipes/search',
                  query: {
                    type: 'ingredient',
                    keyword: encodeURIComponent(ingredient)
                  },
                }}>
                  <a className="badge">
                    {ingredient}
                  </a>
                </Link>
              </li>
            )
          })}
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
