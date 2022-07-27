import Link from 'next/link'
import { useRouter } from 'next/router'
import action from '../../lib/recipes/action'

export const getStaticPaths = async () => {
  const data = await action.index()
  const paths = data['data'].map((recipe: Recipe) => ({
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
  const router = useRouter()
  const recipe: Recipe = data['data']['recipe']
  const ingredients: string[] = data['data']['ingredients']
  const handleDelete = async (event: any, uuid: string) => {
    event.preventDefault()
    const data = await action.destroy(uuid)

    router.push('/recipes')
  }
  if (data['status'] == 'SUCCESS') {
    return (
      <div>
        <h2>{recipe.title}</h2>
        <p><a href={recipe.external_url} target="_blank" rel="noopener noreferrer">{recipe.external_title}</a></p>
        <ul>
          {ingredients.map((ingredient: string, index: number) => {
            return (
              <li key={index}>
                {ingredient}
              </li>
            )
          })}
        </ul>
        <Link href={`/recipes/edit/${encodeURIComponent(recipe.uuid)}`}>
          <a>編集</a>
        </Link>
        &nbsp;
        <a href="#" onClick={(event) => handleDelete(event, recipe.uuid)}>
          削除
        </a>
      </div>
    )
  }
}

export default Recipe
