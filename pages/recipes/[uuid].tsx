import Link from 'next/link'
import { useRouter } from 'next/router'
import action from '../../lib/recipes/action'

export const getStaticPaths = async () => {
  const data = await action.index()
  const paths = data['data']['recipes'].map((recipe: Recipe) => ({
    params: { uuid: recipe.uuid }
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async (params: any) => {
  const uuid = params['params']['uuid']
  const data = await action.show(uuid)
  return { props: { data } }
}

const Recipe = ({ data }: any) => {
  const recipe: Recipe = data['data']['recipe']
  const image_url: string = data['data']['image_url']
  const ingredients: string[] = data['data']['ingredients']

  const router = useRouter()
  const handleDelete = async (event: any, uuid: string) => {
    event.preventDefault()
    const data = await action.destroy(uuid)

    router.push('/recipes')
  }

  if (data['status'] == 'SUCCESS') {
    return (
      <>
        <img title={recipe.title} src={image_url} className="object-cover object-center w-full h-[28rem] rounded-lg mb-8" />

        <div className="flex justify-between items-end mb-8">
          <h2 className="text-4xl font-semibold">{recipe.title}</h2>
          <p>
            <Link href={`/recipes/edit/${encodeURIComponent(recipe.uuid)}`}>
              <a>編集</a>
            </Link>
            &nbsp;/&nbsp;
            <a href="#" onClick={(event) => handleDelete(event, recipe.uuid)}>
              削除
            </a>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">材料</h3>
          <ul className="flex flex-wrap">
            {ingredients.map((ingredient: string, index: number) => {
              return (
                <li key={index} className="mr-3 my-3">
                  <Link href={`/recipes`}>
                    <a className="p-2 text-sm text-slate-700 bg-slate-100 rounded-sm">
                      {ingredient}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">レシピ</h3>
          <p><a href={recipe.external_url} target="_blank" rel="noopener noreferrer">{recipe.external_title}</a></p>
        </div>
      </>
    )
  }
}

export default Recipe
